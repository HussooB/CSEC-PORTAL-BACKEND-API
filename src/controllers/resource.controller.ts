import { Request, Response, NextFunction } from 'express';
import Resource from '../models/resource.model';


interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

export const addResource = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const resource = await Resource.create({
      ...req.body,
      uploaded_by: req.user.id, // Now TypeScript knows req.user exists
    });
    res.status(201).json(resource);
  } catch (err) {
    next(err);
  }
};

export const listResources = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    next(err);
  }
};

export const deleteResource = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resource deleted' });
  } catch (err) {
    next(err);
  }
};
