import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    const error = new Error('Access denied. No token provided.');
    (error as any).statusCode = 401;
    (error as any).isOperational = true;
    return next(error); // Forward error to errorHandler
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (err) {
    const error = new Error('Invalid token.');
    (error as any).statusCode = 403;
    (error as any).isOperational = true;
    next(error); // Forward error to errorHandler
  }
};