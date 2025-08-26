import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import dotenv from 'dotenv';
import passport from './auth/passport';
import boss from './queue';
import { prisma } from './prisma';
import tweetsRouter from './routes/tweets';
import authRouter from './routes/auth';

dotenv.config();

const PgSession = connectPgSimple(session);

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  store: new PgSession({
    conString: process.env.DATABASE_URL,
    tableName: 'session'
  }),
  secret: process.env.ENCRYPTION_KEY || 'fallback-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/health', async (_req, res) => {
  res.json({ ok: true });
});

app.use('/auth', authRouter);
app.use('/api/tweets', tweetsRouter);
import storageRouter from './routes/storage';
app.use('/api/storage', storageRouter);
import mediaRouter from './routes/media';
app.use('/api/media', mediaRouter);
import agentsRouter from './routes/agents';
app.use('/api/agents', agentsRouter);
import settingsRouter from './routes/settings';
app.use('/api/settings', settingsRouter);

app.post('/api/scheduler/process-now', async (_req, res) => {
  await boss.publish('scan-due-tweets');
  res.json({ ok: true });
});

app.get('/api/scheduler/status', async (_req, res) => {
  const status = await prisma.schedulerStatus.findFirst();
  res.json({ status: status ?? null });
});

async function ensureSessionTable() {
  // Create session table if it doesn't exist
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS "session" (
      "sid" varchar NOT NULL COLLATE "default",
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL
    )
    WITH (OIDS=FALSE);
  `;
  await prisma.$executeRaw`
    ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
  `;
  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
  `;
}

const port = process.env.PORT ? Number(process.env.PORT) : 3001;
ensureSessionTable()
  .then(() => {
    app.listen(port, () => {
      console.log(`API listening on :${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to init demo user', err);
    process.exit(1);
  });

