import mongoose from 'mongoose';

// Define the schema for the user model
const userSchema = new mongoose.Schema({
    // The username should be unique and is required
    username: {
        type: String,
        required: true, // Corrected the typo from `require` to `required`
        unique: true,
    },
    // The email should be unique and is required
    email: {
        type: String,
        required: true, // Corrected the typo from `require` to `required`
        unique: true,
    },
    // Password is required
    password: {
        type: String,
        required: true, // Corrected the typo from `require` to `required`
    },
    profilePicture: {
        type: String,
        default: 'https://static.thenounproject.com/png/1559146-200.png',
    }, 
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, 
{ timestamps: true }); // Enable timestamps to track creation and update times

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;
