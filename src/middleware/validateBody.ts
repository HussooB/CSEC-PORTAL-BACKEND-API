import { Request, Response, NextFunction } from 'express';
import { AnyObjectSchema } from 'yup';

export const validateBody = (schema: AnyObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
      next();
    } catch (error: any) {
      const validationError = new Error('Validation failed.');
      (validationError as any).statusCode = 400;
      (validationError as any).isOperational = true;
      (validationError as any).errors = error.errors;
      next(validationError); // Forward error to errorHandler
    }
  };
};