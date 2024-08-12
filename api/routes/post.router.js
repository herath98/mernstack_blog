import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create } from '../controllers/post.controller.js';

const routers = express.Router();

routers.post('/create',verifyToken,create);

export default routers; 