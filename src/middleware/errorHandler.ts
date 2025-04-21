import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  // Log the full error for developers
  console.error('🔥 Developer Error:', err);

  // Check if the error is user-facing (e.g., has a statusCode or isOperational flag)
  if (err.statusCode && err.isOperational) {
    // Send user-friendly error
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // For unexpected errors, send a generic message to the user
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error', // Generic message for users
  });
};