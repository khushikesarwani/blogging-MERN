import express from 'express';
import { signupController,signinController } from '../controllers/auth.controller.js';

const router=express.Router();

router.post('/signup',signupController);

//login
router.post('/signin',signinController);

export default router;