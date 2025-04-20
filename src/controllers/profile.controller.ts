import { Request, Response } from 'express';
import Profile from '../models/profile.model';

export const getProfile = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const profile = await Profile.findById(req.params.id).populate('user division');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    return res.json(profile);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const updated = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Profile not found' });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
};
