import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import UserModel from '../database/models/SequelizeUser';
import JWT from '../utils/JWT';

interface DecodedToken extends JwtPayload {
  role?: string;
}

interface AuthenticatedRequest extends Request {
  user?: DecodedToken | string;
}

const validateTokenMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction)
: void | Response => {
  const authHeader = req.headers.authorization;
  const erro = 'Token must be a valid token';
  if (!authHeader) return res.status(401).json({ message: 'Token not found' });

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: erro });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = JWT.verify(token) as DecodedToken;
    if (!decodedToken) {
      return res.status(401).json({ message: erro });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

const getRole = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { email } = req.user as DecodedToken;

  try {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }
    const { role } = user;
    res.status(200).json({ role });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { validateTokenMiddleware, getRole };
