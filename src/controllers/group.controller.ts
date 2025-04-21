import { Request, Response, NextFunction } from 'express';
import Group from '../models/group.model';

export const createGroup = async (req: Request, res: Response, next: NextFunction) => {
  const { name, division } = req.body;
  try {
    const group = await Group.create({ name, division });
    res.status(201).json(group);
  } catch (err) {
    next(err);
  }
};

export const getGroupsByDivision = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groups = await Group.find({ division: req.params.divisionId });
    res.json(groups);
  } catch (err) {
    next(err);
  }
};