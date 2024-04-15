import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import {FaMoon, FaSearch, FaSun } from 'react-icons/fa';
import {AiOutlineSearch} from 'react-icons/ai'
import {Link, useLocation,useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { toggleTheme } from '../Redux/theme/themeSlice';
import {signoutSuccess} from '../Redux/user/userSlice.js';


const Header = () => {


  const [searchTerm,setSearchTerm]=useState('');
  const location=useLocation();

   
  const navigate=useNavigate();
  const dispatch=useDispatch();
 //for getting theme to reflect sun or moon icon

 
 const {theme}=useSelector((state)=>state.theme);

  const path=useLocation().pathname;

  const {Curruser}=useSelector(state=>state.user);//to get only user wala state

//for searching functionality=========================

useEffect(()=>{
const urlParams=new URLSearchParams(location.search);
const searchTermFromUrl=urlParams.get('searchTerm');

if(searchTermFromUrl){
  
  setSearchTerm(searchTermFromUrl);
}


},[location.search]);


  //sign out/logout===============

const handleSignOut=async()=>{
  try {
    const response=await fetch("/api/user/signout",{
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
  //function for search bar

  const handleSubmit=async(e)=>{
e.preventDefault();
const urlParams=new URLSearchParams(location.search);
urlParams.set('searchTerm',searchTerm);
const searchQuery=urlParams.toString();
navigate(`/search?${searchQuery}`);


  }

  return (
    <Navbar className='border-b-2'>
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white  '>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 
      to-pink-500  text-white '>Khushi's</span><span>Blog</span>
      </Link>
      <form onSubmit={handleSubmit} >
        <TextInput 
          type='text'
          placeholder='Search...'
          rightIcon={FaSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
      </form>
      <Button className='w-12 h-13 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>

      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline ' color='gray' pill onClick={()=>dispatch(toggleTheme())}>
           {theme==='light'? (<FaMoon  />) :(<FaSun  />)}
        </Button>
        {Curruser ? (
          <Dropdown
          arrowIcon={false}
           inline
           label={
            <Avatar
            alt='user'
            img={Curruser.profilePicture}
            rounded
             />
           }
          >

          {/* lets make dropdown menu */}
          <Dropdown.Header>
            <span className='block text-sm'>@{Curruser.username}</span>
            <span className='block text-sm font-medium truncate'>{Curruser.email}</span>
          </Dropdown.Header>
          <Link to='/dashboard?tab=profile'>
         <Dropdown.Item>Profile</Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
            
          </Dropdown>
        ) : (
          <Link to='sign-in'>   
  <Button gradientDuoTone='purpleToBlue' pill outline>
    Sign In 
  </Button>
</Link>
        )}
       
 {/* adding toggle */}
<Navbar.Toggle />

      </div>
      <Navbar.Collapse>

  <Link to='/'>
  <Navbar.Link active={path==='/'} as={'div'}> {/*as div , cause link is anchor tag and this tag as well and we cannot place one inside other anchor */}

      Home 
  </Navbar.Link>
  </Link>

  <Link to='/about'>
  <Navbar.Link active={path==='/about'} as={'div'}>
      About
    </Navbar.Link>
  </Link>

  <Link to='/sign-in'>
  <Navbar.Link active={path==='/sign-in'} as={'div'}>
      Sign In
    </Navbar.Link>
  </Link>

</Navbar.Collapse>


    </Navbar>
  )
}

export default Header;