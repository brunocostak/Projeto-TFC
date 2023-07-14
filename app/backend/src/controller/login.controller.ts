import { Request, Response } from 'express';
import LoginService from '../service/login.service';

export default class LoginController {
  constructor(private service = new LoginService()) {}

  async login(req: Request, res: Response): Promise<void> {
    console.log('login');
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'All fields must be filled' });
      return;
    }
    const token = await this.service.login(req.body);
    if (!token) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    res.status(200).json(token);
  }
}
