import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../model/user.model.js';
export const test = (req,res)=>{
    res.json({massage:'api is working'});
};

export const updateUser= async (req,res,next)=>{
    if (req.user.id !== req.params.userId){
        return next(errorHandler(403, "You can update only your account"));
    }
    if (req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(400, "Password must be at least 6 characters"));
        }
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    if (req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 25){
            return next(errorHandler(400, "Username must be at between 7 and 25 characters"));
        }
        if(req.body.username.includes(" ")){
            return next(errorHandler(400, "Username cannot contain spaces"));
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(400, "Username must be lowercase"));
        }
        if (await User.findOne({ username: req.body.username })){
            return next(errorHandler(400, "Username already exists"));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400, "Username can only contain letters and numbers"));
        }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email : req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password,
            },
        },
         { new: true });
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You can delete only your account"));
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("User has been deleted");
    } catch (error) {
        next(error);
    } 
}