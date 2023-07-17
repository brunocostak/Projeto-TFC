import { Request, Router, Response } from 'express';
import MatchesController from '../controller/matches.controller';

const router = Router();

const matchesController = new MatchesController();

router.get('/home', (req: Request, res: Response) => matchesController.leaderboard(req, res));

export default router;
