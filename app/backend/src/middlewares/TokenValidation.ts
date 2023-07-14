import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import JWT from '../utils/JWT';

interface DecodedToken extends JwtPayload {
  role?: string;
}

interface AuthenticatedRequest extends Request {
  user?: DecodedToken;
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
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

const getRole = (req: AuthenticatedRequest, res: Response): void => {
  const { role } = req.user || {};

  if (!role) {
    res.status(401).json({ message: 'User role not found' });
    return;
  }

  res.status(200).json({ role });
};
export { validateTokenMiddleware, getRole };
