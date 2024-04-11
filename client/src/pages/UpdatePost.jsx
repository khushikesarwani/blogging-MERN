import React, { useEffect, useState } from 'react';
import {FileInput, Select, TextInput,Button, Alert} from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase.js';
import {useNavigate,useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

const UpdatePost = () => {

const {Curruser}=useSelector((state)=>state.user);


const {postId}=useParams();
const navigate=useNavigate();
const [file,setFile]=useState(null);
const [imageUploadProgress,setImageUploadProgress]=useState(null);//to track upload progress from snapshot
const [imageUploadError,setImageUploadError]=useState(null);
const [formData,setFormData]=useState({});
const [publishError,setpublishError]=useState(null);



//use Effect for fetching initial data
useEffect(()=>{
    try {
        
        const fetchPost=async()=>{
            const res=await fetch(`/api/post/getposts?postId=${postId}`);
            const data=await res.json();
            if(!res.ok){
                console.log(data.message);
                setpublishError(data.message);
                return;
            }else{
                setpublishError(null);
                setFormData(data.posts[0]);

            }
        }
        fetchPost();
    
    } catch (error) {
       console.log(error.message); 
    }

   
    
    },[]);




const handleUploadImage=async()=>{
  try {
    if(!file){
      setImageUploadError("Please upload an image");
      return;
    }
    setImageUploadError(null);
const storage=getStorage(app);
const fileName=new Date().getTime()+"_"+file.name;
const storageRef=ref(storage,fileName);

const uploadTask=uploadBytesResumable(storageRef,file);

//processing
uploadTask.on(
  'state_changed',
  (snapshot)=>{
    const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
    setImageUploadProgress(progress.toFixed(0));//making 10.437  to 10
  },
  (error)=>{
    setImageUploadError("Image upload failed,{File must be less than 2MB}");
    setImageUploadProgress(null);
  },
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
      setImageUploadProgress(null);
      setImageUploadError(null);
      setFormData({...formData,image:downloadURL});

    });
  }
);

  } catch (error) {
    console.log("Some error in upload"+error);
    setImageUploadError("Image upload error,failed");
    setImageUploadProgress(null);
  }
}

//submitting form

const handleSubmit=async(e)=>{
e.preventDefault();
try {

  const response= await fetch(`/api/post/updatepost/${postId}/${Curruser._id}`,{
    method:'PUT',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(formData),
  });

  const data=await response.json();
  
  if(!response.ok){
setpublishError(data.message);
return;

  }else{

    setpublishError(null);
    navigate(`/post/${data.slug}`);
    
    
  }

  
} catch (error) {
  setpublishError("something went wrong!");
  console.log(error);
}
}


  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
<h1 className='text-center text-3xl my-7 font-semibold'> Update Post</h1>

   <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}  >
 <div className='flex flex-col gap-4 sm:flex-row justify-between'>
<TextInput 
type='text'
placeholder='Title '
required
id='title'
className='flex-1'
onChange={(e)=>{setFormData({...formData,title:e.target.value})}}
value={formData.title}
/>
<Select onChange={(e)=>{setFormData({...formData,category:e.target.value})}} value={formData.category} >
    <option value="uncategorized">Select a category</option>
    <option value="makeup">Makeup</option>
    <option value="outfit">Outfits</option>
    <option value="travel">Travel</option>
</Select>
 </div>
 <div className="flex gap-4 items-center justify-between border-4  
border-teel-500 border-dotted p-3 ">
<FileInput type="file" accept="image/*"  onChange={(e)=>setFile(e.target.files[0])}  />
<Button type="button" gradientDuoTone="purpleToBlue" size="sm" outline  onClick={handleUploadImage} disabled={imageUploadProgress} >
{
  imageUploadProgress ? (
    <div className='w-16 h-16'>
      <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
    </div> 
  ): "Upload Image"
}
</Button>
</div>
{imageUploadError && (
  <Alert color="failure">
{imageUploadError}
  </Alert>
)}

{/* show image if there is any */}
{formData.image && (
  <img
  src={formData.image}
  alt="image"
  className='w-full h-72 object-cover'
   />
)}

<ReactQuill theme="snow" placeholder="Write something..." className="h-72 mb-12" required 
  onChange={(value)=>{setFormData({...formData,content:value})}} value={formData.content}
/>
<Button type="submit" gradientDuoTone="purpleToPink" disabled={imageUploadProgress}>Update Post</Button>

{publishError && (
  <Alert color="failure" className='mt-5' >
  {publishError}
  </Alert>
)}

   </form>
    </div>
  )
}

export default UpdatePost;