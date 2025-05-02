import { Request, Response, NextFunction } from 'express';
import Head from '../models/head.model';
import User from '../models/user.model';
import Division from '../models/division.model';

export const getAllHeads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const heads = await Head.find()
      .populate('user', 'personal_info.first_name personal_info.last_name role') // Populate user details
      .populate('division', 'name'); // Populate division details

    res.status(200).json({ message: 'Heads fetched successfully', data: heads });
  } catch (err) {
    next(err);
  }
};

export const assignHead = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, divisionId, role } = req.body;

  try {
    // Validate role
    if (!['division_head', 'coordinator'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the division exists
    const division = await Division.findById(divisionId);
    if (!division) {
      return res.status(404).json({ message: 'Division not found' });
    }

    // Update the user's role
    user.role = role;
    await user.save();

    // Create or update the head record
    const head = await Head.findOneAndUpdate(
      { user: userId },
      { division: divisionId, role },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Head assigned successfully', data: head });
  } catch (err) {
    next(err);
  }
};