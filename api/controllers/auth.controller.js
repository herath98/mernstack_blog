import User from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';



/**
 * Sign up a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Promise<void>} - A promise that resolves when the signup is complete.
 */
export const signup = async (req, res, next) => {
    // Destructure the request body
    const { username, email, password } = req.body;

    // Check if any of the fields are empty
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        // Return a 400 error with a message if any fields are empty
        return next(errorHandler(400, 'Please fill in all fields'));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
        username, // Store the username
        email, // Store the email
        password: hashedPassword, // Store the hashed password
    });

    try {
        // Save the user to the database
        await newUser.save();

        // Send a success response
        res.status(201).json({ message: 'Signup successful!' });
        
    } catch (error) {
        // If there is an error, pass it to the next middleware
        next(error);
    }
};

/**
 * Sign in an existing user.
 */
export const signin = async (req, res, next) => {
    // Destructure the request body
    const { email, password } = req.body;

    // Check if any of the fields are empty
    if (!email || !password || email === '' || password === '') {
        // Return a 400 error with a message if any fields are empty
        return next(errorHandler(400, 'Please fill in all fields'));
    }

    try {
        // Find the user in the database
        const validUser = await User.findOne({ email });

        // If user does not exist, return a 404 error
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

        // Compare the provided password with the hashed password in the database
        const validPassword = bcrypt.compareSync(password, validUser.password);

        // If password is invalid, return a 400 error
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }

        // Generate a JWT token with user id and admin status
        const token = jwt.sign({ id: validUser._id , isAdmin: validUser.isAdmin }, process.env.JWT_SECRET);

        // Exclude password from response 
        const { password: pass, ...rest } = validUser._doc;

        // Send a success response with the token and user data
        res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
    } catch (error) {
        // If there is an error, pass it to the next middleware
        next(error);
    }
};



/**
 * Handles Google authentication.
 * If the user exists, signs them in with a JWT token.
 * If the user doesn't exist, creates a new user with a random password,
 * signs them in, and sends their data back in the response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export const google = async (req, res, next) => {
    // Destructure the necessary properties from the request body
    const { name, email, googlePhotoUrl } = req.body;

    try {
        // Find the user in the database by email
        const user = await User.findOne({ email });

        // If user exists, sign them in
        if (user) {
            // Generate a JWT token with user id  status
            const token = jwt.sign({ id: user._id , isAdmin: user.isAdmin }, process.env.JWT_SECRET);

            // Exclude password from response 
            const { password: pass, ...rest } = user._doc;

            // Send a success response with the token and user data
            res.status(200)
                .cookie('access_token', token, { httpOnly: true })
                .json(rest);
        } else {
            // If user doesn't exist, create a new user with a random password

            // Generate a random password
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

            // Hash the password
            const hashedPassword = bcrypt.hashSync(generatePassword, 10);

            // Create a new user object with the necessary properties
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4), // Generate a username with the user's name and a random number
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });

            // Save the new user to the database
            await newUser.save();

            // Generate a JWT token with user id and admin status
            const token = jwt.sign({ id: newUser._id , isAdmin: newUser.isAdmin }, process.env.JWT_SECRET);

            // Exclude password from response 
            const { password: pass, ...rest } = newUser._doc;

            // Send a success response with the token and user data
            res.status(200)
                .cookie('access_token', token, { httpOnly: true })
                .json(rest);
        }
    } catch (error) {
        // Log the error for debugging
        console.error('Error during Google authentication:', error);

        // Pass the error to the next middleware
        next(error);
    }
};

