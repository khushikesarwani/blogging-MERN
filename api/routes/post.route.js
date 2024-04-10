import express from 'express';
import { verifyToken } from '../utils/verifyuser.js';
import { createPostController } from '../controllers/post.controller.js';


const router=express.Router();

router.post('/create',verifyToken,createPostController);



export default router;