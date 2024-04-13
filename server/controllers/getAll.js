import QuestionandPost from "../models/QuestionandPost.js";

export const getAll = async (req, res, next) => {
    try {
        const all = await QuestionandPost.find({}, { "name": 1, "question": 1, "post": 1, "rteText": 1, "code": 1, "text": 1, "video": 1, "image": 1, "avatarImgURL": 1, "profileImgURL": 1, "location": 1, "createdAt": 1, "_id": 0 }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, all: all });
    } catch (error) {
        next(error);
    }
}
