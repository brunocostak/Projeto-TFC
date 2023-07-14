import { Request, Router, Response } from 'express';
import LoginController from '../controller/login.controller';

const router = Router();

const loginController = new LoginController();

router.post('/', (req: Request, res: Response) => loginController.login(req, res));

export default router;
