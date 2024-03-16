import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.router.js';
import cookieParser from 'cookie-parser';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB is connected");
    })
    .catch((err) => {
        console.error(err);
    });

const app = express();

// Use express.json() middleware for parsing JSON
app.use(express.json());
app.use(cookieParser());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Use routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware to catch and respond to any errors in the application
app.use((err, req, res, next) => {
    // Set status code to the error's status or default to 500 if not provided
    const statusCode = err.statusCode || 500;
    // Set error message to the error's message or default to a generic message if not provided
    const message = err.message || 'Something went wrong';
    // Send the error response with status code and message
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});