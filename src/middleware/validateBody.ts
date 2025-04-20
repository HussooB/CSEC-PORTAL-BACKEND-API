// src/middleware/validateBody.ts
import { Request, Response, NextFunction } from 'express';
import { AnyObjectSchema } from 'yup';

export const validateBody = (schema: AnyObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
      next();
    } catch (error: any) {
      res.status(400).json({
        message: 'Validation failed',
        errors: error.errors,
      });
    }
  };
};
