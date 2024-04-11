import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import userModel from '../models/userModel.js';


export const testController=async(req,res)=>{
    res.json({message:"happiness, freedom and abundance"});

}


//update user========================================================
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

    const newUser={
        username:user.username,
        _id:user._id,
        profilePicture:user.profilePicture,
        email:user.email,
        isAdmin:user.isAdmin,
    };
    res.status(200).json(newUser);
    
} catch (error) {
    console.log(error);
    next(error);
}

}

//delete user===============================================================

export const deleteAccountController=async(req,res,next)=>{

    if(req.user.id!=req.params.userId){
        return next(errorHandler(403,"You are not allowed to delete this profile "));
    }

    try {
        await userModel.findByIdAndDelete(req.params.userId);
        res.status(200).json('user has been deleted');

    } catch (error) {
        next(error);
    }
}

// sign out ==========================

export const signOutController=(req,res,next)=>{
    try {
        
        res.clearCookie('access_token').status(200).json("User has been signed out");

    } catch (error) {
       
        next(error);
    }

}

//getting all users details

export const getUsersController=async(req,res,next)=>{

if(!req.user.isAdmin){
    return next(errorHandler(403,"You are not allowed get user details "));
}
try {
    
const startIndex=parseInt(req.query.startIndex) || 0;
const limit=parseInt(req.query.limit) || 9;
const sortDirection= req.query.sort==='asc' ? 1 :-1;

const users=await userModel.find().sort({createdAt: sortDirection}).skip(startIndex).limit(limit);

const usersWithoutPassword=users.map((user)=>{
    const {password,...rest}=user._doc;
    return rest;
});

const totalusers=await userModel.countDocuments();

//for getting number of users created in last month or a month ago
const now=new Date();
var oneMonthAgo=new Date(
    now.getFullYear(),
    now.getMonth()-1,
    now.getDate()
);

var lastMonthUsers=await userModel.countDocuments({
    createdAt:{$gte: oneMonthAgo},
 });

 res.status(200).json({
    users:usersWithoutPassword,
    totalusers,
    lastMonthUsers
 });



} catch (error) {
    next(error);
}

}