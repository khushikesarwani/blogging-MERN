import { errorHandler } from "../utils/error.js";
import commentModel from "../models/commentModel.js";

export const createController=async(req,res,next)=>{
    try {

        const {content,postId,userId}=req.body;

        if(userId!==req.user.id){ //verifying with token
           return next (errorHandler(403,"You are not allowed to create this comment !"));
        }

        const newComment=await new commentModel({
            content,
            postId,
            userId
        }).save();

        res.status(200).json(newComment);
        
    } catch (error) {
        next(error);
    }
}

//getting all post comments
export const getPostCommentsController=async(req,res,next)=>{

try {   
const comments=await commentModel.find({postId:req.params.postId}).sort({createdAt:-1}); //newest at top
res.status(200).json(comments);

} catch (error) {
    next(error);
}


}