import Project from "../model/Project.model.js";
import Post from "../model/post.model.js";
import { errorHandler } from "../utils/error.js";

export const createproject = async (req, res, next) => {

    if (!req.user.isAdmin) {
        return next(errorHandler(403, "Only admins can create posts"))
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, "Plase provide all required"));
    }

    const slug = req.body.title.split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9-]/g, "");
    const newProject = new Project({
        ...req.body, slug, userId: req.user.id
    });
    try {
        const createdProject = await newProject.save();
        res.status(201).json(createdProject);

    }
    catch (error) {
        next(error);
    }

};

/**
 * This function handles the route for retrieving posts.
 * It takes in three query parameters: startIndex, limit, and order.
 * It returns an object containing the posts, totalPosts, and lastMonthPosts.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export const getproject = async (req, res, next) => {
    try {
        // Parse the startIndex query parameter, defaulting to 0 if not provided
        const startIndex = parseInt(req.query.startIndex) || 0;
        // Parse the limit query parameter, defaulting to 9 if not provided
        const limit = parseInt(req.query.limit) || 9;
        // Determine the sort direction based on the order query parameter, defaulting to descending if not provided
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        // Initialize an empty query object
        const query = {};

        // If a userId query parameter is provided, add it to the query object
        if (req.query.userId) {
            query.userId = req.query.userId;
        }

        // If a category query parameter is provided, add it to the query object
        if (req.query.category) {
            query.category = req.query.category;
        }

        // If a slug query parameter is provided, add it to the query object
        if (req.query.slug) {
            query.slug = req.query.slug;
        }

        // If a postId query parameter is provided, add it to the query object
        if (req.query.projectId) {
            query._id = req.query.projectId;
        }

        // If a searchTerm query parameter is provided, add a $or query to the query object
        if (req.query.searchTerm) {
            query.$or = [
                { title: { $regex: req.query.searchTerm, $options: 'i' } }, // Search for the searchTerm in the title field, case-insensitive
                { content: { $regex: req.query.searchTerm, $options: 'i' } } // Search for the searchTerm in the content field, case-insensitive
            ];
        }

        // Retrieve the posts from the database based on the query object
        const projects = await Project.find(query)
            .sort({ createdAt: sortDirection }) // Sort the posts by createdAt in the specified direction
            .skip(startIndex) // Skip the specified number of posts
            .limit(limit); // Limit the number of posts returned

        // Retrieve the total number of posts from the database
        const totalPosts = await Project.countDocuments();

        // Calculate the date one month ago
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        // Retrieve the number of posts created in the last month from the database
        const lastMonthPosts = await Project.countDocuments({
            createdAt: { $gte: oneMonthAgo } // Filter for posts created after one month ago
        });

        // Return the posts, totalPosts, and lastMonthPosts as a JSON response
        res.status(200).json({
            projects,
            totalPosts,
            lastMonthPosts
        });
    } catch (error) {
        // If an error occurs, pass it to the next middleware function
        next(error);
    }
};


export const deleteproject = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to delete this post'));
    }
    try {
      await Project.findByIdAndDelete(req.params.postId);
      res.status(200).json('The post has been deleted');
    } catch (error) {
      next(error);
    }
  };

  export const updateproject = async (req, res, next) => {
    // Check if the user is an admin or the owner of the post
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this post'));
    }
  
    try {
      // Update the project and return the new version
      const updatedPost = await Project.findByIdAndUpdate(
        req.params.projectId,
        {
          $set: {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            image: req.body.image,
          },
        },
        { new: true }
      );
  
      // Check if the project exists
      if (!updatedPost) {
        return next(errorHandler(404, 'Project not found'));
      }
  
      res.status(200).json(updatedPost);
    } catch (error) {
      next(error); // Handle unexpected errors
    }
  };
  

  export const getprojectrecent = async (req, res, next) => {
    try {
        // Parse the startIndex query parameter, defaulting to 0 if not provided
        const startIndex = parseInt(req.query.startIndex) || 0;
        // Parse the limit query parameter, defaulting to 9 if not provided
        const limit = parseInt(req.query.limit) || 9;
        // Determine the sort direction based on the order query parameter, defaulting to descending if not provided
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        // Initialize an empty query object
        const query = {};

        // If a userId query parameter is provided, add it to the query object
        if (req.query.userId) {
            query.userId = req.query.userId;
        }

        // If a category query parameter is provided, add it to the query object
        if (req.query.category) {
            query.category = req.query.category;
        }

        // If a slug query parameter is provided, add it to the query object
        if (req.query.slug) {
            query.slug = req.query.slug;
        }

        // If a postId query parameter is provided, add it to the query object
        if (req.query.postId) {
            query._id = req.query.postId;
        }

        // If a searchTerm query parameter is provided, add a $or query to the query object
        if (req.query.searchTerm) {
            query.$or = [
                { title: { $regex: req.query.searchTerm, $options: 'i' } }, // Search for the searchTerm in the title field, case-insensitive
                { content: { $regex: req.query.searchTerm, $options: 'i' } } // Search for the searchTerm in the content field, case-insensitive
            ];
        }

        // Retrieve the posts from the database based on the query object
        const project = await Project.find(query)
            .sort({ createdAt: sortDirection }) // Sort the posts by createdAt in the specified direction
            .skip(startIndex) // Skip the specified number of posts
            .limit(limit); // Limit the number of posts returned

        // Retrieve the total number of posts from the database
        const totalPosts = await Project.countDocuments();

        // Calculate the date one month ago
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        // Retrieve the number of posts created in the last month from the database
        const lastMonthPosts = await Project.countDocuments({
            createdAt: { $gte: oneMonthAgo } // Filter for posts created after one month ago
        });

        // Return the posts, totalPosts, and lastMonthPosts as a JSON response
        res.status(200).json({
            project,
            totalPosts,
            lastMonthPosts
        });
    } catch (error) {
        // If an error occurs, pass it to the next middleware function
        next(error);
    }
};

