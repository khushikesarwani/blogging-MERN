import React from 'react';
import { Footer } from 'flowbite-react';
import {Link} from 'react-router-dom';
import {BsFacebook, BsTwitter, BsInstagram, BsWhatsapp, BsGithub} from 'react-icons/bs';

const FooterComp = () => {
  return (
    <Footer className='boder border-t-8 border-teal-500'>

<div className='w-full max-w-7xl mx-auto'>
<div className='grid w-full justify-between sm:flex md:grid-cols-1'>
<div className='mt-5'>
<Link to='/' className='  font-bold dark:text-white text-lg '>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 
      to-pink-500  text-white '>Khushi's</span><span>Blog</span>
      </Link>
</div>

<div className='grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6 mt-4'>
<div>
<Footer.Title title='About' />
<Footer.LinkGroup col>
<Footer.Link href='https://google.com' target='_blank' rel='noopener noreferror' >
    Our History
</Footer.Link>
<Footer.Link href='https://google.com' target='_blank' rel='noopener noreferror' >
    Our Vision
</Footer.Link>
</Footer.LinkGroup>
</div>

<div>
<Footer.Title title='Follow Us' />
<Footer.LinkGroup col>
<Footer.Link href='https://github.com' target='_blank' rel='noopener noreferror' >
   Github
</Footer.Link>
<Footer.Link href='https://instagram.com' target='_blank' rel='noopener noreferror' >
   Instagram
</Footer.Link>
<Footer.Link href='https://discord.com' target='_blank' rel='noopener noreferror' >
   Discord
</Footer.Link>
</Footer.LinkGroup>
</div>

<div>
<Footer.Title title='About' />
<Footer.LinkGroup col>
<Footer.Link href='#'  >
    Privacy Policy
</Footer.Link>
<Footer.Link href='#' >
    Terms &amp; Conditions
</Footer.Link>
</Footer.LinkGroup>
</div>
</div>
</div>
<Footer.Divider />
<div className='w-full sm:flex sm:items-center sm:justify-between'>
    <Footer.Copyright href="#" by="Khushi's Blog" year={new Date().getFullYear()} />
    <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
        <Footer.Icon href="#" icon={BsFacebook} />
        <Footer.Icon href="#" icon={BsTwitter} />
        <Footer.Icon href="#" icon={BsInstagram} />
        <Footer.Icon href="#" icon={BsWhatsapp} />
        <Footer.Icon href="#" icon={BsGithub} />
    </div>
</div>

</div>
    </Footer>
  )
}

export default FooterComp;