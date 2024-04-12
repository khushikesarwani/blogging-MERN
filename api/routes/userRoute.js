import express from 'express';
import { deleteAccountController,
     testController,
     updateUserController,
     signOutController,
     getUsersController,
      } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyuser.js';

const router=express.Router();

router.get('/test',testController);
router.put('/update/:userId',verifyToken,updateUserController);
router.delete('/delete/:userId',verifyToken,deleteAccountController);
router.post('/signout',signOutController);
router.get('/getusers',verifyToken,getUsersController);


export default router;