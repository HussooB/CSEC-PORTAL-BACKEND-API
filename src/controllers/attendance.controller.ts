import { Request, Response, NextFunction } from 'express';
import Attendance from '../models/attendance.model'; // Correctly imported as Attendance
import Rule from '../models/rule.model'; // Assuming you have a Rule model

interface AttendanceParams {
  profileId?: string; // For profile-specific attendance
  sessionId?: string; // For session-specific attendance
}

export const markAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
  } catch (err) {
    next(err);
  }
};

export const getAttendanceByProfile = async (
  req: Request<AttendanceParams>,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const total = await Attendance.countDocuments({ profile: req.params.profileId });
    const data = await Attendance.find({ profile: req.params.profileId })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const getAttendanceBySession = async (
  req: Request<AttendanceParams>,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const total = await Attendance.countDocuments({ session: req.params.sessionId });
    const data = await Attendance.find({ session: req.params.sessionId })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const getAttendanceStatus = async (
  req: Request<AttendanceParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const [absences, rules] = await Promise.all([
      Attendance.countDocuments({
        profile: req.params.profileId,
        status: 'absent',
      }),
      Rule.findOne().sort({ createdAt: -1 }), // Get the latest rules
    ]);

    let status = 'Active';
    if (absences >= (rules?.warningAfter || 0)) status = 'Needs Attention';
    if (absences >= (rules?.suspendAfter || 0)) status = 'Inactive';

    res.json({ status, absencesCount: absences });
  } catch (err) {
    next(err);
  }
};

export const getAllAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const attendanceRecords = await Attendance.find(); // Corrected to use Attendance
    res.status(200).json(attendanceRecords);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};