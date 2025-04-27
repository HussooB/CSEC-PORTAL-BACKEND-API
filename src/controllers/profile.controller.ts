import { Request, Response, NextFunction } from 'express';
import Profile from '../models/profile.model';
import User from '../models/user.model'; // Import User model for profile_list updates

// Get a profile by ID
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await Profile.findById(req.params.id).populate('user division');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

// Update a profile by ID
export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Profile not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Create a new profile
export const createProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await Profile.create(req.body);

    // Add the profile to the user's profile_list
    await User.findByIdAndUpdate(req.body.user, {
      $push: { profile_list: profile._id },
    });

    res.status(201).json(profile);
  } catch (err) {
    next(err);
  }
};

// Delete a profile by ID
export const deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);

    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    // Remove the profile from the user's profile_list
    await User.findByIdAndUpdate(profile.user, {
      $pull: { profile_list: profile._id },
    });

    res.json({ message: 'Profile deleted' });
  } catch (err) {
    next(err);
  }
};