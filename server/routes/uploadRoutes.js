import path from 'path';
import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

let storage;
try {
    storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: 'furniture-park',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        },
    });
} catch (error) {
    console.error('Cloudinary Storage Init Failed:', error);
    // Fallback to memory storage if Cloudinary fails (prevents app crash)
    storage = multer.memoryStorage();
}

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
    res.send(req.file.path);
});

export default router;
