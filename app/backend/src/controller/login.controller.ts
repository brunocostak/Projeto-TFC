import { Request, Response } from 'express';
import LoginService from '../service/login.service';

export default class LoginController {
  constructor(private service = new LoginService()) {}

  async login(req: Request, res: Response): Promise<void> {
    const token = await this.service.login(req.body);
    if (!token) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }
    res.status(200).json(token);
  }
}
