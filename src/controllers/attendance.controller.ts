// attendance.controller.ts
import { Request, Response } from 'express';
import Attendance from '../models/attendance.model';

export const markAttendance = async (req: Request, res: Response) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ message: 'Failed to mark attendance', error: err });
  }
};

export const getAttendanceByProfile = async (req: Request, res: Response) => {
  try {
    const data = await Attendance.find({ profile: req.params.profileId });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get attendance', error: err });
  }
};

export const getAttendanceBySession = async (req: Request, res: Response) => {
  try {
    const data = await Attendance.find({ session: req.params.sessionId });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get session attendance', error: err });
  }
};
