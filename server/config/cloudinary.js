import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'djusefan5',
    api_key: process.env.CLOUDINARY_API_KEY || '227448376867724',
        api_secret: process.env.CLOUDINARY_API_SECRET || 'w-2v7Yt_uGfC6vX_L7gK4s-1Y-0',
});

export default cloudinary;
