import { Alert, Button, Textarea } from 'flowbite-react';
import React, { useState } from 'react';
import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

const CommentSection = ({postId}) => {

const {Curruser}=useSelector((state)=>state.user);

const [comment,setComment]=useState('');
const [error,setError]=useState(null);



const handleSubmit=async(e)=>{
    e.preventDefault();

    if(comment.length>200) return;

    try {
      setError(null);

      const res=await fetch(`/api/comment/create`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
  
        },
        body:JSON.stringify({content:comment,postId,userId:Curruser._id})
      });

      const data=await res.json();

      if(res.ok){
    setComment('');
    setError(null);
      }
      
    } catch (error) {
      setError(error.message);
    }
    
}


  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
    {Curruser ?(
        <div className='flex items-center gap-1 text-gray-400 text-sm'>
             <p>Signed in as: </p>
             <img src={Curruser.profilePicture} alt={Curruser.username} className='h-5 w-5 rounded-full' />
             <Link to={'/dashboard?tab=profile'} className='text-cyan-600 text-xs  hover:underline '>
                @{Curruser.username}
             </Link>
        </div>
    ) :(
        <div className='text-sm text-teal-500 my-5 flex gap-1 '>
        You must login to comment. 
        <Link to='/sign-in' className='text-blue-500 hover:underline'>Sign-in</Link>
        </div>
    )}
   

   {Curruser  && (

    <form className='border border-teal-500 rounded-md p-3' onSubmit={handleSubmit}>
        <Textarea
        placeholder='Add a comment....'
        rows='3'
        maxLength='200'
        onChange={(e)=>setComment(e.target.value)}
        value={comment}
         />

         <div className='flex justify-between items-center mt-5 '>
        <p className='text-gray-500 text-sm' >{200-comment.length} characters remaining</p>
        <Button type="submit" outline gradientDuoTone='purpleToBlue' disabled={200-comment.length<0}>Submit</Button>
         </div>
         {error && <Alert color='failure' className='mt-3'>
  {error}
</Alert> }
    </form>
  
   )}



    </div>
  )
  
}

export default CommentSection;