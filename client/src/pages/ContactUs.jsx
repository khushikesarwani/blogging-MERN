import React, { useEffect, useState } from 'react';
import { Accordion, Button, Textarea } from 'flowbite-react';
import { useSelector } from 'react-redux';

const ContactUs = () => {

  const [feedback,setFeedback]=useState('');
  const {Curruser}=useSelector((state)=>state.user);
 

  return ( 
    <div className='flex flex-col justify-center items-center min-h-screen '>
      <h2 className='mt-2 text-lg font-semibold text-gray-700 dark:text-gray-300'>Frequently Asked Questions</h2>
        <div className='max-w-2xl overflow-hidden  '>
        <div className="accordion w-2xl mt-3">
    <Accordion >
      <Accordion.Panel>
        <Accordion.Title>What is this blogging website all about?</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
          Embark on a journey of style and adventure with our blogging platform dedicated to travel,
           fashion, and automotive enthusiasts.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
          Discover the  &nbsp; 
            <a
              href="#"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              latest trends &nbsp; 
            </a>
            in wanderlust destinations,
            chic outfits for your escapades,
           and sleek rides to complement your adventures, all in one vibrant community..
          </p>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>Are these blogs reliable?</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            These articles are 100% authentic and reliable. We research and do survey before actually putting
            anything for ouw viewers.
          </p>
          
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>What are the benefits of prime membership?</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
           Well Prime membership comes with a lot of benefits that you can actually put your articles in our blogging website.
           You get full control over the dashboard.
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Despite of these, your voice gets heard by millions of people through one platform. You embrace your identity✨ 
          </p>
          
          
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>

        </div>
        </div>
        <div className='text-center w-96 my-5 py-3 mx-auto'>
        <h2 className='text-lg font-semibold text-gray-700 dark:text-gray-300'>Feedback</h2>
        <p className='text-gray-600'>We would love to hear from you !</p>
        <form>
        
            <Textarea
            placeholder='Your feedback please....'
        rows='3'
        className='resize-none'
        value={feedback}
        onChange={(e)=>setFeedback(e.target.value)}

             />
             <Button type="button" onClick={()=>setFeedback('')} disabled={!Curruser}
              className='mx-auto my-3' gradientDuoTone="purpleToBlue">Share Feedback</Button>
        </form>

        </div>
    </div>
  )
}

export default ContactUs