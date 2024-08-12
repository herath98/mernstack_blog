import  Jwt  from "jsonwebtoken";
import {errorHandler} from "./error.js";

/**
 * Middleware function to verify that the request is authenticated by checking for a valid token in
 * the request's cookies. If a token is not found, return a 401 response with an explanation.
 * If the token is found, verify its authenticity using the secret key from the environment variables.
 * If the token is invalid, return a 403 response with an explanation.
 * If the token is valid, set the request's user property to the user object from the verified token
 * and call the next middleware.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
// Verify that the request is authenticated by checking for a valid token in
// the request's cookies. If a token is not found, return a 401 response
// with an explanation. If the token is found, verify its authenticity using
// the secret key from the environment variables. If the token is invalid,
// return a 403 response with an explanation.
// If the token is valid, set the request's user property to the
// user object from the verified token and call the next middleware.
export const verifyToken = (req, res, next) => {
    // Check if the request has a valid token in its cookies
    const token = req.cookies.access_token;
    if (!token) {
        // If no token is found, return a 401 response with an explanation
        return next(errorHandler(401, "You are not authenticated"));
    }

    // Verify the authenticity of the token using the secret key from the environment variables
    Jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // If the token is invalid, return a 403 response with an explanation
            return next(errorHandler(403, "Token is not valid"));
        }
        // If the token is valid, set the request's user property to the user object from the verified token
        req.user = user;
        // Call the next middleware
        next();
    });
};

