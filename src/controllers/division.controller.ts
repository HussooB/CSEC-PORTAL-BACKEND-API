// src/controllers/division.controller.ts
import { Request, Response } from 'express';
import Division from '../models/division.model';

export const createDivision = async (req: Request, res: Response) => {
  try {
    const division = await Division.create(req.body);
    res.status(201).json(division);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create division', error: err });
  }
};

export const getDivisions = async (_req: Request, res: Response) => {
  try {
    const divisions = await Division.find().populate('head members coordinators');
    res.json(divisions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch divisions', error: err });
  }
};

export const getDivisionById = async (req: Request, res: Response) => {
  try {
    const division = await Division.findById(req.params.id).populate('head members coordinators');
    if (!division) return res.status(404).json({ message: 'Division not found' });
    res.json(division);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch division', error: err });
  }
};

export const updateDivision = async (req: Request, res: Response) => {
  try {
    const updated = await Division.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Division not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update division', error: err });
  }
};

export const deleteDivision = async (req: Request, res: Response) => {
  try {
    await Division.findByIdAndDelete(req.params.id);
    res.json({ message: 'Division deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete division', error: err });
  }
};
