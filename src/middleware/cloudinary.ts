import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer, { StorageEngine } from 'multer'; // Import StorageEngine
import { Request } from 'express'; // Import Request type from Express
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
    folder: 'csec/profile_pictures', // Specify the folder
    format: async () => 'png', // Set the format (optional)
    public_id: (req: Request, file: Express.Multer.File) => `profile_${Date.now()}`, // Generate a unique public ID
  } as Record<string, unknown>, // Use a type assertion to bypass the error
}) as StorageEngine; // Explicitly cast as StorageEngine
export const uploadProfilePicture = multer({ storage: profilePictureStorage });

// CV upload
const cvStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'csec/cvs', // Specify the folder
    format: async () => 'pdf', // Set the format (optional)
    public_id: (req: Request, file: Express.Multer.File) => `cv_${Date.now()}`, // Generate a unique public ID
  } as Record<string, unknown>, // Use a type assertion to bypass the error
}) as StorageEngine; // Explicitly cast as StorageEngine
export const uploadCV = multer({ storage: cvStorage });