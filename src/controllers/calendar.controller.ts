import { Request, Response, NextFunction } from 'express';
import Calendar from '../models/calendar.model';

export const createCalendar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, division, groups, date, startTime, endTime, status } = req.body;

    const calendar = await Calendar.create({
      title,
      description,
      division,
      groups,
      date,
      startTime,
      endTime,
      status
    });

    res.status(201).json(calendar);
  } catch (err) {
    next(err);
  }
};

export const getCalendars = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const calendars = await Calendar.find();
    res.json(calendars);
  } catch (err) {
    next(err);
  }
};

export const getCalendarById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const calendar = await Calendar.findById(req.params.id);
    if (!calendar) return res.status(404).json({ message: 'Calendar event not found' });
    res.json(calendar);
  } catch (err) {
    next(err);
  }
};

export const updateCalendar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, division, groups, date, startTime, endTime, status } = req.body;

    const calendar = await Calendar.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        division,
        groups,
        date,
        startTime,
        endTime,
        status
      },
      { new: true }
    );

    if (!calendar) return res.status(404).json({ message: 'Calendar event not found' });
    res.json(calendar);
  } catch (err) {
    next(err);
  }
};

export const deleteCalendar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Calendar.findByIdAndDelete(req.params.id);
    res.json({ message: 'Calendar event deleted' });
  } catch (err) {
    next(err);
  }
};