import express from 'express';
import { verifyToken } from '../utils/verifyuser.js';
import { createController,getPostCommentsController,likeCommentController,
    editCommentController,deleteCommentController, 
    getCommentsController} from '../controllers/comment.controller.js';


const router=express.Router();

router.post('/create',verifyToken,createController);
router.get('/getpostcomments/:postId',getPostCommentsController);
router.put('/likecomment/:commentId',verifyToken,likeCommentController);
router.put('/editcomment/:commentId',verifyToken,editCommentController);
router.delete('/deletecomment/:commentId',verifyToken,deleteCommentController);
router.get('/getcomments',verifyToken,getCommentsController);

export default router;