import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'da72n8skl',
    api_key: process.env.CLOUDINARY_API_KEY || '491546791655735',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'E5vKUpzEjbYczAz4SnG7whRuwsU',
});

export default cloudinary;
