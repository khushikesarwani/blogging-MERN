import React,{useState,useEffect} from 'react';
import {Sidebar} from 'flowbite-react';
import {HiUser, HiArrowSmRight} from 'react-icons/hi'; 
import {useLocation,Link} from 'react-router-dom';



const DashSidebar = () => {

    const location=useLocation();
    const [tab,setTab]=useState('profile');
    
    
    // console.log(location);
    useEffect(()=>{
      const urlParams=new URLSearchParams(location.search);
      const tabFromUrl=urlParams.get('tab');
      // console.log(tabFromUrl);
      if(tabFromUrl)
      setTab(tabFromUrl);
    
    },[location.search]);

  return (
    <Sidebar  className='w-full md:w-56' >
        <Sidebar.Items>
            <Sidebar.ItemGroup>
            <Link to='/dashboard?tab=profile' >
                <Sidebar.Item active={tab==='profile'} icon={HiUser}  label={"user"} labelColor="dark" className="cursor-pointer" as='div' >
                  Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item  icon={HiArrowSmRight} className="cursor-pointer"  >
                 Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar;