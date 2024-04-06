import express from 'express';
import { signupController,signinController,googleController } from '../controllers/auth.controller.js';

const router=express.Router();

router.post('/signup',signupController);

//login
router.post('/signin',signinController);

//login with google
router.post('/google',googleController);

export default router;