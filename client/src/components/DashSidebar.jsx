import React,{useState,useEffect} from 'react';
import {Sidebar} from 'flowbite-react';
import {HiUser, HiArrowSmRight} from 'react-icons/hi'; 
import {useLocation,Link,useNavigate} from 'react-router-dom';
import {signoutSuccess} from '../Redux/user/userSlice.js';
import {useDispatch} from 'react-redux';



const DashSidebar = () => {

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
    <Sidebar  className='w-full md:w-56' >
        <Sidebar.Items>
            <Sidebar.ItemGroup>
            <Link to='/dashboard?tab=profile' >
                <Sidebar.Item active={tab==='profile'} icon={HiUser}  label={"user"} labelColor="dark" className="cursor-pointer" as='div' >
                  Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item  icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut}  >
                 Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar;