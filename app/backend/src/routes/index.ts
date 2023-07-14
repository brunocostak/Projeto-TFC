import { Router } from 'express';
import teamRouter from './teams.route';
import LoginRouter from './login.route';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', LoginRouter);

export default router;
