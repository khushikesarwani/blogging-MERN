import React, { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux';
import {Alert, Button, TextInput} from 'flowbite-react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {
const {Curruser}=useSelector((state)=>state.user);
const [imagefile,setImageFile]=useState(null);
const [imageFileUrl,setImageFileUrl]=useState(null);
const [imageFileUploadingProgress,setImageFileUploadingProgress]=useState(null);//track progress
const [imageFileUploadError,setImageFileUploadError]=useState(null);


//when i click on profile , i should be able to change image
const fileRef=useRef();

const handleImageChange=(e)=>{
  const file=e.target.files[0];   // to select the first file only
if(file){
  setImageFile(file); 
  setImageFileUrl(URL.createObjectURL(file)); //will give us temporary image url for our image 
}

}
// console.log(imagefile,imageFileUrl);


//updating image--------------------
useEffect(()=>{
if(imagefile){
  uploadImage();
}

},[imagefile]);


//whole logic=======================
const uploadImage=async()=>{
setImageFileUploadError(null);
const storage=getStorage(app);
const fileName= new Date().getTime() + imagefile.name; //adding date logic to make it unique

const storageRef=ref(storage,fileName);

//now we want to get some info about the image being uploaded on firebase
const uploadTask=uploadBytesResumable(storageRef,imagefile);
uploadTask.on(
  'state_changed',
  (snapshot)=>{
    const progress=(snapshot.bytesTransferred / snapshot.totalBytes) *100 ;
  
      //suppose 10.432 => rounding off
      setImageFileUploadingProgress(progress.toFixed(0));
  },
(error)=>{
  console.log("firebase image upload error"+error);
setImageFileUploadError("Couldn't upload image {File must be less than 2MB}");
setImageFileUploadingProgress(null);
setImageFile(null);
setImageFileUrl(null);

},
//we want file feedback now
()=>{
getDownloadURL(uploadTask.snapshot.ref).then((downloarUrl)=>{
  setImageFileUrl(downloarUrl);
});
}
);

} // logic ended====================

// console.log(imageFileUploadingProgress,imageFileUploadError);



  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>
 {/* update profile */}
      <input type="file" accept="image/*" onChange={handleImageChange} ref={fileRef} hidden />

        <div className=' relative w-32 h-32 rounded-full  self-center cursor-pointer' onClick={()=>fileRef.current.click()} >
        
        {imageFileUploadingProgress && (
          <CircularProgressbar value={imageFileUploadingProgress || 0}  
          text={`${imageFileUploadingProgress}%`}
          strokeWidth={5}
          styles={{
            root:{
              width:"100%",
              height:"100%",
              position:"absolute",
              top:0,
              left:0
            },
            path:{
              stroke:`rgba(62,152,199,${imageFileUploadingProgress/100})`
            }
          }}
           />
        )}
        
        <img src={ imageFileUrl || Curruser.profilePicture} alt="profile picture" 
            className= {`rounded-full border-8 border-lightgray object-cover shadow-md
            ${imageFileUploadingProgress && imageFileUploadingProgress<100 && 'opacity-60'}
            `} 
        />


       </div>
       {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert> }
       
       <TextInput 
       type="text"
       id="useranme"
       placeholder="username"
       defaultValue={Curruser.username}
        />
        <TextInput 
       type="email"
       id="email"
       placeholder="email"
       defaultValue={Curruser.email}
        />
        <TextInput 
       type="password"
       id="pasword"
       placeholder="password********"
       
        />
        <Button type="submit" gradientDuoTone='purpleToBlue' >
          Update
        </Button>
           
        </form>
        <div className="text-red-500 flex justify-between">
            <span className="cursor-pointer">Delete Account </span>
            <span className="cursor-pointer">Sign Out</span>
        </div>
    </div>
  )
}

export default DashProfile