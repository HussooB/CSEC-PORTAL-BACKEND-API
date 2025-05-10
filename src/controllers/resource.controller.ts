
import { Request, Response, NextFunction } from 'express';
import Resource from '../models/resource.model';
import { IUser } from '../models/user.model';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    role: string;
  } & Partial<IUser>;
}

export const addResource = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, link, division } = req.body;
    const authenticatedReq = req as AuthenticatedRequest;

    if (!authenticatedReq.user?.id) {
      return res.status(401).json({ message: 'Unauthorized: User information is missing.' });
    }

    const resource = await Resource.create({
      name,
      link,
      uploaded_by: authenticatedReq.user.id,
      division // Now optional
    });

    res.status(201).json(resource);
  } catch (err) {
    next(err);
  }
};

export const listResources = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { divisionId, userId, includePersonal } = req.query;

    const query: any = {};
    if (divisionId) {
      query.division = divisionId;
    } else if (includePersonal === 'true') {
      // If includePersonal is true and no divisionId, get both personal and division resources
      query.$or = [
        { division: { $exists: false } },
        { division: null }
      ];
    }

    if (userId) query.uploaded_by = userId;

    const resources = await Resource.find(query)
      .populate('division', 'name')
      .populate('uploaded_by', 'email');

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

export const getResourcesByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    const resources = await Resource.find({ uploaded_by: userId }).populate('division', 'name');
    if (!resources || resources.length === 0) {
      return res.status(404).json({ message: 'No resources found for this user' });
    }
    res.status(200).json(resources);
  } catch (err) {
    next(err);
  }
};

export const getResourcesByDivision = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { divisionId } = req.params;

    const resources = await Resource.find({ division: divisionId }).populate('division', 'name');
    if (!resources || resources.length === 0) {
      return res.status(404).json({ message: 'No resources found for this division' });
    }
    res.status(200).json(resources);
  } catch (err) {
    next(err);
  }
};