import { Router } from 'express';
import passport from '../auth/passport';
import type { AuthenticatedRequest } from '../auth/middleware';

const router = Router();

// Google OAuth routes
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/error' }),
  (req, res) => {
    const redirectUrl = process.env.APP_REDIRECT_URI || '/app';
    res.redirect(redirectUrl);
  }
);

// Twitter OAuth routes
router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/auth/error' }),
  (req, res) => {
    const redirectUrl = process.env.APP_REDIRECT_URI || '/app';
    res.redirect(redirectUrl);
  }
);

// Get current user
router.get('/me', (req: AuthenticatedRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ user: req.user });
});

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ success: true });
  });
});

// Error page
router.get('/error', (req, res) => {
  res.status(400).json({ error: 'Authentication failed' });
});

export default router;
