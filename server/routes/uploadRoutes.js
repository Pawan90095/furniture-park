import path from 'path';
import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'furniture-park', // The name of the folder in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
    res.send(req.file.path);
});

export default router;
