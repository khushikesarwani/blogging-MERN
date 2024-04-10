import express from 'express';
import { verifyToken } from '../utils/verifyuser.js';
import { createPostController, getPosts,deletePostController } from '../controllers/post.controller.js';


const router=express.Router();

router.post('/create',verifyToken,createPostController);
router.get('/getposts',getPosts);
router.delete('/deletepost/:postId/:userId',verifyToken,deletePostController);



export default router;