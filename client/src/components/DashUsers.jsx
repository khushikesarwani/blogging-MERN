import React, { useEffect,useState } from 'react';
import {useSelector} from 'react-redux';
import {Button, Table,Modal} from 'flowbite-react';
import {HiOutlineExclamationCircle} from 'react-icons/hi';
import {FaCheck,FaTimes} from 'react-icons/fa';

const DashUsers = () => {

  const {Curruser}=useSelector((state)=>state.user);
  const [users,setUsers]=useState([]);
  const [showMore,setshowMore]=useState(true);
  const [showModel,setShowModel]=useState(false);
  const [userIdToDelete,setUserIdToDelete]=useState(null);



useEffect(()=>{

  const fetchusers=async()=>{
    try {
      const res=await fetch(`/api/user/getusers`);
      const data=await res.json();


      if(res.ok){
      setUsers(data.users);

      //for show more button
      if(data.users.length<9){
        setshowMore(false);
      }
      }

    } catch (error) {
      console.log(error.message);
    }
  }

if(Curruser.isAdmin)  fetchusers();

},[Curruser._id]);

//show more 
const handleShowMore=async()=>{

  const startIndex=users.length;
  

  try {
   
const res=await fetch(`/api/user/getusers?startIndex=${startIndex}`);
const data=await res.json();

if(res.ok)
  setUsers((prev)=>[...prev,...data.users]);

  if(data.users.length<2){
    setshowMore(false);
  }

  } catch (error) {
    console.log(error.message);
  }
}


//delete post
const handleDeleteUser = async()=>{
//   setShowModel(false);
//   try {
//     const res=await fetch(`/api/user/deleteuser/${userIdToDelete}/${Curruser._id}`,{
//       method:'DELETE',
//     }
//   );
//  const data=await res.json();

//     if(!res.ok){
//       console.log(data.message);
//     }else{
//      setUsers((prev)=>{
       
//          return prev.filter((user)=>user._id!==userIdToDelete);
//       });
//     }

    
//   } catch (error) {
//     console.log(error.message);
//   }
}



  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 
    scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500  '>
      {Curruser.isAdmin && users.length >0 ? (
        <>
          <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Date Created</Table.HeadCell>
            <Table.HeadCell>User Image</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Admin</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            
          </Table.Head>

            {users.map((user)=>{
              return (<Table.Body key={user._id} className='divide-y'>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' >
                  <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <img 
                      src={user.profilePicture}
                      alt="user-image"
                      className='w-10 h-10 object-cover bg-gray-500 rounded-full '
                       />
                  
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.isAdmin? (<FaCheck className='text-green-500' />) :(<FaTimes className='text-red-500' />)}</Table.Cell>
                 
                  <Table.Cell><span onClick={()=>{
                    setShowModel(true);
                   setUserIdToDelete(user._id);
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
        You have no users yet !
      </p>)}

      <Modal show={showModel}
  onClose={()=>setShowModel(false)} popup size='md'>
  <Modal.Header />
  <Modal.Body>
    <div className="text-center">
      <HiOutlineExclamationCircle className='h-14 w-14
       text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
       <h3 className=' text-lg text-gray-500 dark:text-gray-200'>Are you sure you want to delete this user?</h3>
    
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

export default DashUsers;