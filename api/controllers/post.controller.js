import Post from "../model/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {

    if (!req.user.isAdmin) {
        return next(errorHandler(403, "Only admins can create posts"))
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, "Plase provide all required"));
    }

    const slug = req.body.title.split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9-]/g, "");
    const newPost = new Post({
        ...req.body, slug, userId: req.user.id
    });
    try {
        const createdPost = await newPost.save();
        res.status(201).json(createdPost);

    }
    catch (error) {
        next(error);
    }

};