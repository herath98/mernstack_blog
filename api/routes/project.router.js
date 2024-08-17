import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createproject, deleteproject, getproject, getprojectrecent, updateproject } from '../controllers/project.controller.js';


const routers = express.Router();

routers.post('/createproject',verifyToken,createproject);
routers.get('/getproject',getproject);
routers.get('/getprojectrecent',getprojectrecent);
routers.delete('/deleteproject/:postId/:userId',verifyToken,deleteproject)
routers.put('/updateproject/:postId/:userId', verifyToken, updateproject)
export default routers; 