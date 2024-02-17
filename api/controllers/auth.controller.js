import User from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

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