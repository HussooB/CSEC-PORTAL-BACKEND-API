// event.controller.ts
import { Request, Response } from 'express';
import Event from '../models/event.model';

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create event', error: err });
  }
};

export const getEvents = async (_req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get events', error: err });
  }
};
