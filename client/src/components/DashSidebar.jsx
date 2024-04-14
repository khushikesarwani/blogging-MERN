import React,{useState,useEffect} from 'react';
import {Sidebar} from 'flowbite-react';
import {HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation} from 'react-icons/hi'; 
import {useLocation,Link,useNavigate} from 'react-router-dom';
import {signoutSuccess} from '../Redux/user/userSlice.js';
import {useDispatch,useSelector} from 'react-redux';



const DashSidebar = () => {


const {Curruser}=useSelector((state)=>state.user);


    const location=useLocation();
    const [tab,setTab]=useState('profile');
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    
    // console.log(location);
    useEffect(()=>{
      const urlParams=new URLSearchParams(location.search);
      const tabFromUrl=urlParams.get('tab');
      // console.log(tabFromUrl);
      if(tabFromUrl)
      setTab(tabFromUrl);
    
    },[location.search]);


    //signout/logout
    const handleSignOut=async()=>{
      try {
        const response=await fetch("api/user/signout",{
          method:'POST',
        });
        const data=await response.json();
      
      
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
    <Sidebar  className='w-full md:w-56' >
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-2'>
            <Link to='/dashboard?tab=profile' >
                <Sidebar.Item active={tab==='profile'} icon={HiUser}  label={Curruser.isAdmin ? 'admin' : 'user'} labelColor="dark" className="cursor-pointer" as='div' >
                  Profile
                </Sidebar.Item>
                </Link>

                {Curruser.isAdmin && (
                  <Link to='/dashboard?tab=posts'>
                <Sidebar.Item active={tab=='posts'} icon={HiDocumentText} as={'div'}>
                    Posts
                </Sidebar.Item>
                </Link>
                )}

                {Curruser.isAdmin && (
                  <Link to='/dashboard?tab=comments'>
                <Sidebar.Item active={tab=='comments'} icon={HiAnnotation} as={'div'}>
                    Comments
                </Sidebar.Item>
                </Link>
                )}

                {Curruser.isAdmin && (
                  <Link to='/dashboard?tab=users'>
                <Sidebar.Item active={tab=='users'} icon={HiOutlineUserGroup} as={'div'}>
                    Users
                </Sidebar.Item>
                </Link>
                )}
                

                <Sidebar.Item  icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut}  >
                 Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar;