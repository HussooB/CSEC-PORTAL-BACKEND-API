import { Request, Response, NextFunction } from 'express';
import Profile from '../models/profile.model';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await Profile.findById(req.params.id).populate('user division');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Profile not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};