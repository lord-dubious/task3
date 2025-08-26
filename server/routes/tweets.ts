import { Router } from 'express';
import { prisma } from '../prisma';
import { requireAuth, type AuthenticatedRequest } from '../auth/middleware';

const router = Router();

// Apply auth middleware to all routes
router.use(requireAuth);

router.get('/', async (req: AuthenticatedRequest, res) => {
  const tweets = await prisma.tweet.findMany({
    where: { userId: req.user!.id },
    orderBy: { createdAt: 'desc' }
  });
  res.json(tweets);
});

router.post('/', async (req: AuthenticatedRequest, res) => {
  const body = req.body as {
    content: string;
    mediaUrls?: string[];
    scheduledFor?: string;
    twitterAccountId?: string;
    agentId?: string;
  };

  const tweet = await prisma.tweet.create({
    data: {
      content: body.content,
      mediaUrls: body.mediaUrls ?? [],
      scheduledFor: body.scheduledFor ? new Date(body.scheduledFor) : null,
      twitterAccountId: body.twitterAccountId ?? null,
      agentId: body.agentId ?? null,
      status: body.scheduledFor ? 'scheduled' : 'draft',
      userId: req.user!.id,
    },
  });

  res.status(201).json(tweet);
});

router.patch('/:id', async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const updates = req.body as Partial<{ content: string; mediaUrls: string[]; scheduledFor: string; status: 'draft'|'scheduled'|'posted'|'failed'; }>;

  const tweet = await prisma.tweet.update({
    where: {
      id,
      userId: req.user!.id // Ensure user owns the tweet
    },
    data: {
      content: updates.content,
      mediaUrls: updates.mediaUrls,
      scheduledFor: updates.scheduledFor ? new Date(updates.scheduledFor) : undefined,
      status: updates.status,
    },
  });

  res.json(tweet);
});

router.delete('/:id', async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  await prisma.tweet.delete({
    where: {
      id,
      userId: req.user!.id // Ensure user owns the tweet
    }
  });
  res.status(204).end();
});

export default router;

