import { Request, Response, NextFunction } from 'express';
import Division from '../models/division.model';
import Group from '../models/group.model';

export const checkOwnership = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;

  try {
    // Allow presidents to bypass ownership checks
    if (user.role === 'president') {
      return next();
    }

    // For division operations
    if (req.params.divisionId || req.body.division) {
      const divisionId = req.params.divisionId || req.body.division;
      const division = await Division.findById(divisionId);

      if (!division || division.head?.toString() !== user.id) {
        const error = new Error('Not allowed to modify this division.');
        (error as any).statusCode = 403;
        (error as any).isOperational = true;
        return next(error);
      }
    }

    // For group operations
    if (req.params.groupId || req.body.group) {
      const groupId = req.params.groupId || req.body.group;
      const group = await Group.findById(groupId).populate('division');

      if (!group || (group.division as any).head?.toString() !== user.id) {
        const error = new Error('Not allowed to modify this group.');
        (error as any).statusCode = 403;
        (error as any).isOperational = true;
        return next(error);
      }
    }

    next();
  } catch (err) {
    next(err); // Forward error to errorHandler
  }
};