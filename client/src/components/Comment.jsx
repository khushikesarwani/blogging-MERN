import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {FaHeart} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';

const Comment = ({comment,onLike,onEdit,onDelete}) => {

    const {Curruser}=useSelector((state)=>state.user);
    const [user,setUser]=useState({});
    const [isEditing,setIsEditing]=useState(false);
    const [editedContent,setEditedContent]=useState(comment.content);

    useEffect(()=>{

const getuser=async()=>{
    try {
       
        const res=await fetch(`/api/user/${comment.userId}`);

        const data=await res.json();
        if(res.ok){
             setUser(data);
        }
        
    } catch (error) {
        console.log(error.message);
    }
}
getuser();

    },[comment]);


    const handleEdit=async()=>{
       setIsEditing(true);
       setEditedContent(comment.content);

    }

    const handleSave=async()=>{
        try {
            
  const res=await fetch(`/api/comment/editcomment/${comment._id}`,{
    method:'PUT',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({content:editedContent})
  });

  if(res.ok){
    setIsEditing(false);
    onEdit(comment,editedContent);
  }

        } catch (error) {
          console.log(error);  
        }
    }


  return (
    <div className=' flex p-4 border-b dark:border-gray-600 text-sm'>

<div className='flex-shrink-0 mr-2' >
<img className="w-10 h-10 rounded-full bg-gray-100" src={user?.profilePicture} alt={user?.username} />
</div>
<div className='flex-1'>
    <div className='flex items-center mb-1'>
        <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}`:" anonymous user"}</span>
        <span className='text-gray-500 text-xs'>{moment(comment.updatedAt).fromNow()} </span>
    </div>{isEditing?
    <>
    <Textarea
    className='mb-2 resize-none'
    value={editedContent}
    onChange={(e)=>setEditedContent(e.target.value)}
     />
     <div className="flex justify-end gap-2 text-xs" >

     <Button
     type="button" 
     size='sm'
     gradientDuoTone='purpleToBlue'
      onClick={handleSave}>Save</Button>

     <Button 
      type="button" 
     size='sm'
     gradientDuoTone='purpleToBlue' outline onClick={
        ()=>setIsEditing(false)
     }>Cancel</Button>

     </div>
    </>
   :(
        <>
         <p className='text-gray-500 mb-2'>
        {comment.content}
    </p>
    <div className="flex items-center pt-2 text-xs gap-2 border-t max-w-fit dark:border-gray-700 ">
        <button type="button" onClick={()=>onLike(comment._id)}
         className={`first-letter:text-gray-400 hover:text-red-500
          ${Curruser && comment.likes.includes(Curruser._id) && '!text-red-500'}`}>
            <FaHeart className='text-sm' />
        </button>
        <p className='text-gray-400'>{comment.numberOfLikes>0 && comment.numberOfLikes+" "+(comment.numberOfLikes===1?"like":"likes")}</p>
    {
        Curruser && (Curruser._id===comment._id) || (Curruser.isAdmin) && (
            <>
            <button type="button" className='text-gray-400 hover:text-blue-500' onClick={handleEdit}>
                 Edit
            </button>
            <button type="button" className='text-gray-400 hover:text-red-500' onClick={()=>onDelete(comment._id) }>
                 Delete
            </button>
            </>
           
        )
    }
   
    
    </div>
        </>
    )}
    
   

</div>

    </div>
  )
}

export default Comment