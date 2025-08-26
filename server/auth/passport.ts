import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { prisma } from '../prisma';
import type { User } from '../../src/generated/prisma';

// Serialize user for session
passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value;
      if (!email) {
        return done(new Error('No email found in Google profile'), null);
      }

      let user = await prisma.user.findUnique({ where: { email } });
      
      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            name: profile.displayName,
            avatarUrl: profile.photos?.[0]?.value,
          }
        });
      } else {
        // Update user info
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            name: profile.displayName,
            avatarUrl: profile.photos?.[0]?.value,
          }
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

// Twitter OAuth Strategy
if (process.env.TWITTER_CLIENT_ID && process.env.TWITTER_CLIENT_SECRET) {
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CLIENT_ID,
    consumerSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: '/auth/twitter/callback'
  }, async (token, tokenSecret, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value;
      const twitterId = profile.id;
      
      // Try to find user by email first, then by Twitter ID
      let user = email ? await prisma.user.findUnique({ where: { email } }) : null;
      
      if (!user && twitterId) {
        // Look for existing user with this Twitter ID in settings
        const settings = await prisma.userSettings.findFirst({
          where: { accessToken: token },
          include: { user: true }
        });
        user = settings?.user || null;
      }
      
      if (!user) {
        user = await prisma.user.create({
          data: {
            email: email || `twitter_${twitterId}@placeholder.com`,
            name: profile.displayName || profile.username,
            avatarUrl: profile.photos?.[0]?.value,
          }
        });
      }

      // Store Twitter credentials
      await prisma.userSettings.upsert({
        where: { userId: user.id },
        update: {
          accessToken: token,
          accessTokenSecret: tokenSecret,
        },
        create: {
          userId: user.id,
          accessToken: token,
          accessTokenSecret: tokenSecret,
        }
      });

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

export default passport;
