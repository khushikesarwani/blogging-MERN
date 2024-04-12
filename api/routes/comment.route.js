import express from 'express';
import { verifyToken } from '../utils/verifyuser.js';
import { createController } from '../controllers/comment.controller.js';


const router=express.Router();

router.post('/create',verifyToken,createController);


export default router;