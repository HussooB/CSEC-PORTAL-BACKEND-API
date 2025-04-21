import { Request, Response, NextFunction } from 'express';
import Event from '../models/event.model';

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    next(err); // Forward error to errorHandler
  }
};

export const getEvents = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    next(err); // Forward error to errorHandler
  }
};