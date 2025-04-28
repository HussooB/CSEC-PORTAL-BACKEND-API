import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
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
      { expiresIn: '15m' } // Access token expires in 15 minutes
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

    // Send tokens and sanitized user data to the client
    const response = {
      accessToken,
      ...(rememberMe && { refreshToken }), // Include refreshToken only if rememberMe is true
      user: sanitizeUser(user),
    };

    res.json(response);
  } catch (err) {
    next(err);
  }
};

// Refresh Token Controller
export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ message: 'Refresh token is required' });

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;

    // Find the user and validate the refresh token
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Generate a new access token
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' } // New access token expires in 15 minutes
    );

    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

// Logout Controller
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;

  try {
    // Find the user and clear the refresh token
    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(401).json({ message: 'Invalid refresh token' });

    user.refreshToken = null;
    await user.save();

    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};