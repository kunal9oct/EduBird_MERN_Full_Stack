import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import updateRoutes from './routes/editProfile.js';
import postRoutes from './routes/createPost.js';
import questionRoutes from './routes/question.js';
import { getAll } from './controllers/getAll.js';
import cors from "cors";

const app = express();
app.use(cors());
app.use('/uploads/images', express.static('uploads/images'));
app.use('/uploads/videos', express.static('uploads/videos'));

dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

const connect = () => {
    mongoose.connect(MONGODB_URL).then(() => {
        console.log('Connected to DataBase');
    }).catch(err => { throw err });
};

app.use(express.json());
app.use('', authRoutes);
app.use('/editProfile', updateRoutes);
app.use('/createPost', postRoutes);
app.use('/question', questionRoutes);
app.get('/getAll', getAll);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!';
    return res.status(status).json({
        success: false,
        status,
        message,
    })
})

app.listen(PORT, () => {
    connect();
    console.log(`Server running on PORT ${PORT}`);
})
