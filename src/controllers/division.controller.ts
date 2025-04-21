import { Request, Response, NextFunction } from 'express';
import Division from '../models/division.model';

export const createDivision = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const division = await Division.create(req.body);
    res.status(201).json(division);
  } catch (err) {
    next(err);
  }
};

export const getDivisions = async (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const total = await Division.countDocuments();
    const divisions = await Division.find()
      .populate('head members coordinators')
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: divisions,
    });
  } catch (err) {
    next(err);
  }
};

export const getDivisionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const division = await Division.findById(req.params.id).populate('head members coordinators');
    if (!division) return res.status(404).json({ message: 'Division not found' });
    res.json(division);
  } catch (err) {
    next(err);
  }
};

export const updateDivision = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await Division.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Division not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteDivision = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Division.findByIdAndDelete(req.params.id);
    res.json({ message: 'Division deleted successfully' });
  } catch (err) {
    next(err);
  }
};