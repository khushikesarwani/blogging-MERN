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

//Like comment controller===========
export const likeCommentController=async(req,res,next)=>{

try {
    const comment=await commentModel.findById(req.params.commentId);
    if(!comment){
        next(errorHandler(404,"Comment not found!"));
    }
    const userIndex=comment.likes.indexOf(req.user.id); //checking if user has already liked the comment or not
    if(userIndex===-1){
        comment.numberOfLikes+=1;
        comment.likes.push(req.user.id);
    }else{
        comment.numberOfLikes-=1;
        comment.likes.splice(userIndex,1);
    }
await comment.save();
res.status(200).json(comment);
    
} catch (error) {
    next(error);
}
}

//edit comment====================

export const editCommentController=async(req,res,next)=>{

    try {
        
        const comment=await commentModel.findById(req.params.commentId);
        if(!comment){
         return next(errorHandler(404,"No such comment exist !"));
        }
        if(comment.userId!==req.user.id && !req.user.isAdmin){
             return  next(errorHandler(403,"You are not allowed to edit this comment"));
        }

        const editedComment=await commentModel.findByIdAndUpdate(req.params.commentId,{
            content:req.body.content,
        },{new:true});

res.status(200).json(editedComment);


    } catch (error) {
        next(error);
    }
}

//=====delete comment=================

export const deleteCommentController=async(req,res,next)=>{
try {
    const comment=await commentModel.findById(req.params.commentId);
    if(!comment){
        return next(errorHandler(404,"Comment not found"));
    }
    if(comment.userId!==req.user.id && !req.user.isAdmin){
        return  next(errorHandler(403,"You are not allowed to delete this comment"));
   }

   await commentModel.findByIdAndDelete(comment._id);
   res.status(200).json("Comment has been deleted");
    
    
} catch (error) {
    next(error);
}
}