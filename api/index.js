import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.router.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
.then(() => {
    console.log("MongoDB is connected");
})
.catch((err) => {
    console.log(err);
});

const app = express();

// Use express.json() middleware for parsing JSON
app.use(express.json());

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000")
});

// Use routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

