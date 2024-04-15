import postModel from "../models/postModel.js";
import { errorHandler } from "../utils/error.js";



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

//getting all posts
 export const getPosts=async(req,res,next)=>{

    try {

        const startIndex=parseInt(req.query.startIndex) || 0;
        const limit=parseInt(req.query.limit) || 9;//suppose
        const sortDirection=req.query.order=== 'asc' ? 1:-1;

        const posts=await postModel.find({
            ...(req.query.userId && {userId:req.query.userId}),
            ...(req.query.category && {category:req.query.category}),
            ...(req.query.slug && {slug:req.query.slug}),
            ...(req.query.postId && {_id:req.query.postId}),
            //for serch terms
            ...(req.query.searchTerm && {
                $or:[
                    { title :{$regex :req.query.searchTerm, $options:'i'}},
                    { content :{$regex :req.query.searchTerm, $options:'i'}},
                ],
            }),
         }).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit); //find ended


         //for total number of posts in our database
         const totalPosts=await postModel.countDocuments();


       //for getting number of posts created in last month or a month ago
         const now=new Date();
        var oneMonthAgo=new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        );

     var lastMonthPosts=await postModel.countDocuments({
        createdAt:{$gte: oneMonthAgo},
     });


     res.status(200).json({
        posts,
        totalPosts,
        lastMonthPosts
     });

        
    } catch (error) {
        next(error);
    }
}

///===========delete post

export const deletePostController=async(req,res,next)=>{

if(!req.user.isAdmin || req.user.id!==req.params.userId ){

    return next(errorHandler(403,"You are not allowed to delete this post"));
}

try {
    await postModel.findByIdAndDelete(req.params.postId);
    res.status(200).json("The post has been deleted");
    
} catch (error) {
    next(error);
}

};

//=======Update post======

export const updatePostController=async(req,res,next)=>{

    if(!req.user.isAdmin || req.user.id!==req.params.userId){
        return  next(errorHandler(400,"You are not allowed to update this post"));
      }

      try {
        const updatedPost=await postModel.findByIdAndUpdate(req.params.postId,{
            $set:{
                title:req.body.title,
                content:req.body.content,
                image:req.body.image,
                category:req.body.category
            }
        },{new:true});

        res.status(200).json(updatedPost);
        
      } catch (error){
        console.log(error);
next(error);
      } 
}