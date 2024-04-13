import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {FaHeart} from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Comment = ({comment,onLike}) => {

    const {Curruser}=useSelector((state)=>state.user);
    const [user,setUser]=useState({});

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


  return (
    <div className=' flex p-4 border-b dark:border-gray-600 text-sm'>

<div className='flex-shrink-0 mr-2' >
<img className="w-10 h-10 rounded-full bg-gray-100" src={user?.profilePicture} alt={user?.username} />
</div>
<div className='flex-1'>
    <div className='flex items-center mb-1'>
        <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}`:" anonymous user"}</span>
        <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()} </span>
    </div>
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
    </div>

</div>

    </div>
  )
}

export default Comment