import postModel from "../models/postModel.js";
import { errorHandler } from "../utils/error.js"


export const createPostController=async(req,res,next)=>{
    //first we need to check if person is admin or not



    if(!req.user.isAdmin){
      return  next(errorHandler(400,"You are not allowed to create a post"));
    }
    if(!req.body.title || !req.body.content){
return next(errorHandler(400,"Please provide all the required fields"));
    }

//let's create slug for post as it is better for seo
const slug=req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'');
const newPost= new postModel({
    ...req.body,
    slug,
    userId:req.user.id
});
try {
    const savedPost=await newPost.save();
    res.status(200).json(savedPost);

} catch (error) {
    next(error);
}


}