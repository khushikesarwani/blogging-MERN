import React from 'react'
import {Button} from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth';
import { app } from '../firebase.js';
import {useDispatch} from'react-redux';
import { signInSuccess,signInFailure } from '../Redux/user/userSlice.js';
import {useNavigate} from 'react-router-dom';

const OAuth = () => {

const dispatch=useDispatch();
const navigate=useNavigate();

const auth=getAuth(app); //initializing auth {as firebase doesn't know who is requesting}

const handleGoogleClick=async()=>{
    const provider=new GoogleAuthProvider();

    provider.setCustomParameters({prompt:'select_account'}); //this line will say prompt pop-up to show everytime(choose an account)

    try {
        const resultsFromGoogle= await signInWithPopup(auth,provider);
        console.log(resultsFromGoogle);//getting everything here inside user,getting photourl as well
    
        //sending response to backend
        const res=await fetch('/api/auth/google',{
            method:'POST',
            headers:{ 'Content-Type':'application/json' },
            body:JSON.stringify({
                name:resultsFromGoogle.user.displayName,
                email:resultsFromGoogle.user.email,
                googlePhotoUrl:resultsFromGoogle.user.photoURL,
            }),
                
         });

         const data=await res.json();
       
         if(res.ok){
            dispatch(signInSuccess(data));
            navigate('/');
         }

} catch (error) {
  console.log(error);
        // dispatch(signInFailure("some internal error fe"));

    }
}



  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick} >
    <AiFillGoogleCircle className='w-6 h-6 mr-2' />
    Continue with Google
    </Button>
  )
}

export default OAuth;