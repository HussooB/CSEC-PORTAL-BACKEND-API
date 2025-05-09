import { Request, Response, NextFunction } from 'express';
import Division, { IDivision } from '../models/division.model';
import Group, { IGroup } from '../models/group.model';
import Head from '../models/head.model';

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
      const division = await Division.findById(divisionId).populate<{ division_head: typeof Head }>('division_head');

      if (!division) {
        const error = new Error('Division not found.');
        (error as any).statusCode = 404;
        (error as any).isOperational = true;
        return next(error);
      }

      // Check if the user is the head of the division
      const divisionHead = await Head.findById(division.division_head);
      if (!divisionHead || divisionHead.user.toString() !== user.id) {
        const error = new Error('Not allowed to modify this division.');
        (error as any).statusCode = 403;
        (error as any).isOperational = true;
        return next(error);
      }
    }

    // For group operations
    if (req.params.groupId || req.body.group) {
      const groupId = req.params.groupId || req.body.group;
      const group = await Group.findById(groupId).populate<{ division: IDivision }>('division');

      if (!group) {
        const error = new Error('Group not found.');
        (error as any).statusCode = 404;
        (error as any).isOperational = true;
        return next(error);
      }

      // Check if the user is the head of the division associated with the group
      const divisionHead = await Head.findById(group.division.division_head);
      if (!divisionHead || divisionHead.user.toString() !== user.id) {
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