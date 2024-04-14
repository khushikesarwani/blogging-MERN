import React, { useEffect,useState } from 'react';
import {useSelector} from 'react-redux';
import {Button, Table,Modal} from 'flowbite-react';
import {HiOutlineExclamationCircle} from 'react-icons/hi';
import {FaCheck,FaTimes} from 'react-icons/fa';

const DashComments = () => {

  const {Curruser}=useSelector((state)=>state.user);
  const [comments,setComments]=useState([]);
  const [showMore,setshowMore]=useState(true);
  const [showModel,setShowModel]=useState(false);
  const [commentIdToDelete,setCommentIdToDelete]=useState(null);



useEffect(()=>{

  const fetchComments=async()=>{
    try {
      const res=await fetch(`/api/comment/getcomments`);
      const data=await res.json();


      if(res.ok){
      setComments(data.comments);

      //for show more button
      if(data.comments.length<9){
        setshowMore(false);
      }
      }

    } catch (error) {
      console.log(error.message);
    }
  }

if(Curruser.isAdmin)  fetchComments();

},[Curruser._id]);

//show more 
const handleShowMore=async()=>{

  const startIndex=comments.length;
  

  try {
   
const res=await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
const data=await res.json();

if(res.ok)
  setComments((prev)=>[...prev,...data.comments]);

  if(data.comments.length<2){
    setshowMore(false);
  }

  } catch (error) {
    console.log(error.message);
  }
}


//delete post
const handleDeleteComment = async()=>{
  setShowModel(false);
  try {
    const res=await fetch(`/api/comment/deletecomment/${commentIdToDelete}`,{
      method:'DELETE',
    }
  );
 const data=await res.json();

    if(!res.ok){
      console.log(data.message);
    }else{
     setComments((prev)=>{
       
         return prev.filter((comment)=>comment._id!==commentIdToDelete);
      });
    }

    
  } catch (error) {
    console.log(error.message);
  }
}



  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 
    scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500  '>
      {Curruser.isAdmin && comments.length >0 ? (
        <>
          <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Comment Content</Table.HeadCell>
            <Table.HeadCell>Number of likes</Table.HeadCell>
            <Table.HeadCell>PostId</Table.HeadCell>
            <Table.HeadCell>UserId</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            
          </Table.Head>

            {comments.map((c)=>{
              return (<Table.Body key={c._id} className='divide-y'>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' >
                  <Table.Cell>{new Date(c.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{c.content}</Table.Cell>
                  <Table.Cell>{c.numberOfLikes}</Table.Cell>
                  <Table.Cell>{c.postId}</Table.Cell>
                  <Table.Cell>{c.userId}</Table.Cell>
                  <Table.Cell><span onClick={()=>{
                    setShowModel(true);
                   setCommentIdToDelete(c._id);
                   }} className='cursor-pointer text-red-500 font-medium hover:underline'
                   >
                  Delete
                  </span></Table.Cell>
                 
                </Table.Row>
                </Table.Body>
              )
            })}



          </Table>
          {showMore && (
            <Button className='mt-3 text-white self-center text-sm mx-auto  ' outline onClick={handleShowMore} >
              Show More
            </Button>
          )}
        </>
      ) :
      (<p>
        You have no comments yet !
      </p>)}

      <Modal show={showModel}
  onClose={()=>setShowModel(false)} popup size='md'>
  <Modal.Header />
  <Modal.Body>
    <div className="text-center">
      <HiOutlineExclamationCircle className='h-14 w-14
       text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
       <h3 className=' text-lg text-gray-500 dark:text-gray-200'>Are you sure you want to delete this comment?</h3>
    
       <div className="flex justify-center  gap-2 mt-5 ">
        <Button color='failure' onClick={handleDeleteComment} >Delete</Button>
        <Button color='yellow' onClick={()=>setShowModel(false)}>Cancel</Button>
       </div>
    </div>
  </Modal.Body>
</Modal>

    </div>
  )
}

export default DashComments;