import userModel from '../models/userModel.js';
import bcryptjs from 'bcryptjs';


export const signupController=async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password || username===''|| email===''||password===''){
        return res.status(400).send({
            success:false,
            message:"All fields are required"
        });
    }

try {

    const userexist=await userModel.findOne({email});
    if(userexist){
     return   res.status(400).send({
        success:false,
        message:"Email already exist"
     });
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
    res.status(500).send({
        success:false,
        message:"Internal issue in registration",
        error
    });
    
}
   
}