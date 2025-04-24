declare module 'multer-storage-cloudinary' {
  import { StorageEngine } from 'multer';
  import { ConfigOptions, UploadApiOptions, UploadApiResponse } from 'cloudinary';

  export interface CloudinaryStorageOptions {
    cloudinary: {
      config: (options: ConfigOptions) => void;
    };
    params?: {
      folder?: string;
      format?: string;
      public_id?: (req: Express.Request, file: Express.Multer.File) => string;
      allowed_formats?: string[];
      resource_type?: string; // Add resource_type here
      [key: string]: any;
    };
  }

  export class CloudinaryStorage implements StorageEngine {
    constructor(options: CloudinaryStorageOptions);
  }
}