import React, { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux';
import {Alert, Button, Modal, TextInput} from 'flowbite-react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useDispatch} from 'react-redux';
import {HiOutlineExclamationCircle} from 'react-icons/hi';
import {updateStart,updateSuccess,updateFailure, deleteUserStart,deleteUserSuccess,deleteUserFailure,signoutSuccess } from '../Redux/user/userSlice.js';
import { Link,useNavigate } from 'react-router-dom';



const DashProfile = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();

const {Curruser,error,loading}=useSelector((state)=>state.user);
const [imagefile,setImageFile]=useState(null);
const [imageFileUrl,setImageFileUrl]=useState(null);
const [imageFileUploadingProgress,setImageFileUploadingProgress]=useState(null);//track progress
const [imageFileUploadError,setImageFileUploadError]=useState(null);
const [imageUploading,setImageUploading]=useState(false);
const [updateUserSuccess,setUpdateUserSuccess]=useState(null);
const [updateUserError,setUpdateUserError]=useState(null);

const [formData,setFormData]=useState({});

//for deleteaccount model
const [showModel,setShowModel]=useState(false);







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

  setImageUploading(true);

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
setImageUploading(false);

},
//we want file feedback now
()=>{
getDownloadURL(uploadTask.snapshot.ref).then((downloarUrl)=>{
  setImageFileUrl(downloarUrl);
  setFormData({...formData,profilePicture:downloarUrl});
  setImageUploading(false);
});
}
);

} // logic ended====================

// console.log(imageFileUploadingProgress,imageFileUploadError);




//handling on change events on inputs
const handleChange=(e)=>{
 setFormData({...formData,[e.target.id]:e.target.value});

}

//onsubmitting the form
const handleSubmit=async(e)=>{
e.preventDefault();

setUpdateUserError(null);
setUpdateUserSuccess(null);

//if formdata is empty don't submit
if(Object.keys(formData).length===0){
  setUpdateUserError("Nothing to update");
  return ;
}

if(imageUploading){ //since we don't want to fetch if the image is in uploading mode
 setUpdateUserError("Please wait for image to upload");
  return;
}

try {

dispatch(updateStart());
const response= await fetch(`/api/user/update/${Curruser._id}`,{
  method:'PUT',
  headers:{
    'Content-Type':'application/json',
  },
  body:JSON.stringify(formData),
});


const data=await response.json();

if(!response.ok){
  dispatch(updateFailure(data.message));
  setUpdateUserError(data.message);
}else{
  dispatch(updateSuccess(data));
  setUpdateUserSuccess("User's profile updated successfully");
  setUpdateUserError(null);
}

  
} catch (error) {
  dispatch(updateFailure());
}
}

//deleting account
const handleDeleteUser=async()=>{

  setShowModel(false);
  try {
dispatch(deleteUserStart());
const response=await fetch(`/api/user/delete/${Curruser._id}`,{
  method:'DELETE',
});
const data=await response.json();


if(!response.ok){
  dispatch(deleteUserFailure(data.message))
}else{
  dispatch(deleteUserSuccess(data));
}
    
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }

}

//sign out/logout===============

const handleSignOut=async()=>{
try {
  const response=await fetch("api/user/signout",{
    method:'POST',
  });
  const data=await response.json();
  console.log(data);

if(!response.ok){
  console.log(data.message);
}
else{
dispatch(signoutSuccess());
navigate('/sign-in');
}

} catch (error) {
  console.log(error.message);
}

}


  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
       id="username"
       placeholder="username"
       defaultValue={Curruser.username}
       onChange={handleChange}
        />
        <TextInput 
       type="email"
       id="email"
       placeholder="email"
       defaultValue={Curruser.email}
       disabled
        />
        <TextInput 
       type="password"
       id="pasword"
       placeholder="password********"
       onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone='purpleToBlue'  disabled={loading || imageUploading}>
         {loading? 'loading...' :'Update'}
        </Button>
        
        {Curruser.isAdmin && (
          <Link to={'/create-post'}>
          <Button
          type='button'
          gradientDuoTone='purpleToPink'
          className='w-full'
          outline
           >
            Create a new post
           </Button>
          </Link>
          
        )}
           
        </form>
        <div className="text-red-500 flex justify-between">
           <span className="cursor-pointer" onClick={()=>setShowModel(true)}>Delete Account</span>
            <span className="cursor-pointer" onClick={handleSignOut}>Sign Out</span>
        </div>
        {updateUserSuccess && <Alert
        color="success"
        className='mt-5'
        >{updateUserSuccess}</Alert>}

{updateUserError && <Alert
        color="failure"
        className='mt-5'
        >{updateUserError}</Alert>}

{/* error for delete user */}
        {error && <Alert
        color="failure"
        className='mt-5'
        >{error}</Alert>}

{/* Writing Logic for pop-up delete account */}

<Modal show={showModel}
  onClose={()=>setShowModel(false)} popup size='md'>
  <Modal.Header />
  <Modal.Body>
    <div className="text-center">
      <HiOutlineExclamationCircle className='h-14 w-14
       text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
       <h3 className=' text-lg text-gray-500 dark:text-gray-200'>Are you sure you want to delete your account</h3>
       <small className=' mb-4 text-sm text-red-600'>It will permanently delete it from our database as well</small>
       <div className="flex justify-center  gap-2 mt-5 ">
        <Button color='failure' onClick={handleDeleteUser} >Delete</Button>
        <Button color='yellow' onClick={()=>setShowModel(false)}>Cancel</Button>
       </div>
    </div>
  </Modal.Body>
</Modal>


    </div>
  )
}

export default DashProfile