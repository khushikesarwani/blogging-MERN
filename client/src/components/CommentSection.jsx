import { Alert, Button, Textarea } from 'flowbite-react';
import React, { useState,useEffect } from 'react';
import { useSelector} from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import Comment from './Comment.jsx';
import { Modal } from 'flowbite-react';
import {HiOutlineExclamationCircle} from 'react-icons/hi'

const CommentSection = ({postId}) => {

  const navigate=useNavigate();

const {Curruser}=useSelector((state)=>state.user);

const [comment,setComment]=useState('');
const [error,setError]=useState(null);

const [kcomments,setKcomments]=useState([]);
const [showModel,setShowModel]=useState(false);
const [commentToDelete,setCommentToDelete]=useState(null);


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
    setKcomments([data,...kcomments]); //for updating / adding new comment instantly
      }
      
    } catch (error) {
      setError(error.message);
    }
    
}

useEffect(()=>{

  const getComments=async()=>{
    try {
      
      const res=await fetch(`/api/comment/getpostcomments/${postId}`);
      if(res.ok){
        const data=await res.json();
        setKcomments(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  getComments();


},[postId]);

//comment like functionality================

const handleLike=async(commentId)=>{
try {
  if(!Curruser){
    navigate('/sign-in');
    return;
  }
  const res=await fetch(`/api/comment/likecomment/${commentId}`,{
    method:'PUT'
  });

  if(res.ok){
    const data=await res.json();
    setKcomments(kcomments.map((comment)=>{    //updating that comment as well
      if(comment._id===commentId){
        return data;
      }else{
        return comment;
      }
    }
  ))
  }
  
} catch (error) {
  console.log(error);
}
}

//handle Edit Comment

const handleEdit=async(comment,editedContent)=>{
setKcomments(kcomments.map((c)=>{
  if(c._id===comment._id)
 { return {  ...c,
   content:editedContent}
  }else{
   return c;
  }
  
}));
}

// handle delete comment

const handleDelete=async(commentId)=>{
  try {
    if(!Curruser){
    navigate('/sign-in');
    return;}

    const res=await fetch(`/api/comment/deletecomment/${commentId}`,{
      method:'DELETE'
    });

    if(res.ok){
      const data=await res.json();
      setKcomments(kcomments.filter((c)=> c._id!=commentId
    ));
   setShowModel(false);
   setCommentToDelete(null);
    }
    

  } catch (error) {
    console.log(error);
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
        className='resize-none'
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
 {kcomments.length===0 ?(
  <div className=" text-sm my-5 flex items-center gap-1 ">
    Be the first to comment ✨
  </div>
 ):(<>

  <div className='text-sm my-5 flex items-center gap-1'>
  <p>Comments</p>
  <div className="border border-gray-400 py-1 px-2 rounded-sm"><p>{kcomments.length}</p></div>
  </div>
{
  kcomments.map((cmt)=>{
return <Comment key={cmt._id} comment={cmt}
 onLike={handleLike}
  onEdit={handleEdit} 
  onDelete={(commentId)=>{
    setShowModel(true);
    setCommentToDelete(commentId);
    
    }} />
})
}
 
 </>
 
 )}


 <Modal show={showModel}
  onClose={()=>setShowModel(false)} popup size='md'>
  <Modal.Header />
  <Modal.Body>
    <div className="text-center">
      <HiOutlineExclamationCircle className='h-14 w-14
       text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
       <h3 className=' text-lg text-gray-500 dark:text-gray-200'>Are you sure you want to delete this comment?</h3>
    
       <div className="flex justify-center  gap-2 mt-5 ">
        <Button color='failure' onClick={()=>handleDelete(commentToDelete)} >Delete</Button>
        <Button color='yellow' onClick={()=>setShowModel(false)}>Cancel</Button>
       </div>
    </div>
  </Modal.Body>
</Modal>

    </div>
  )
  
}

export default CommentSection;