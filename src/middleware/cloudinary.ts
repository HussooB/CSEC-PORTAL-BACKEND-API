import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer, { StorageEngine } from 'multer';
import { Request } from 'express';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Profile picture upload
const profilePictureStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'csec/profile_pictures',
    format: async () => 'png',
    public_id: (req: Request, file: Express.Multer.File) => `profile_${Date.now()}`,
  } as Record<string, unknown>,
}) as StorageEngine;
export const uploadProfilePicture = multer({ storage: profilePictureStorage });

// CV upload
const cvStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'csec/cvs',
    format: async () => 'pdf',
    public_id: (req: Request, file: Express.Multer.File) => `cv_${Date.now()}`,
  } as Record<string, unknown>,
}) as StorageEngine;
export const uploadCV = multer({ storage: cvStorage });

// ✅ Combined upload for full personal info (profile_picture + cv_link)
export const uploadFullInfo = multer({
  storage: multer.diskStorage({}), // Dummy disk storage to let multer accept files
}).fields([
  { name: 'profile_picture', maxCount: 1 },
  { name: 'cv', maxCount: 1 },
]);
