import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import userRoutes  from './routes/userRoute.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import cookieParser from 'cookie-parser';
import commentRoute from './routes/comment.route.js';
import path from 'path';




dotenv.config();

const connectDB=async()=>{
    try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("connected to database".bgMagenta.white)
    } catch (error) {
       console.log(`Error in connecting to db ${error}`.bgMagenta.white); 
    }
}

connectDB();

const __dirname=path.resolve();
const app=express();


//middlewares

app.use(cookieParser());
app.use(express.json());


//all routes
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);
app.use('/api/comment/',commentRoute);


app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
});


//very imp part to set next work-----------(placing is also important)-------------
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal Server Error';
    res.status(statusCode).send({
    success:false,
    statusCode,
    message
    });
    });


app.listen(8080,()=>{
    console.log('Server is running on port 8080');
    
});

