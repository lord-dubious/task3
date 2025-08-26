import type PgBoss from 'pg-boss';
import { prisma } from './prisma';
import { twitterService } from './services/twitter';

export async function registerJobs(boss: PgBoss): Promise<void> {
  // Schedule periodic scan every 5 minutes
  await boss.schedule('scan-due-tweets', '*/5 * * * *');

  // Scan job: find due tweets and enqueue post jobs
  await boss.work('scan-due-tweets', async () => {
    const now = new Date();
    const dueTweets = await prisma.tweet.findMany({
      where: {
        status: 'scheduled',
        scheduledFor: { lte: now },
      },
      orderBy: { scheduledFor: 'asc' },
    });

    for (const t of dueTweets) {
      await boss.publish('post-tweet', { tweetId: t.id });
    }

    await prisma.schedulerStatus.upsert({
      where: { id: 'singleton' },
      update: { lastRunAt: new Date() },
      create: { id: 'singleton', lastRunAt: new Date() },
    });
  });

  // Post tweet worker
  await boss.work<{ tweetId: string }>('post-tweet', async (job) => {
    const id = job.data.tweetId;
    const tweet = await prisma.tweet.findUnique({ where: { id } });
    if (!tweet) return;

    const settings = await prisma.userSettings.findUnique({ where: { userId: tweet.userId } });

    if (!settings?.accessToken || !settings?.accessTokenSecret) {
      await prisma.tweet.update({
        where: { id },
        data: {
          status: 'failed',
          failureReason: 'No Twitter credentials configured',
          retryCount: { increment: 1 },
          lastAttemptAt: new Date(),
        },
      });
      await prisma.schedulerStatus.update({
        where: { id: 'singleton' },
        data: { lastFailureAt: new Date(), lastError: 'Missing credentials' },
      }).catch(() => {});
      return;
    }

    try {
      // Post tweet using Twitter API
      const result = await twitterService.postTweet(
        tweet.userId,
        tweet.content,
        tweet.mediaUrls.length > 0 ? tweet.mediaUrls : undefined
      );

      await prisma.tweet.update({
        where: { id },
        data: {
          status: 'posted',
          twitterPostId: result.id,
          lastAttemptAt: new Date(),
        },
      });

      await prisma.schedulerStatus.update({
        where: { id: 'singleton' },
        data: { lastSuccessAt: new Date(), lastError: null },
      }).catch(() => {});

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      await prisma.tweet.update({
        where: { id },
        data: {
          status: 'failed',
          failureReason: errorMessage,
          retryCount: { increment: 1 },
          lastAttemptAt: new Date(),
        },
      });

      await prisma.schedulerStatus.update({
        where: { id: 'singleton' },
        data: { lastFailureAt: new Date(), lastError: errorMessage },
      }).catch(() => {});

      // Re-throw for pg-boss retry logic if it's a temporary error
      if (errorMessage.includes('rate limit') || errorMessage.includes('timeout')) {
        throw error;
      }
    }
  });
}

