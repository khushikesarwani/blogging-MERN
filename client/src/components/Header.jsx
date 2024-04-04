import { Button, Navbar, TextInput } from 'flowbite-react';
import React from 'react';
import {FaMoon, FaSearch } from 'react-icons/fa';
import {AiOutlineSearch} from 'react-icons/ai'
import {Link, useLocation} from 'react-router-dom';

const Header = () => {

  const path=useLocation().pathname;

  return (
    <Navbar className='border-b-2'>
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white  '>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 
      to-pink-500  text-white '>Khushi's</span><span>Blog</span>
      </Link>
      <form>
        <TextInput 
          type='text'
          placeholder='Search...'
          rightIcon={FaSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-13 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>

      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline ' color='gray' pill>
           <FaMoon />
        </Button>
        <Link to='sign-in'>
  <Button gradientDuoTone='purpleToBlue' pill outline>
    Sign In 
  </Button>
</Link>
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