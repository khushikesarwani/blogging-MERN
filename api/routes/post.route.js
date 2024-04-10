import express from 'express';
import { verifyToken } from '../utils/verifyuser.js';
import { createPostController, getPosts } from '../controllers/post.controller.js';


const router=express.Router();

router.post('/create',verifyToken,createPostController);
router.get('/getposts',getPosts);



export default router;