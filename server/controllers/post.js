import QuestionandPost from '../models/QuestionandPost.js';

export const post = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            if (req.files['image']) {
                req.body = { ...req.body, ['image']: req.files['image'][0].filename }
            }

            if (req.files['video']) {
                req.body = { ...req.body, ['video']: req.files['video'][0].filename }
            }

            const newPost = new QuestionandPost(req.body);
            await newPost.save();
            
            res.status(200).json({ success: true });
        } catch (error) {
            next(error);
        }
    } else {
        return res.status(403).json({
            success: false,
            status: 403,
            message: "You can only Create post from own account!",
        })
    }
}
