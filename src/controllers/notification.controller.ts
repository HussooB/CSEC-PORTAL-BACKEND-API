import { Request, Response, NextFunction } from 'express';
import Notification from '../models/notification.model';

interface NotificationParams {
  userId?: string; // For `getNotificationsByUser`
  id?: string; // For `markNotificationAsRead`
}

export const getNotificationsByUser = async (
  req: Request<NotificationParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const notifications = await Notification.find({ user: req.params.userId });
    res.json(notifications);
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
};

export const markNotificationAsRead = async (
  req: Request<NotificationParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(notification);
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
};