import { Request, Response, NextFunction } from 'express';
import HeadsUp from '../models/headsUp.model';

export const submitHeadsUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const headsUp = await HeadsUp.create(req.body);
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