import { Router } from 'express';
import teamRouter from './teams.route';

const router = Router();

router.use('/teams', teamRouter);

export default router;
