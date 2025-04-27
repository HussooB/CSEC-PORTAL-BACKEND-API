import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  // Check if the error is user-facing (e.g., has a statusCode or isOperational flag)
  if (err.statusCode && err.isOperational) {
    // Send user-friendly error
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      errors: err.errors || null, // Include additional error details if available
    });
  }

  // For unexpected errors, send a generic message to the user
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error', // Generic message for users
  });

  // Prevent the server from crashing by removing uncaught exception/rejection handlers
  // These handlers should be managed globally in your server.ts file, not here
};