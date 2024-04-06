import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import userRoutes  from './routes/userRoute.js';
import authRoutes from './routes/auth.route.js';




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


const app=express();


app.use(express.json());
// app.use((err,req,res,next)=>{
//     const statusCode=err.statusCode || 500;
//     const message=err.message || 'Internal Server Error';
//     res.status(statusCode).send({
//     success:false,
//     statusCode,
//     message
//     });
//     });
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);



app.listen(8080,()=>{
    console.log('Server is running on port 8080');
    
});

