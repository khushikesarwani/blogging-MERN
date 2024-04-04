import userModel from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';


export const signupController=async(req,res,next)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password || username===''|| email===''||password===''){
       next(errorHandler(400,'All Fields are required'));
    }

try {

    const userexist=await userModel.findOne({email});
    if(userexist){
 
        next(errorHandler(400,"User Already Exists,do login instead"))

    //  return   res.status(400).send({
    //     success:false,
    //     message:"Email already exist"
    //  });

    }
    //hashing password using hashsync as it it already asynchronous
const hashedpass=bcryptjs.hashSync(password,10);

const newuser= await new userModel({
    username,
    email,
    password:hashedpass
}).save();

res.status(200).send({
    success:true,
    message:"User registered successfully"
})
    
} catch (error) {
   next(error);
    
}
   
}