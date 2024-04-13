import express from 'express';
import multer from 'multer';
import { question } from '../controllers/question.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/videos/");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
    },
});

const videoUpload = multer({ storage: storage });

router.post('/askQuestion/:id', verifyToken, videoUpload.single('video'), question);

export default router;
