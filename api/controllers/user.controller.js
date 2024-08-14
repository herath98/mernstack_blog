import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../model/user.model.js';
export const test = (req,res)=>{
    res.json({massage:'api is working'});
};

/**
 * Updates a user's information.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object|Error} - The updated user object or an error.
 */
export const updateUser = async (req, res, next) => {
    // Check if the user is updating their own account
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You can update only your account"));
    }

    // Check if the password is being updated
    if (req.body.password) {
        // Check if the password meets the requirements
        if (req.body.password.length < 6) {
            return next(errorHandler(400, "Password must be at least 6 characters"));
        }
        // Hash the password
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    // Check if the username is being updated
    if (req.body.username) {
        // Check if the username meets the requirements
        if (req.body.username.length < 7 || req.body.username.length > 25) {
            return next(errorHandler(400, "Username must be between 7 and 25 characters"));
        }
        if (req.body.username.includes(" ")) {
            return next(errorHandler(400, "Username cannot contain spaces"));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, "Username must be lowercase"));
        }
        // Check if the username already exists
        if (await User.findOne({ username: req.body.username })) {
            return next(errorHandler(400, "Username already exists"));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, "Username can only contain letters and numbers"));
        }
    }

    try {
        // Update the user's information in the database
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            },
            { new: true }
        );
        // Exclude the password field from the response
        const { password, ...rest } = updatedUser._doc;
        // Send the updated user data in the response
        res.status(200).json(rest);
    } catch (error) {
        // Pass the error to the next middleware function
        next(error);
    }
};


export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You can delete only your account"));
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("User has been deleted");
    } catch (error) {
        next(error);
    } 
};

export const signout = (req, res, next) => {
    try {
        res.clearCookie("access_token").status(200).json("User has been signed out");
    } 
    catch (error) {
        next(error);
    }

}

export const getUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to see all users'));
    }
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.sort === 'asc' ? 1 : -1;
  
      const users = await User.find()
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
  
      const usersWithoutPassword = users.map((user) => {
        const { password, ...rest } = user._doc;
        return rest;
      });
  
      const totalUsers = await User.countDocuments();
  
      const now = new Date();
  
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      const lastMonthUsers = await User.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      res.status(200).json({
        users: usersWithoutPassword,
        totalUsers,
        lastMonthUsers,
      });
    } catch (error) {
      next(error);
    }
  };

export const getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return next(errorHandler(404, 'User not found'));
      }
      const { password, ...rest } = user._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  }; 
  
export const usersByDate =  async (req, res) => {
    try {
      // Group users by date and get the count for each date
      const usersByDate = await User.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%d %B", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } }, // Sort by date
      ]);
  
      res.json(usersByDate);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};