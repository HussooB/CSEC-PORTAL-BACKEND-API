// resource.controller.ts
import { Request, Response } from 'express';
import Resource from '../models/resource.model';

export const addResource = async (req: Request, res: Response) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add resource', error: err });
  }
};

export const listResources = async (_req: Request, res: Response) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get resources', error: err });
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resource deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete resource', error: err });
  }
};