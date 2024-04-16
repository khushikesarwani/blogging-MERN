import { Button, TextInput,Select } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import PostCard from "../components/PostCard.jsx";

const Search = () => {

const location=useLocation();
const navigate=useNavigate();

  const [sidebarData,setSidebarData]=useState({
    searchTerm:'',
    sort:'desc',
    category:''

  });
  // console.log(sidebarData);

const [posts,setPosts]=useState([]);

const [loading,setLoading]=useState(false);
const [showMore,setshowMore]=useState(false);

//first we wanna get all the data initially from the url
useEffect(()=>{

  const urlParams=new URLSearchParams(location.search);
  const searchFromUrl=urlParams.get('searchTerm');
  const sortFromUrl=urlParams.get('order');
  const categoryFromUrl=urlParams.get('category');

  if(searchFromUrl || sortFromUrl || categoryFromUrl){
    setSidebarData({
      ...sidebarData,
      searchTerm:searchFromUrl,
      sort:sortFromUrl,
      category:categoryFromUrl
    });
  }

  //fetching data
  const fetchPosts=async()=>{
setLoading(true);

const searchQuery=urlParams.toString(); //getting data from the url itself

const res=await fetch(`/api/post/getPosts?${searchQuery}`);

if(!res.ok){
setLoading(false);
return;
}else{
  const data=await res.json();
  setPosts(data.posts);
  setLoading(false);
  if(data.posts.length===9){
    setshowMore(true);
  }else{
    setshowMore(false);
  }
}

  }

  fetchPosts();
},[location.search]);


//handle changing

const handleChange=(e)=>{

  if(e.target.id==='searchTerm'){
    setSidebarData({
      ...sidebarData,
      searchTerm:e.target.value
    });
  }

  if(e.target.id==='sort'){
    const order=e.target.value || 'desc';
    setSidebarData({
      ...sidebarData,
      sort:order
    });
  }

    if(e.target.id==='category' && e.target.value!='uncategorized'){
      const category=e.target.value || 'uncategorized';
      setSidebarData({
        ...sidebarData,
        category
      });

     
  }

}

const handleSubmit=async(e)=>{
e.preventDefault();

const urlParams=new URLSearchParams(location.search);
urlParams.set('searchTerm',sidebarData.searchTerm);
urlParams.set('order',sidebarData.sort);
urlParams.set('category',sidebarData.category);
const searchQuery=urlParams.toString();
navigate(`/search?${searchQuery}`);
}

const handleShowMore=async()=>{
  const numberOfPosts=posts.length;
  const startIndex=numberOfPosts;

  const urlParams=new URLSearchParams(location.search);
  urlParams.set('startIndex',numberOfPosts);
  const searchQuery=urlParams.toString();

  const res=await fetch(`/api/post/getposts?${searchQuery}`);

  if(!res.ok){
    return;
  }

  const data=await res.json();
  setPosts({...posts,...data.posts});
  if(data.posts.length===9){
    setshowMore(true);
  }else{
    setshowMore(false);
  }
}

  return (
    <div>
    <div className='flex flex-col md:flex-row'>
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 ">
            <label htmlFor="searchTerm" className='whitespace-nowrap font-semibold'>Search Term : </label>
            <TextInput
            placeholder='search...'
            id="searchTerm"
            type="text"
           value={sidebarData.searchTerm}
           onChange={handleChange}
             />

          </div>
          <div className="flex items-center gap-2 ">
            <label htmlFor='sort' className=' font-semibold '>Sort : </label>
            <Select id="sort" onChange={handleChange} value={sidebarData.sort}>
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>

            </Select>
          </div>

          <div className="flex items-center gap-2 ">
            <label htmlFor='category' className=' font-semibold '>Category : </label>
            <Select id="category" onChange={handleChange} value={sidebarData.category}>
              <option value='uncategorized'>Uncategorized</option>
              <option value="travel">Travel</option>
              <option value="makeup">Makeup</option>
              <option value="car">Car</option>
              
            </Select>
          </div>
          <Button type="submit" gradientDuoTone='purpleToPink' outline >Apply Filters</Button>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>Posts Result:</h1>
        <div className='p-7 flex flex-wrap gap-4'>
{
  !loading && posts.length===0 && (
    <p className='text-xl text-gray-500'>No posts found.</p>
  )
}
{
  loading && (
    <p className='text-xl text-gray-500'>
      loading...
    </p>
  )
}
{
  !loading && posts.length>0 && posts.map((post)=>{
return <PostCard key={post._id} post={post} />
  })
}
        </div>
      </div>
     
    </div>
    {showMore && <button onClick={handleShowMore} className='text-teal-500 text-lg hover:underline p-7 w-full '>
        Show More
      </button>}
    </div>
  )
}

export default Search