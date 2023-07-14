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

const validateTokenMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void | Response => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decodedToken = JWT.verify(token) as DecodedToken;
    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
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
