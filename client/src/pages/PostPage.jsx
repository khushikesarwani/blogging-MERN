import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

const PostPage = () => {

    const {postSlug}=useParams();
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(false);
    const [post,setPost]=useState(null);
    const [recentPosts,setRecentPosts]=useState(null);


    //for fetching the main post based on slug===========

    useEffect(()=>{
        const fetchPost=async()=>{

            try {
                setError(null);
                setLoading(true);
                const res=await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data=await res.json();

                if(!res.ok){
                    setError(true);
                    setLoading(false);
                    return;
                }else{
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);

                }

            } catch (error) {
                setError(true);
                setLoading(false);
            }

        }

        fetchPost();
   
    },[postSlug]);

//for fetching recent posts=================

useEffect(()=>{
try {
    const fetchRecentPosts=async()=>{
const res=await fetch(`/api/post/getPosts?limit=3`);
const data=await res.json();
if(res.ok){
setRecentPosts(data.posts);

}


    }
    fetchRecentPosts();

} catch (error) {
    console.log(error.message);
}
},[]);





   
    {if(loading) return (
    <div className='flex justify-center items-center min-h-screen'>
<Spinner size='xl' />
    </div>
    );
}

  return (
 <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen '>
<h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl  mx-auto lg:text-4xl'>{post && post.title}</h1>

<Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
<Button color='gray' pill size='xs' className=''>{post && post.category}</Button>
</Link>
<img src={post?.image} alt={post?.title} className='mt-10 p-3 max-h-[600px] w-full object-cover'>
</img>

<div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
<span>{new Date(post?.createdAt).toLocaleDateString()}</span>
<span className='italic'>{(post?.content?.length /1000).toFixed(0)} mins read</span>
</div>


<div className='p-3 max-w-2xl mx-aut0 w-full post-contentk' dangerouslySetInnerHTML={{__html:post && post.content}}>

</div>

{/* =============CTA====================== */}

<div className='max-w-4xl mx-auto w-full'>
    <CallToAction />
</div>

{/* comments section */}
<CommentSection postId={post._id} />


{/* recent posts */}
<div className="flex flex-col justify-center items-center mb-5">
<h1 className='text-xl mt-5'>Recent Articles</h1>
<div className="flex flex-wrap gap-5 mt-5 justify-center">
{
    recentPosts && recentPosts.map((post)=>{
       return <PostCard key={post._id} post={post} />
    })
}
</div>

</div>

 </main>
  )
}

export default PostPage;