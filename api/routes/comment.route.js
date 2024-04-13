import express from 'express';
import { verifyToken } from '../utils/verifyuser.js';
import { createController,getPostCommentsController,likeCommentController } from '../controllers/comment.controller.js';


const router=express.Router();

router.post('/create',verifyToken,createController);
router.get('/getpostcomments/:postId',getPostCommentsController);
router.put('/likecomment/:commentId',verifyToken,likeCommentController);


export default router;