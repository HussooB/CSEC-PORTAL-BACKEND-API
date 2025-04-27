// middleware/validateMultipartBody.ts
import { Request, Response, NextFunction } from 'express';
import { AnyObjectSchema } from 'yup';

export const validateMultipartBody = (schema: AnyObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Handle potential JSON string in resources
      if (typeof req.body.resources === 'string') {
        try {
          req.body.resources = JSON.parse(req.body.resources);
        } catch (err) {
          return res.status(400).json({ message: 'Invalid JSON in resources field.' });
        }
      }

      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (error: any) {
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
  };
};
