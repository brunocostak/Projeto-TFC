import { Request, Router, Response } from 'express';
import LoginController from '../controller/login.controller';
import validationEmailAndPassword from '../middlewares/LoginValidation';
import { getRole, validateTokenMiddleware } from '../middlewares/TokenValidation';

const router = Router();

const loginController = new LoginController();

router.post(
  '/',
  validationEmailAndPassword,
  (req: Request, res: Response) => loginController.login(req, res),
);

router.post('/role', validateTokenMiddleware, getRole);

export default router;
