import { Router } from 'express';
import { prisma } from '../prisma';
import { requireAuth, type AuthenticatedRequest } from '../auth/middleware';
import { twitterService } from '../services/twitter';
import { encryptCredentials, decryptCredentials } from '../utils/crypto';

const router = Router();

// Apply auth middleware to all routes
router.use(requireAuth);

// Get user settings
router.get('/', async (req: AuthenticatedRequest, res) => {
  const settings = await prisma.userSettings.findUnique({
    where: { userId: req.user!.id }
  });
  
  // Don't return sensitive credentials
  const safeSettings = settings ? {
    id: settings.id,
    userId: settings.userId,
    hasTwitterCredentials: !!(settings.accessToken && settings.accessTokenSecret),
    hasTwitterApiKeys: !!(settings.twitterApiKey && settings.twitterApiSecret),
  } : null;
  
  res.json(safeSettings);
});

// Update Twitter API keys
router.patch('/twitter-api', async (req: AuthenticatedRequest, res) => {
  const { twitterApiKey, twitterApiSecret } = req.body as {
    twitterApiKey: string;
    twitterApiSecret: string;
  };

  if (!twitterApiKey || !twitterApiSecret) {
    return res.status(400).json({ error: 'Twitter API key and secret are required' });
  }

  try {
    // Verify the API keys work (if user has access tokens)
    const existingSettings = await prisma.userSettings.findUnique({
      where: { userId: req.user!.id }
    });

    if (existingSettings?.accessToken && existingSettings?.accessTokenSecret) {
      // Decrypt existing credentials for verification
      const decryptedSettings = decryptCredentials(existingSettings);

      const isValid = await twitterService.verifyCredentials({
        accessToken: decryptedSettings.accessToken!,
        accessTokenSecret: decryptedSettings.accessTokenSecret!,
        twitterApiKey,
        twitterApiSecret,
      });

      if (!isValid.valid) {
        return res.status(400).json({ error: 'Invalid Twitter API credentials' });
      }
    }

    // Encrypt credentials before storing
    const encryptedCredentials = encryptCredentials({
      twitterApiKey,
      twitterApiSecret
    });

    const settings = await prisma.userSettings.upsert({
      where: { userId: req.user!.id },
      update: {
        twitterApiKey: encryptedCredentials.twitterApiKey,
        twitterApiSecret: encryptedCredentials.twitterApiSecret
      },
      create: {
        userId: req.user!.id,
        twitterApiKey: encryptedCredentials.twitterApiKey!,
        twitterApiSecret: encryptedCredentials.twitterApiSecret!
      }
    });

    res.json({ 
      success: true,
      hasTwitterApiKeys: !!(settings.twitterApiKey && settings.twitterApiSecret)
    });
  } catch (error) {
    console.error('Error updating Twitter API keys:', error);
    res.status(500).json({ error: 'Failed to update Twitter API keys' });
  }
});

// Test Twitter connection
router.post('/test-twitter', async (req: AuthenticatedRequest, res) => {
  try {
    const settings = await prisma.userSettings.findUnique({
      where: { userId: req.user!.id }
    });

    if (!settings?.accessToken || !settings?.accessTokenSecret) {
      return res.status(400).json({ error: 'No Twitter account connected' });
    }

    // Decrypt credentials for API calls
    const decryptedSettings = decryptCredentials(settings);

    const result = await twitterService.verifyCredentials({
      accessToken: decryptedSettings.accessToken!,
      accessTokenSecret: decryptedSettings.accessTokenSecret!,
      twitterApiKey: decryptedSettings.twitterApiKey || undefined,
      twitterApiSecret: decryptedSettings.twitterApiSecret || undefined,
    });

    res.json(result);
  } catch (error) {
    console.error('Error testing Twitter connection:', error);
    res.status(500).json({ error: 'Failed to test Twitter connection' });
  }
});

export default router;
