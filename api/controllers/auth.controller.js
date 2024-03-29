import User from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';



export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    // Check for empty fields and return a 400 error if any are empty
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return next(errorHandler(400, 'Please fill in all fields'));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
        username,
        email,
        // Store the hashed password
        password: hashedPassword,
    });
    try {
        // Save the user to the database
        await newUser.save();

        // Send a success response
        res.status(201).json({ message: 'Signup successful!' });
    }
    catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, 'Please fill in all fields'));
    }

    try {
        // Find the user in the database
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }
        const token = jwt.sign({ id: validUser._id , isAdmin: validUser.isAdmin}, process.env.H_SECRET);

        // Exclude password from response  
        const { password: pass, ...rest } = validUser._doc;

        res.status(200).cookie('token', token, { httpOnly: true }).json(rest);
    } catch (error) {
        next(error);
    }
};


export const google = async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;
    try {
        const user =await User.findOne({ email });
        if(user){
            const token = jwt.sign({ id: user._id , isAdmin: user.isAdmin}, process.env.H_SECRET);
            const { password, ...rest } = user._doc;
            res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);

        }
        else{
            const password = Math.random().toString(36).slice(-8) +  Math.random().toString(36).slice(-8);
            const hashedPassword =  bcrypt.hashSync(password, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),     
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,    
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id , isAdmin: newUser.isAdmin}, process.env.H_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);

        }
    } catch (error) {
        next(error);
    }
}
