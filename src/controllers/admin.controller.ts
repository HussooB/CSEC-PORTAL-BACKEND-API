// admin.controller.ts
import { Request, Response } from 'express';
import Division from '../models/division.model';
import User from '../models/user.model';
import Role from '../models/role.model';
import Rule from '../models/rule.model';

export const listHeads = async (_req: Request, res: Response) => {
  try {
    const heads = await User.find({ role: 'division_head' });
    res.json(heads);
  } catch (err) {
    res.status(500).json({ message: 'Failed to list heads', error: err });
  }
};

export const assignHead = async (req: Request, res: Response) => {
  const { userId, divisionId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { role: 'division_head' });
    await Division.findByIdAndUpdate(divisionId, { head: userId });
    res.json({ message: 'Head assigned successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to assign head', error: err });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create role', error: err });
  }
};

export const setRules = async (req: Request, res: Response) => {
  try {
    const rule = await Rule.create(req.body);
    res.status(201).json(rule);
  } catch (err) {
    res.status(500).json({ message: 'Failed to set rules', error: err });
  }
};
