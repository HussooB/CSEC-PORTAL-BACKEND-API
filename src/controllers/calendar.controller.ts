import { Request, Response, NextFunction } from 'express';
import Calendar from '../models/calendar.model';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const createCalendar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, date, startTime, endTime, status } = req.body;
    const authenticatedReq = req as AuthenticatedRequest;

    if (!authenticatedReq.user?.id) {
      return res.status(401).json({ message: 'Unauthorized: User information missing.' });
    }

    const calendar = await Calendar.create({
      title,
      description,
      date,
      startTime,
      endTime,
      status,
      created_by: authenticatedReq.user.id
    });

    res.status(201).json(calendar);
  } catch (err) {
    next(err);
  }
};

export const getCalendars = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const calendars = await Calendar.find().populate('created_by', 'email');
    res.json(calendars);
  } catch (err) {
    next(err);
  }
};

export const getCalendarById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const calendar = await Calendar.findById(req.params.id).populate('created_by', 'email');
    if (!calendar) return res.status(404).json({ message: 'Calendar event not found' });
    res.json(calendar);
  } catch (err) {
    next(err);
  }
};

export const getCalendarsByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const calendars = await Calendar.find({ created_by: userId }).populate('created_by', 'email');
    
    if (!calendars || calendars.length === 0) {
      return res.status(404).json({ message: 'No calendar events found for this user' });
    }
    
    res.json(calendars);
  } catch (err) {
    next(err);
  }
};

export const updateCalendar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, date, startTime, endTime, status } = req.body;

    const calendar = await Calendar.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        date,
        startTime,
        endTime,
        status
      },
      { new: true }
    ).populate('created_by', 'email');

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

export const toggleCalendarVisibility = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, eventId } = req.params; // Now expecting both userId and eventId
    
    // First verify the event belongs to the user
    const calendar = await Calendar.findOne({
      _id: eventId,
      created_by: userId
    });
    
    if (!calendar) {
      return res.status(404).json({ 
        message: 'Calendar event not found or does not belong to user' 
      });
    }

    // Toggle the showInCalendar value
    calendar.showInCalendar = !calendar.showInCalendar;
    await calendar.save();

    res.json({
      message: 'Calendar visibility updated',
      showInCalendar: calendar.showInCalendar,
      eventId: calendar._id
    });
  } catch (err) {
    next(err);
  }
};