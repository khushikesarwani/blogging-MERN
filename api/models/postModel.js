import mongoose from 'mongoose';


 const postSchema=new mongoose.Schema({

userId:{
    type:String,
    required:true,
},
content:{
    type:String,
    required:true,
},
title:{
    type:String,
    required:true,
    unique:true,

},
image:{
    type:String,
    default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROw0c3HmVPocJFD88GeP92liv07qz343rCTyL-DUleKA&s'
},
category:{
    type:String,
    default:'uncategorized',
},
slug:{
    type:String,
    required:true,
    unique:true,
},

},{timestamps:true});

const postModel=mongoose.model('post',postSchema);
export default postModel;