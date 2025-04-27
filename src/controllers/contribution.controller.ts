import { Request, Response, NextFunction } from 'express';
import Contribution from '../models/contribution.model';

interface ContributionBody {
  title: string;
  description: string;
  profile: string; // Adjust based on your schema
}

export const createContribution = async (
  req: Request<{}, {}, ContributionBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const contribution = await Contribution.create(req.body);
    res.status(201).json(contribution);
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
};

export const getContributionsByProfile = async (
  req: Request<{ profileId: string }>, // Explicitly type req.params
  res: Response,
  next: NextFunction
) => {
  try {
    const contributions = await Contribution.find({ profile: req.params.profileId });
    res.json(contributions);
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
};