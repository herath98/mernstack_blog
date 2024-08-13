import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getPosts } from '../controllers/post.controller.js';

const routers = express.Router();

routers.post('/create',verifyToken,create);
routers.get('/getposts',getPosts);
routers.delete('/deletepost/:posyId/:userId',verifyToken,deletepost)
export default routers; 