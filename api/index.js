import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import userRoutes  from './routes/userRoute.js'



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

app.use('/api/user',userRoutes);

app.get('/',(req,res)=>{
    res.send('<h1>hey</h1>');
})

app.listen(8080,()=>{
    console.log('Server is running on port 8080');
    
});

