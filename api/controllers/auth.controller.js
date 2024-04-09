import userModel from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';


export const signupController=async(req,res,next)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password || username===''|| email===''||password===''){
     return  next(errorHandler(400,'All Fields are required'));
    }

try {
    const userexist1=await userModel.findOne({username});
    if(userexist1){
 
      return  next(errorHandler(400,"USERNAME Already Exists, try different username"))


    }

    const userexist=await userModel.findOne({email});
    if(userexist){
 
      return  next(errorHandler(400,"Email Already Exists, do login instead"))

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
    console.log(error);
   next(error);
    
}
   
}

//loginnnnnnn

export const signinController=async(req,res,next)=>{

    const {email,password}=req.body;
    if(!email || !password || email==='' || password===''){
       return next(errorHandler(400,"Fields cannot be empty"));
    }
    try {
       
        const user=await userModel.findOne({email});
    
        if(!user){
         return  next(errorHandler(400,'No user Exist'));
        }
        
        const validpass=bcryptjs.compareSync(password,user.password);

        if(!validpass){
          return  next(errorHandler(400,"Invalid user/Password mismatched"));
        }

const token= jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET,{expiresIn:'3d'});

return res.status(200).cookie('access_token',token,{
                httpOnly:true
            }).send({
                success:true,
                message:'SignIn successfully !',
                user:{
                    email:user.email,
                    username:user.username,
                    _id:user._id,
                    profilePicture:user.profilePicture
                }

            });
        
    } catch (error) {
        console.log(error);
        next(error);
    }

}

//google signin/login

export const googleController=async(req,res,next)=>{
    //check if user exist or not
    //if exist signin/login him/her
    //else create a new user

    const {email,name,googlePhotoUrl} =req.body;
    try {
        
const user=await userModel.findOne({email});

if(user){ //for exixting user
   console.log(user);
    const token= jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET,{expiresIn:'3d'});
    

    const usershare={
        username:user.username,
        _id:user._id,
        email:user.email,
        profilePicture:user.profilePicture
    };



   return res.status(201).cookie('access_token',token,{
        httpOnly:true,//to make it more secure
    }).send(usershare);
    
}else{   //for a new user

//creating a random password
const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8); //mtlb kuch bhi
//doubling for more security   minus for (taking from last)

const hassedPass=bcryptjs.hashSync(generatedPassword,10);

const newUser=await new userModel({
    username:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
    //kim bum=>kimbum09756
    email:email,
    password:hassedPass,
    profilePicture: googlePhotoUrl
});

await newUser.save();

//token creation
const token= jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin},process.env.JWT_SECRET,{expiresIn:'3d'});
console.log("newUser");
console.log(newUser);
    // const {password, ...rest}=newUser;
    // console.log("resssssssssst");
    // console.log(rest);

  return   res.status(201).cookie('access_token',token,{
        httpOnly:true,//to make it more secure
}).send({
   
        username:newUser.username,
        _id:newUser._id,
        email:newUser.email,
        profilePicture:newUser.profilePicture,
    
});

}

    } catch (error) {
        next(error);
    }


}