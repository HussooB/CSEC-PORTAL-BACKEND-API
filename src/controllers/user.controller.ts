import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import Division from '../models/division.model';
import Group from '../models/group.model';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../utils/emailSender';

export const createUserAsPresident = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, divisionId, groupId } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // Check if the division exists
    const division = await Division.findById(divisionId);
    if (!division) {
      return res.status(404).json({ message: 'Division not found.' });
    }

    // Check if the group exists and belongs to the division
    const group = await Group.findOne({ _id: groupId, division: divisionId });
    if (!group) {
      return res.status(404).json({ message: 'Group not found or does not belong to the specified division.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      email,
      passwordHash: hashedPassword,
      role: 'member', // Default role for invited users
    });

    // Add the user to the division and group
    await Division.findByIdAndUpdate(divisionId, { $addToSet: { members: user._id } });
    await Group.findByIdAndUpdate(groupId, { $addToSet: { members: user._id } });

    // Send an invitation email with division and group details
    const html = `
      <h2>Welcome to the CSEC Club!</h2>
      <p>Your account has been created successfully.</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Password:</b> ${password}</p>
      <p><b>Division:</b> ${division.name}</p>
      <p><b>Group:</b> ${group.name}</p>
      <p>We are excited to have you on board!</p>
    `;
    await sendEmail(email, 'Welcome to CSEC 🎉', html);

    res.status(201).json({ message: 'User invited successfully.', user });
  } catch (err) {
    next(err); // Forward error to errorHandler
  }
};

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};