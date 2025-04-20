// src/middleware/checkOwnership.ts
import { Request, Response, NextFunction } from 'express';
import Division from '../models/division.model';

export const checkOwnership = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;

  if (user.role === 'division_head') {
    const divisionId = req.body.divisionId || req.params.divisionId;
    const division = await Division.findById(divisionId);

    if (!division || division.head?.toString() !== user.id) {
      return res.status(403).json({ message: 'Not allowed to access this division.' });
    }
  }

  next();
};
