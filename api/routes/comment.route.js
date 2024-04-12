import express from 'express';
import { verifyToken } from '../utils/verifyuser.js';
import { createController,getPostCommentsController } from '../controllers/comment.controller.js';


const router=express.Router();

router.post('/create',verifyToken,createController);
router.get('/getpostcomments/:postId',getPostCommentsController);


export default router;