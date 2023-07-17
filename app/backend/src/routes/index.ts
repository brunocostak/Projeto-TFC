import { Router } from 'express';
import teamRouter from './teams.route';
import LoginRouter from './login.route';
import MatchesRouter from './matches.route';
import LeaderboardRouter from './leaderboard.route';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', LoginRouter);
router.use('/matches', MatchesRouter);
router.use('/leaderboard', LeaderboardRouter);

export default router;
// a
