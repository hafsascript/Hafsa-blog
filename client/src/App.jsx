import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import About from './pages/About'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Homepage from './pages/Homepage'
import Headers from './components/Headers'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import AdminPrivateRoute from './components/AdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import Post from './pages/Post'
import ScrollTop from './components/ScrollTop'
import Search from './pages/Search'



export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop/>
      <Headers/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard/>}/> 
        </Route>
        <Route element={<AdminPrivateRoute/>}>
          <Route path="/create-post" element={<CreatePost/>}/>
          <Route path="/update-post/:postId" element={<UpdatePost/>}/> 
        </Route>
        <Route path="/post/:postSlug" element={<Post/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

