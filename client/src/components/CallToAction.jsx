import React from 'react';
import {Button, TextInput} from 'flowbite-react';


const CallToAction = () => {
  return (
    <div>
        <div className='bgdesign relative '>
    <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaARWo26CAtdsFaY4R4j6SH0B5KMDAIjdZMw&s"
    className="h-[260px] w-full object-cover 
          group-hover:h-[200px] transition-all duration-300 opacity-0 "
     />

<div className='flex justify-center absolute bottom-[10px] left-0 right-0'>
    <form className='flex flex-col justify-center items-center'>
    <span className="max-w-[600px] text-center text-xl  font-semibold text-yellow-200 ">Join our prime membership !</span>
 <h5 className="max-w-[600px] text-center text-white font-semibold"> "Unlock Limitless Potential: Elevate Your Blogging Experience with Prime Membership!</h5>
    <p className="max-w-[600px] text-center text-white font-semibold ">
   Are you ready to take your blogging journey to new heights? Look no further than our Prime
    Membership—a gateway to unparalleled opportunities and resources tailored to fuel your 
    passion for blogging like never before.
    </p>
     <Button gradientDuoTone="purpleToBlue" className='my-2' >
      Join Prime Membership!
     </Button>

    </form>
     </div>
        </div>
    </div>
  )
}

export default CallToAction;