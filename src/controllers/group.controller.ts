// group.controller.ts
import { Request, Response } from 'express';
import Group from '../models/group.model';

export const createGroup = async (req: Request, res: Response) => {
  const { name, division } = req.body;
  try {
    const group = await Group.create({ name, division });
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create group', error: err });
  }
};

export const getGroupsByDivision = async (req: Request, res: Response) => {
  try {
    const groups = await Group.find({ division: req.params.divisionId });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get groups', error: err });
  }
};