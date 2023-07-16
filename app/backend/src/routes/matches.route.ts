import { Request, Router, Response } from 'express';
import MatchesController from '../controller/matches.controller';
import { validateTokenMiddleware } from '../middlewares/TokenValidation';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req: Request, res: Response) => matchesController.findAll(req, res));
// router.get('/:id', (req: Request, res: Response) => matchesController.findById(req, res));
router.patch(
  '/:id/finish',
  validateTokenMiddleware,
  (req: Request, res: Response) => matchesController.updateFinish(req, res),
);

export default router;
