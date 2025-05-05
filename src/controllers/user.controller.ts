import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import Division from '../models/division.model';
import Group from '../models/group.model';
import Head from '../models/head.model';
import Profile from '../models/profile.model';
import Attendance from '../models/attendance.model';
import HeadsUp from '../models/headsUp.model';
import Resource from '../models/resource.model';
import Notification from '../models/notification.model';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../utils/emailSender';
import { v2 as cloudinary } from 'cloudinary';
import { extractPublicId } from '../utils/cloudinaryHelpers';
import mongoose from 'mongoose';

// Extend Express Request type to include `files`
declare global {
  namespace Express {
    interface Request {
      files?: {
        [fieldname: string]: Express.Multer.File[];
      };
    }
  }
}

// Register User
export const createUserAsPresident = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, divisionId, groupId } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User with this email already exists.' });

    const division = await Division.findById(divisionId);
    if (!division) return res.status(404).json({ message: 'Division not found.' });

    const group = await Group.findOne({ _id: groupId, division: divisionId });
    if (!group) return res.status(404).json({ message: 'Group not found or does not belong to the specified division.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      passwordHash: hashedPassword,
      role: 'member',
    });

    await Division.findByIdAndUpdate(divisionId, { $addToSet: { members: user._id } });
    await Group.findByIdAndUpdate(groupId, { $addToSet: { members: user._id } });

    // Updated HTML email content
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="text-align: center; padding: 20px; background-color: #e3f2fd; border-bottom: 2px solid #1565c0;">
          <h1 style="color: #1565c0;">Welcome to the CSEC Club! 🎉</h1>
        </div>
        <div style="padding: 20px;">
          <p>Hi there,</p>
          <p>We are thrilled to welcome you to the <b>CSEC Club</b>! Your account has been successfully created, and you are now part of an amazing community of coding enthusiasts.</p>
          <p>Here are your account details:</p>
          <ul style="list-style: none; padding: 0;">
            <li><b>Email:</b> ${email}</li>
            <li><b>Password:</b> ${password}</li>
            <li><b>Division:</b> ${division.name}</li>
            <li><b>Group:</b> ${group.name}</li>
          </ul>
          <p>To get started, click the button below to log in to your account and explore the portal:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="https://csec-portal-frontend-five.vercel.app/" 
               style="background-color: #1565c0; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
              Go to CSEC Portal
            </a>
          </div>
          <p>After logging in, we recommend filling out your profile information to help us know you better and connect you with the right opportunities.</p>
          <p>If you have any questions or need assistance, feel free to reach out to us. We’re here to help!</p>
          <p>Welcome aboard, and let’s make great things happen together!</p>
          <p style="margin-top: 30px; font-size: 14px; color: #777;">Best regards,<br>The CSEC Team</p>
        </div>
        <div style="text-align: center; padding: 10px; background-color: #e3f2fd; border-top: 2px solid #1565c0; font-size: 12px; color: #777;">
          <p>© 2025 CSEC Club. All rights reserved.</p>
        </div>
      </div>
    `;

    await sendEmail(email, 'Welcome to CSEC 🎉', html);

    res.status(201).json({ message: 'User invited successfully.', user });
  } catch (err) {
    next(err);
  }
};

// Get All Users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const total = await User.countDocuments();
    const users = await User.find()
      .select('-passwordHash') // Exclude sensitive fields
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: users,
    });
  } catch (err) {
    next(err);
  }
};
// Get User by ID
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-passwordHash') // Exclude sensitive fields
      .lean(); // Convert Mongoose document to plain JavaScript object

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Ensure all personal_info fields are included
    const personalInfo = user.personal_info || {};
    const response = {
      ...user,
      personal_info: {
        first_name: personalInfo.first_name ?? '',
        last_name: personalInfo.last_name ?? '',
        gender: personalInfo.gender ?? '',
        birth_date: personalInfo.birth_date ?? null,
        phone_number: personalInfo.phone_number ?? '',
        github_handle: personalInfo.github_handle ?? '',
        telegram_handle: personalInfo.telegram_handle ?? '',
        department: personalInfo.department ?? '',
        specialization: personalInfo.specialization ?? '',
        graduation_year: personalInfo.graduation_year ?? null,
        university_id: personalInfo.university_id ?? '',
        bio: personalInfo.bio ?? '',
        instagram_handle: personalInfo.instagram_handle ?? '',
        linkedin_handle: personalInfo.linkedin_handle ?? '',
        leetcode_handle: personalInfo.leetcode_handle ?? '',
        codeforce_handle: personalInfo.codeforce_handle ?? '',
        profile_picture: personalInfo.profile_picture ?? '',
        cv_link: personalInfo.cv_link ?? '',
      },
    };

    res.status(200).json({ message: 'User profile fetched successfully.', user: response });
  } catch (err) {
    next(err);
  }
};

// Update User
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Delete User
// Update your deleteUser controller in user.controller.ts
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const userId = req.params.id;
    
    console.log(`Starting deletion for user ${userId}`); // Debug log
    
    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'User not found' });
    }

    // Cloudinary deletions (wrap in try-catch)
    try {
      const personalInfo = user.personal_info || {};
      const profilePublicId = extractPublicId(personalInfo.profile_picture, 'csec/profile_pictures');
      const cvPublicId = extractPublicId(personalInfo.cv_link, 'csec/cvs');

      await Promise.all([
        profilePublicId ? cloudinary.uploader.destroy(profilePublicId) : Promise.resolve(),
        cvPublicId ? cloudinary.uploader.destroy(cvPublicId) : Promise.resolve()
      ]);
    } catch (cloudinaryError) {
      console.error('Cloudinary deletion error:', cloudinaryError);
      // Continue even if Cloudinary fails
    }

    // Database operations
    await Promise.all([
      Division.updateMany(
        { $or: [{ members: userId }, { coordinators: userId }, { head: userId }] },
        { $pull: { members: userId, coordinators: userId }, $unset: { head: "" } },
        { session }
      ),
      Group.updateMany(
        { members: userId },
        { $pull: { members: userId } },
        { session }
      ),
      Head.deleteMany({ user: userId }, { session }),
      Profile.deleteMany({ user: userId }, { session }),
      Attendance.deleteMany({ profile: userId }, { session }), // Changed from profile_list
      HeadsUp.deleteMany({ profile: userId }, { session }),
      Resource.deleteMany({ uploaded_by: userId }, { session }),
      Notification.deleteMany({ user: userId }, { session }),
      user.deleteOne({ session })
    ]);

    await session.commitTransaction();
    res.json({ message: 'User and all related data deleted successfully.' });
  } catch (err) {
    await session.abortTransaction();
    console.error('Deletion error:', err); // Detailed error logging
    next(err);
  } finally {
    session.endSession();
  }
};
// Upload Profile Picture
export const uploadUserProfilePicture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    if (!req.file?.path) return res.status(400).json({ message: 'No file uploaded.' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const oldUrl = user.personal_info?.profile_picture;
    if (oldUrl) {
      const publicId = extractPublicId(oldUrl, 'csec/profile_pictures');
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: 'csec/profile_pictures',
    });

    user.personal_info = { ...(user.personal_info || {}), profile_picture: uploadResult.secure_url };
    await user.save();

    res.status(200).json({ message: 'Profile picture uploaded.', user });
  } catch (err) {
    next(err);
  }
};

// Delete Profile Picture
export const deleteUserProfilePicture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user || !user.personal_info?.profile_picture) {
      return res.status(404).json({ message: 'User or profile picture not found' });
    }

    const publicId = extractPublicId(user.personal_info.profile_picture, 'csec/profile_pictures');
    if (publicId) await cloudinary.uploader.destroy(publicId);

    user.personal_info.profile_picture = undefined;
    await user.save();

    res.status(200).json({ message: 'Profile picture deleted from Cloudinary and DB.', user });
  } catch (err) {
    next(err);
  }
};

// Upload CV
export const uploadUserCV = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    if (!req.file?.path) return res.status(400).json({ message: 'No file uploaded.' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const oldCV = user.personal_info?.cv_link;
    if (oldCV) {
      const publicId = extractPublicId(oldCV, 'csec/cvs');
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: 'csec/cvs',
      resource_type: 'raw',
    });

    user.personal_info = { ...(user.personal_info || {}), cv_link: uploadResult.secure_url };
    await user.save();

    res.status(200).json({ message: 'CV uploaded.', user });
  } catch (err) {
    next(err);
  }
};

// Delete CV
export const deleteUserCV = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user || !user.personal_info?.cv_link) {
      return res.status(404).json({ message: 'User or CV not found' });
    }

    const publicId = extractPublicId(user.personal_info.cv_link, 'csec/cvs');
    if (publicId) await cloudinary.uploader.destroy(publicId);

    user.personal_info.cv_link = undefined;
    await user.save();

    res.status(200).json({ message: 'CV deleted from Cloudinary and DB.', user });
  } catch (err) {
    next(err);
  }
};

// ✅ Updated: Update full personal_info + profile_picture + CV
export const updateFullPersonalInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const {
      first_name,
      last_name,
      gender,
      birth_date,
      phone_number,
      github_handle,
      telegram_handle,
      department,
      specialization,
      graduation_year,
      university_id,
      bio,
      instagram_handle,
      linkedin_handle,
      leetcode_handle,
      codeforce_handle,
    } = req.body;

    // Handle profile picture upload
    let newProfilePic = user.personal_info?.profile_picture;
    if (req.files?.['profile_picture']) {
      const profilePictureFile = req.files['profile_picture'][0];
      const uploadResult = await cloudinary.uploader.upload(profilePictureFile.path, {
        folder: 'csec/profile_pictures',
      });
      newProfilePic = uploadResult.secure_url;

      // Optionally delete the old profile picture from Cloudinary
      const oldPicture = user.personal_info?.profile_picture;
      if (oldPicture) {
        const publicId = extractPublicId(oldPicture, 'csec/profile_pictures');
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }
    }

    // Handle CV upload
    let newCV = user.personal_info?.cv_link;
    if (req.files?.['cv']) {
      const cvFile = req.files['cv'][0];
      const uploadResult = await cloudinary.uploader.upload(cvFile.path, {
        folder: 'csec/cvs',
        resource_type: 'raw', // For non-image files like PDFs
      });
      newCV = uploadResult.secure_url;

      // Optionally delete the old CV from Cloudinary
      const oldCV = user.personal_info?.cv_link;
      if (oldCV) {
        const publicId = extractPublicId(oldCV, 'csec/cvs');
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }
    }

    // Update user personal info
    user.personal_info = {
      ...(user.personal_info || {}),
      first_name,
      last_name,
      gender,
      birth_date,
      phone_number,
      github_handle,
      telegram_handle,
      department,
      specialization,
      graduation_year,
      university_id,
      bio,
      instagram_handle,
      linkedin_handle,
      leetcode_handle,
      codeforce_handle,
      ...(newProfilePic && { profile_picture: newProfilePic }),
      ...(newCV && { cv_link: newCV }),
    };

    await user.save();

    // Fetch the updated user with all fields populated
    const updatedUser = await User.findById(userId)
      .select('-passwordHash') // Exclude sensitive fields
      .lean(); // Convert Mongoose document to plain JavaScript object

    res.status(200).json({ message: 'Personal information updated.', user: updatedUser });
  } catch (err) {
    next(err);
  }
};

export const getLastSeen = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id).select('lastSeen');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ lastSeen: user.lastSeen });
  } catch (err) {
    next(err);
  }
};
