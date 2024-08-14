import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getPosts, updatepost } from '../controllers/post.controller.js';


const routers = express.Router();

routers.post('/create',verifyToken,create);
routers.get('/getposts',getPosts);
routers.delete('/deletepost/:postId/:userId',verifyToken,deletepost)
routers.put('/updatepost/:postId/:userId', verifyToken, updatepost)
export default routers; 