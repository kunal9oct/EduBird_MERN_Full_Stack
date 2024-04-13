import mongoose from "mongoose";

const QuestionandPostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatarImgURL: {
        type: String,
        default: null
    },
    profileImgURL: {
        type: String,
        default: null
    },
    location: {
        type: String,
        default: null
    },
    question: {
        type: Boolean,
        default: null
    },
    post: {
        type: Boolean,
        default: null
    },
    rteText: {
        type: String,
        default: null
    },
    code: {
        type: String,
        default: null
    },
    video: {
        type: String,
        default: null
    },
    text: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
}, { timestamps: true });

export default mongoose.model('QuestionandPost', QuestionandPostSchema);
