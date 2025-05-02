import { Request, Response, NextFunction } from 'express';
import HeadsUp from '../models/headsUp.model';

export const submitHeadsUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { profile, session, type, reason } = req.body;

    // Validate required fields
    if (!profile || !session || !type || !reason) {
      return res.status(400).json({ message: 'All fields are required: profile, session, type, reason.' });
    }

    const headsUp = await HeadsUp.create({ profile, session, type, reason });
    res.status(201).json(headsUp);
  } catch (err) {
    next(err);
  }
};

export const approveHeadsUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await HeadsUp.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const listHeadsUps = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await HeadsUp.find();
    res.json(data);
  } catch (err) {
    next(err);
  }
};
export const getHeadsUpsByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    const headsUps = await HeadsUp.find({ profile: userId }); // Assuming `profile` stores the user ID
    if (!headsUps || headsUps.length === 0) {
      return res.status(404).json({ message: 'No heads-ups found for this user' });
    }

    res.status(200).json(headsUps);
  } catch (err) {
    next(err);
  }
};