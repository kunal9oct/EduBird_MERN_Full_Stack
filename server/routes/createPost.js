import express from 'express';
import multer from 'multer';
import { post } from '../controllers/post.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, 'uploads/images/');
        } else if (file.mimetype.startsWith('video')) {
            cb(null, 'uploads/videos/'); 
        } else {
            cb(new Error('Invalid file type'));
        }
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post('/:id', verifyToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), post);

export default router;
