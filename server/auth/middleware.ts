import type { Request, Response, NextFunction } from 'express';
import type { User } from '../../src/generated/prisma';

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  next();
}

export function optionalAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  // User may or may not be authenticated, continue either way
  next();
}
