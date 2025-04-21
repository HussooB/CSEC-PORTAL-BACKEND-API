import { Request, Response, NextFunction } from 'express';

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !roles.includes(user.role)) {
      const error = new Error('Access forbidden: insufficient role.');
      (error as any).statusCode = 403;
      (error as any).isOperational = true;
      return next(error); // Forward error to errorHandler
    }

    next();
  };
};