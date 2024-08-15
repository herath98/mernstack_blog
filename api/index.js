import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.router.js';
import postRoutes from './routes/post.router.js';
import cookieParser from 'cookie-parser';
import commentRoutes from './routes/comment.route.js';
import path from 'path';

dotenv.config();

const __dirname = path.resolve();

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
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
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);



app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

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