import React, { useEffect,useState } from 'react';
import {useSelector} from 'react-redux';
import {Button, Table,Modal} from 'flowbite-react';
import {Link} from 'react-router-dom';
import {HiOutlineExclamationCircle} from 'react-icons/hi';

const DashPosts = () => {

  const {Curruser}=useSelector((state)=>state.user);
  const [userPosts,setUserPosts]=useState([]);
  const [showMore,setshowMore]=useState(true);
  const [showModel,setShowModel]=useState(false);
  const [postIdToDelete,setPostIdToDelete]=useState(null);



useEffect(()=>{

  const fetchposts=async()=>{
    try {
      const res=await fetch(`/api/post/getposts?userId=${Curruser._id}`);
      const data=await res.json();


      if(res.ok){
      setUserPosts(data.posts);
      //for show more button
      if(data.posts.length<9){
        setshowMore(false);
      }
      }

    } catch (error) {
      console.log(error.message);
    }
  }

if(Curruser.isAdmin)  fetchposts();

},[Curruser._id]);

//show more 
const handleShowMore=async()=>{

  const startIndex=userPosts.length;
  

  try {
   
const res=await fetch(`/api/post/getposts?userId=${Curruser._id}&startIndex=${startIndex}`);
const data=await res.json();

if(res.ok)
  setUserPosts((prev)=>[...prev,...data.posts]);

  if(data.posts.length<9){
    setshowMore(false);
  }

  } catch (error) {
    console.log(error.message);
  }
}


//delete post
const handleDeletePost = async()=>{
  setShowModel(false);
  try {
    const res=await fetch(`/api/post/deletepost/${postIdToDelete}/${Curruser._id}`,{
      method:'DELETE',
    }
  );
 const data=await res.json();

    if(!res.ok){
      console.log(data.message);
    }else{
     setUserPosts((prev)=>{
        // prev.filter((post)=>post._id!==postIdToDelete);
         return prev.filter((post)=>post._id!==postIdToDelete);
      });
    }

    
  } catch (error) {
    console.log(error.message);
  }
}



  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 
    scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500  '>
      {Curruser.isAdmin && userPosts.length >0 ? (
        <>
          <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell><span>Edit</span></Table.HeadCell>
          </Table.Head>

            {userPosts.map((post)=>{
              return (<Table.Body className='divide-y'>
              <Table.Row key={post._id} className='bg-white dark:border-gray-700 dark:bg-gray-800' >
                  <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img 
                      src={post.image}
                      alt="post-image"
                      className='w-20 h-10 object-cover bg-gray-500'
                       />
                    </Link>
                  </Table.Cell>
                  <Table.Cell><Link to={`/post/${post.slug}`} className='text-medium text-gray-900 dark:text-white ' >{post.title}</Link></Table.Cell>
                  <Table.Cell><Link to={`/post/${post.slug}`}>{post.category}</Link></Table.Cell>
                  <Table.Cell><span onClick={()=>{
                    setShowModel(true);
                   setPostIdToDelete(post._id);
                   }} className='cursor-pointer text-red-500 font-medium hover:underline'
                   >
                  Delete
                  </span></Table.Cell>
                  <Table.Cell>
                  <Link to={`/update-post/${post._id}`}>
                <span className=' text-teal-500 hover:underline '>Edit</span>
                  </Link>
                  </Table.Cell> 
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
        You have no posts yet !
      </p>)}

      <Modal show={showModel}
  onClose={()=>setShowModel(false)} popup size='md'>
  <Modal.Header />
  <Modal.Body>
    <div className="text-center">
      <HiOutlineExclamationCircle className='h-14 w-14
       text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
       <h3 className=' text-lg text-gray-500 dark:text-gray-200'>Are you sure you want to delete this post?</h3>
    
       <div className="flex justify-center  gap-2 mt-5 ">
        <Button color='failure' onClick={handleDeletePost} >Delete</Button>
        <Button color='yellow' onClick={()=>setShowModel(false)}>Cancel</Button>
       </div>
    </div>
  </Modal.Body>
</Modal>

    </div>
  )
}

export default DashPosts