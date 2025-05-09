import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import Division from '../models/division.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Utility function to sanitize user object
const sanitizeUser = (user: any) => {
  const { passwordHash, refreshToken, __v, ...sanitizedUser } = user.toObject();
  if (sanitizedUser.personal_info) {
    // Remove unnecessary fields from personal_info if needed
    const { resources, ...filteredPersonalInfo } = sanitizedUser.personal_info;
    sanitizedUser.personal_info = filteredPersonalInfo;
  }
  return sanitizedUser;
};

// Login Controller
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, rememberMe } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate Access Token (short-lived)
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' } // Access token expires in 1 day
    );

    let refreshToken: string | undefined;

    // Generate Refresh Token only if rememberMe is true
    if (rememberMe) {
      refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: '7d' } // Refresh token expires in 7 days
      );

      user.refreshToken = refreshToken;
      await user.save();
    } else {
      // Clear any existing refresh token if rememberMe is false
      user.refreshToken = null;
      await user.save();
    }

    // Fetch the user's associated division
    const division = await Division.findOne({ head: user._id }).select('_id name');

    // Send tokens, sanitized user data, and division to the client
    const response = {
      accessToken,
      ...(rememberMe && { refreshToken }), // Include refreshToken only if rememberMe is true
      user: sanitizeUser(user),
      division, // Include division in the response
    };

    res.json(response);
  } catch (err) {
    next(err);
  }
};