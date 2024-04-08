import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import userModel from '../models/userModel.js';


export const testController=async(req,res)=>{
    res.json({message:"happiness, freedom and abundance"});

}

export const updateUserController=async(req,res,next)=>{
if(req.user.id!=req.params.userId){
    return next(errorHandler(403,"You are not allowed to update this profile "));

}
if(req.body.password){
    if(req.body.password.length<6){
        return next(errorHandler(400,'Password must be atleast 6 characters'));
    }
    var hassedPass=bcryptjs.hashSync(req.body.password,10);
}

//adding some rules for username like should be less than 20 char and having nospace b/w them
if(req.body.username){
    if(req.body.username.length<7 || req.body.username.length>20 ){
        return next(errorHandler(400,"Username must be b/w 7-20 characters long"))
    }
    if(req.body.username.includes(' ')){
        return next(errorHandler(400,'Username cannot have spaces'));
    }
    if(req.body.username !== req.body.username.toLowerCase()){
        return next(errorHandler(400,'Username must be in lowercase'));
    }
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
        return next(errorHandler(400,'Username can only contain letters and numbers'));

    }
}
try {
    console.log(req.body.username);
    const user=await userModel.findByIdAndUpdate(req.user.id,{
       $set:{
        username:req.body.username,
        password:hassedPass,
        profilePicture:req.body.profilePicture,

       }
    },{new:true}); //to get the new info back not the prev one
console.log(user);
    const newUser={
        username:user.username,
        _id:user._id,
        profilePicture:user.profilePicture,
        email:user.email
    };
    res.status(200).json(newUser);
    
} catch (error) {
    console.log(error);
    next(error);
}

}