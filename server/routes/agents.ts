import { Router } from 'express';
import { prisma } from '../prisma';
import { requireAuth, type AuthenticatedRequest } from '../auth/middleware';

const router = Router();

// Apply auth middleware to all routes
router.use(requireAuth);

router.get('/', async (req: AuthenticatedRequest, res) => {
  const agents = await prisma.agent.findMany({
    where: { userId: req.user!.id },
    orderBy: { createdAt: 'desc' }
  });
  res.json(agents);
});

router.post('/', async (req: AuthenticatedRequest, res) => {
  const agent = await prisma.agent.create({
    data: {
      ...req.body,
      userId: req.user!.id,
    },
  });
  res.status(201).json(agent);
});

router.patch('/:id', async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const agent = await prisma.agent.update({
    where: {
      id,
      userId: req.user!.id // Ensure user owns the agent
    },
    data: req.body
  });
  res.json(agent);
});

router.delete('/:id', async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  await prisma.agent.delete({
    where: {
      id,
      userId: req.user!.id // Ensure user owns the agent
    }
  });
  res.status(204).end();
});

export default router;
