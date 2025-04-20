// headsUp.controller.ts
import { Request, Response } from 'express';
import HeadsUp from '../models/headsUp.model';

export const submitHeadsUp = async (req: Request, res: Response) => {
  try {
    const headsUp = await HeadsUp.create(req.body);
    res.status(201).json(headsUp);
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit heads-up', error: err });
  }
};

export const approveHeadsUp = async (req: Request, res: Response) => {
  try {
    const updated = await HeadsUp.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve heads-up', error: err });
  }
};

export const listHeadsUps = async (_req: Request, res: Response) => {
  try {
    const data = await HeadsUp.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to list heads-ups', error: err });
  }
};
