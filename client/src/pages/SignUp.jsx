import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useRef, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';


const SignUp = () => {

  const navigate=useNavigate();
const [loading,setLoading]=useState(false);
const [errormessage,setErrormessage]=useState(null);

  const username=useRef();
  const password=useRef();
  const email=useRef();


  const handleSubmit=async(e)=>{
    e.preventDefault();

    const data={
      username:username.current.value.trim(),
      email:email.current.value,
      password:password.current.value

    }

//if any field is empty , show an error and return
if(!data.email || !data.username || !data.password){
  return setErrormessage("Please fill out all the details");
}

    setLoading(true);
    try {
      setErrormessage(null);//cleaning up previous errmesg
      const response= await fetch('/api/auth/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      });
     const d= await response.json();
     console.log(d);
setLoading(false);
if(d.success===false){
  return setErrormessage(d.message);
}
navigate('/sign-in')
    } catch (error) {
      setLoading(false);
      console.log(error);
      setErrormessage(error.message);
    }

  }


  return (
    <div className='min-h-screen mt-20  '>
      <div className='flex p-3 max-w-3xl mx-auto flex-col
       md:flex-row md:items-center gap-5'>
      {/* left side */}
        <div className='flex-1'>
        <Link to='/' className='  font-bold dark:text-white text-4xl '>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 
      to-pink-500  text-white '>Khushi's</span><span>Blog</span>
      </Link>
      <p className='text-sm mt-5'>
      Lorem ipsum dolor sit amet consectetur adipisicing
       elit. Mollitia,  
      </p>
        </div>
        {/* right side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
          <div>
          <Label value="Your Username" />
            <TextInput
            ref={username}
            type='text'
            placeholder='Ex: Kimchi'
            id='username'
             />
          </div>
          <div>
          <Label value="Your Email" />
            <TextInput
            ref={email}
            type='email'
            placeholder='Ex: kimchi@gmail.com'
            id='email'
             />
          </div>
          <div>
          <Label value="Your Password" />
            <TextInput
            ref={password}
            type='password'
            placeholder='Select strong password'
            id='password'
             />
          </div>
           
         <Button type='submit' gradientDuoTone='purpleToPink' disabled={loading} >
          {loading? (
            <>
            <Spinner size='sm' />
            <span className='pl-3'>loading...</span>

            </>
           
          ) : "sign Up"}
         </Button>
          </form>

          <div className='flex gap-2 text-sm mt-5'>
<span>Have an account?</span><Link to='/sign-in' className='text-blue-500 hover:text-blue-900'>
          Sign-in
          </Link>
          </div>

          {errormessage && (
            <Alert className='mt-5' color='failure'>
              {errormessage}
            </Alert>
          )
          }
          
        </div>

      </div>
    </div>
  )
}

export default SignUp