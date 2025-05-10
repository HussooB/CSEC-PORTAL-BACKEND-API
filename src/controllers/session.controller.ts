import { Request, Response, NextFunction } from 'express';
import Session from '../models/session.model';

export const createSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, division, groups, date, startTime, endTime, status } = req.body;

    // Ensure group is passed correctly
    const session = await Session.create({
  title,
  description,
  division,
  groups,
  date,
  startTime,
  endTime,
  status,
  showInCalendar: true // Default to true
});

    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
};
export const getSessions = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const sessions = await Session.find();
    res.json(sessions);
  } catch (err) {
    next(err);
  }
};

export const getSessionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    next(err);
  }
};

export const updateSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, division, groups, date, startTime, endTime, status } = req.body;

    const session = await Session.findByIdAndUpdate(
      req.params.id,
      {
    title,
    description,
    division,
    groups,
    date,
    startTime,
    endTime,
    status,
    showInCalendar: req.body.showInCalendar // Include if provided
  },
  { new: true }
);

    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    next(err);
  }
};

export const deleteSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Session.findByIdAndDelete(req.params.id);
    res.json({ message: 'Session deleted' });
  } catch (err) {
    next(err);
  }
};
// Add this new controller function
export const toggleCalendarVisibility = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const sessionId = req.params.id;
    const session = await Session.findById(sessionId);
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Toggle the showInCalendar value
    session.showInCalendar = !session.showInCalendar;
    await session.save();

    res.status(200).json({ 
      success: true,
      showInCalendar: session.showInCalendar,
      message: `Session calendar visibility ${session.showInCalendar ? 'enabled' : 'disabled'}`
    });
  } catch (err) {
    next(err);
  }
};