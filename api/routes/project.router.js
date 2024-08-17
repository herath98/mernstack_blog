import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getPosts, updatepost } from '../controllers/post.controller.js';
import { createproject } from '../controllers/project.controller.js';


const routers = express.Router();

routers.post('/createproject',verifyToken,createproject);
routers.get('/getproject',getPosts);
routers.delete('/deleteproject/:postId/:userId',verifyToken,deletepost)
routers.put('/updateproject/:postId/:userId', verifyToken, updatepost)
export default routers; 