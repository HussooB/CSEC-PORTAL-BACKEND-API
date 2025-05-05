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
export const getAllGroups = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groups = await Group.find(); // Fetch all groups
    res.json(groups);
  } catch (err) {
    next(err);
  }
};
export const getGroupMembers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { groupId } = req.params; // Extract groupId from path parameters

    if (!groupId) {
      return res.status(400).json({ message: 'Group ID is required' });
    }

    const group = await Group.findById(groupId).populate('members'); // Assuming 'members' is a reference field in the Group model

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.json(group.members); // Return the members of the group
  } catch (err) {
    next(err);
  }
};