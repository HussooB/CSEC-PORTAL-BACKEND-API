import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import Division from '../models/division.model';
import Group from '../models/group.model';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../utils/emailSender';
import { v2 as cloudinary } from 'cloudinary';
import { extractPublicId } from '../utils/cloudinaryHelpers';

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
    next(err);
  }
};

// Get All Users
export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Get User by ID
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
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
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const personalInfo = user.personal_info || {};
    const profilePublicId = extractPublicId(personalInfo.profile_picture, 'csec/profile_pictures');
    const cvPublicId = extractPublicId(personalInfo.cv_link, 'csec/cvs');

    if (profilePublicId) await cloudinary.uploader.destroy(profilePublicId);
    if (cvPublicId) await cloudinary.uploader.destroy(cvPublicId);

    await user.deleteOne();
    res.json({ message: 'User and associated files deleted successfully.' });
  } catch (err) {
    next(err);
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
      resources,
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
      resources: (() => {
        try {
          return resources ? JSON.parse(resources) : [];
        } catch (err) {
          console.error('Invalid JSON for resources:', resources);
          return [];
        }
      })(),
      ...(newProfilePic && { profile_picture: newProfilePic }),
      ...(newCV && { cv_link: newCV }),
    };

    await user.save();
    res.status(200).json({ message: 'Personal information updated.', user });
  } catch (err) {
    next(err);
  }
};