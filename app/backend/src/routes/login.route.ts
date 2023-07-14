import { Request, Router, Response } from 'express';
import LoginController from '../controller/login.controller';
import validationEmailAndPassword from '../middlewares/LoginValidation';

const router = Router();

const loginController = new LoginController();

router.post('/', validationEmailAndPassword, (req: Request, res: Response) => loginController.login(req, res));

export default router;
