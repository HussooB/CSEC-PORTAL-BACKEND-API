import { Request, Response, NextFunction } from 'express';
import Division from '../models/division.model';
import User from '../models/user.model';
import Role from '../models/role.model';
import Rule from '../models/rule.model';

export const listHeads = async (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const total = await User.countDocuments({ role: 'division_head' });
    const heads = await User.find({ role: 'division_head' })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: heads,
    });
  } catch (err) {
    next(err);
  }
};

export const assignHead = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, divisionId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { role: 'division_head' });
    await Division.findByIdAndUpdate(divisionId, { head: userId });
    res.json({ message: 'Head assigned successfully' });
  } catch (err) {
    next(err);
  }
};

export const createRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (err) {
    next(err);
  }
};

export const setRules = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rule = await Rule.create(req.body);
    res.status(201).json(rule);
  } catch (err) {
    next(err);
  }
};