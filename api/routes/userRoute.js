import express from 'express';
import { testController,updateUserController } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyuser.js';

const router=express.Router();

router.get('/test',testController);
router.put('/update/:userId',verifyToken,updateUserController);

export default router;