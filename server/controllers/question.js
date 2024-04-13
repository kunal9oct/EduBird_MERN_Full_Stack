import QuestionandPost from '../models/QuestionandPost.js';

export const question = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            if(req.file) {
                req.body = {...req.body, ['video']: req.file.filename}
            }

            const newQuestion = new QuestionandPost(req.body)
            await newQuestion.save();
            
            res.status(200).json({ success: true });
        } catch (error) {
            next(error);
        }
    } else {
        return res.status(403).json({
            success: false,
            status: 403,
            message: "You can only upload Question from own account!",
        })
    }
}
