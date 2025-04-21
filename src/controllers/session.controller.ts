import { Request, Response, NextFunction } from 'express';
import Session from '../models/session.model';

export const createSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await Session.create(req.body);
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
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
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