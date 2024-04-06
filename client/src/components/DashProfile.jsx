import React from 'react';
import {useSelector} from 'react-redux';
import {Button, TextInput} from 'flowbite-react';

const DashProfile = () => {
const {Curruser}=useSelector((state)=>state.user);

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>
        <div className='w-32 h-32 rounded-full  self-center cursor-pointer' >
        <img src={Curruser.profilePicture} alt="profile picture" 
            className=" rounded-full border-8 border-lightgray object-cover shadow-md " 
        />
       </div>
       <TextInput 
       type="text"
       id="useranme"
       placeholder="username"
       defaultValue={Curruser.username}
        />
        <TextInput 
       type="email"
       id="email"
       placeholder="email"
       defaultValue={Curruser.email}
        />
        <TextInput 
       type="password"
       id="pasword"
       placeholder="password********"
       
        />
        <Button type="submit" gradientDuoTone='purpleToBlue' >
          Update
        </Button>
           
        </form>
        <div className="text-red-500 flex justify-between">
            <span className="cursor-pointer">Delete Account </span>
            <span className="cursor-pointer">Sign Out</span>
        </div>
    </div>
  )
}

export default DashProfile