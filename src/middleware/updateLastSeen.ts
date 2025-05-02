import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

export const updateLastSeen = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user; // Explicitly cast req to include user
    if (user && user.id) {
      await User.findByIdAndUpdate(user.id, { lastSeen: new Date() });
    }
    next();
  } catch (err) {
    console.error('Error updating last seen:', err);
    next(err);
  }
};