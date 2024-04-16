import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import CallToAction from '../components/CallToAction.jsx';
import PostCard from '../components/PostCard.jsx';
import { TypeAnimation } from 'react-type-animation';
import { Button } from 'flowbite-react';


const Home = () => {

  const [posts,setPosts]=useState([]);


  useEffect(()=>{

    const fetchposts=async()=>{
      const res=await fetch(`/api/post/getposts`);
      try {
   const data=await res.json();
   if(res.ok){
    setPosts(data.posts);

   }

        
      } catch (error) {
        console.log(error.message);
      }
     
    }

    fetchposts();
  },[]);




  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
         <TypeAnimation className='text-5xl font-bold lg:text-6xl py-3'
      sequence={[
    
        'Welcome To My Blog',
        1000, 
        'Where Every Click Unveils a World of Inspiration!',
        1000, 
      ]}
      wrapper="span"
      speed={40}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
 <p className='text-gray-500 text-lg sm:text-lg w-[800px]'>Step into a realm where words dance, ideas flourish, and creativity knows no bounds. We're thrilled to extend a warm welcome to you as you embark on a 
         journey through the captivating world of Khushi's Blog.</p>
         <Link to='/search' className="text-md sm:text-md text-teal-500  font-bold hover:underline" >
        <Button gradientDuoTone="purpleToPink" outline>View all posts</Button>
      </Link>
      </div>
      <div className=" p-3 dark:bg-slate-700 mt-4 ">
        <CallToAction />
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7 ">
{
  posts &&  posts.length>0 && (
    <div className="flex flex-col gap-6 ">
      <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
      <div className="flex flex-wrap gap-4">
        {
          posts.map((post)=>{
           return <PostCard key={post._id} post={post} />
          })
        }
      </div>
      <Link to="/search" className='text-lg text-teal-500 hover:underline text-center'>
        View all posts
      </Link>
    </div>
  )
}
      </div>
    </div>
  )
}

export default Home