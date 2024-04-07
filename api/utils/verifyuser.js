import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';
import userModel from '../models/userModel.js';


export const verifyToken=(req,res,next)=>{
  
  
    const token=req.cookies.access_token;

if(!token){
    return  next(errorHandler(401),'Unauthorized');
}
jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if(err){
        return next(errorHandler(401),'Unauthorized');
    }
    req.user=user; //sending user with req with naming it as user
    next();

});
};

