import  Jwt  from "jsonwebtoken";
import {errorHandler} from "./error.js";

// Verify that the request is authenticated by checking for a valid token in
// the request's cookies. If a token is not found, return a 401 response
// with an explanation. If the token is found, verify its authenticity using
// the secret key from the environment variables. If the token is invalid,
// return a 403 response with an explanation.
// If the token is valid, set the request's user property to the
// user object from the verified token and call the next middleware.
export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, "You are not authenticated"));
    }
    Jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err){
             return next(errorHandler(403, "Token is not valid"));
        }
        req.user = user;
        next();
    });
};

