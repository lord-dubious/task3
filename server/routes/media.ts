import { Router } from 'express';
import { prisma } from '../prisma';
import { requireAuth, type AuthenticatedRequest } from '../auth/middleware';

const router = Router();

// Apply auth middleware to all routes
router.use(requireAuth);

router.get('/', async (req: AuthenticatedRequest, res) => {
  const items = await prisma.mediaLibrary.findMany({
    where: { userId: req.user!.id },
    orderBy: { createdAt: 'desc' }
  });
  res.json(items);
});

router.post('/', async (req: AuthenticatedRequest, res) => {
  const item = await prisma.mediaLibrary.create({
    data: {
      ...req.body,
      userId: req.user!.id,
    }
  });
  res.status(201).json(item);
});

router.patch('/:id', async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const item = await prisma.mediaLibrary.update({
    where: {
      id,
      userId: req.user!.id // Ensure user owns the media
    },
    data: req.body
  });
  res.json(item);
});

router.delete('/:id', async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  await prisma.mediaLibrary.delete({
    where: {
      id,
      userId: req.user!.id // Ensure user owns the media
    }
  });
  res.status(204).end();
});

export default router;

