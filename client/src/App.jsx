import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Header from './components/Header.jsx';
import About from './pages/About';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard.jsx';
import Footer from './components/Footer.jsx';
import PrivateRoute from './components/PrivateRoute.jsx'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute.jsx';
import CreatePost from './pages/CreatePost.jsx';
import UpdatePost from './pages/UpdatePost.jsx';
import PostPage from './pages/PostPage.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Search from './pages/Search.jsx';
import ContactUs from './pages/ContactUs.jsx';



const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <Header />
      <Routes>
      
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/search' element={<Search />} />

        <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        
        <Route element={<OnlyAdminPrivateRoute />}>
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>

      <Route path='/post/:postSlug' element={<PostPage />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;