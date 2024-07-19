import React, { useState, useEffect } from 'react'
import berry from '../assets/berry.png'
import { GiLaptop } from "react-icons/gi";
import { GiPalmTree } from "react-icons/gi";
import { GiMaterialsScience } from "react-icons/gi";
import { IoMdGlobe } from "react-icons/io";
import { GiFrenchFries } from "react-icons/gi";
import { FaRegFlag } from "react-icons/fa";
import { ImFire } from "react-icons/im";
import { FaMedal } from "react-icons/fa6";
import {Button} from 'flowbite-react'
import {Link} from 'react-router-dom'
import RecentHomePost from '../components/RecentHomePost.jsx';
import EditorAndPopularPost from '../components/EditorAndPopularPost.jsx';

export default function Homepage() {
  const [recentPosts, setRecentPosts] = useState(null)
  const [editorChoice, setEditorChoice] = useState(null)
  const [popular, setPopular] = useState(null)
  useEffect(()=>{
    const fetchRecentPosts = async()=>{
      try{
        const res = await fetch(`/api/post/getposts?limit=5`)
        const data = await res.json()
        if(res.ok){
          setRecentPosts(data.posts)
          
        }
      }catch(error){
        console.log(error.message)
      }
    }
    
    fetchRecentPosts();
    
  },[])

  useEffect(()=>{
    const fetchEditorChoice = async()=>{
      try{
        const res = await fetch(`/api/post/getposts?editorChoice=true&limit=3`)
        const data = await res.json()
        if(res.ok){
          setEditorChoice(data.posts)
          
        }
      }catch(error){
        console.log(error.message)
      }
    }
    
    fetchEditorChoice();
    
  },[])

  useEffect(()=>{
    const fetchPopular = async()=>{
      try{
        const res = await fetch(`/api/post/getposts?popular=true&limit=3`)
        const data = await res.json()
        if(res.ok){
          setPopular(data.posts)
          
        }
      }catch(error){
        console.log(error.message)
      }
    }
    
    fetchPopular();
    
  },[])
  return (
    <div className='min-h-screen '>
      <div className='  border-b border-b-slate-300  flex flex-col sm:flex-row mb-16'>
        <div className='flex-1 p-7 '>
          <img className=' h-60 sm:h-60  lg:h-96 w-full border-2  border-green-400 p-2 my-2 sm:my-12 '
          src={berry}></img>
        </div>
        <div className=' flex-1 flex flex-col mt-1 py-1 mx-5 sm:mt-14  sm:py-7 ' >
         
          <span className='text-6xl text-green-400 mb-5 mx-auto sm:mx-0'> Hi, HafsaBerry Here</span>
          <span className='hidden my-0 lg:block sm:px-3 sm:mt-8 sm:mb-8  text-3xl text-teal-600 mx-auto sm:mx-0'>gotta read it to believe it!</span>
          <span className='hidden my-0  lg:block lg:px-3 lg:mt-5 text-2xl text-teal-800 dark:text-white mx-auto lg:mx-0'>My blog is the perfect place to explore and read about all that life offers us... all the things that you have always wanted to know more about... and all that you never heard of</span>
          <Link to='/about'>
            <Button className='  w-60 mt-4 mb-5 mx-auto sm:mx-0 ' gradientDuoTone='greenToBlue' size='md'>Learn More About Us</Button>
          </Link>
        </div>
      </div>
      <div className='border-b border-b-slate-300 '>
        <div className='flex flex-wrap gap-4 p-5 sm:flex-row mb-11'>
          <Link to='/search?category=Tech' className='mx-auto'>
            <Button className=' bg-blue-400 dark:bg-blue-400 w-32 h-16 my-5  rounded-tl-3xl mx-auto shadow-lg'>
              <div className='flex flex-col items-center'>
                <span className='text-l mb-1 '>Tech</span>
                <GiLaptop className='h-5 w-5 '/>
              </div>
            </Button>
          </Link>
          <Link to='/search?category=Travel' className='mx-auto'>
            <Button className='bg-pink-400 dark:bg-pink-400  w-32 h-16 my-5 rounded-tl-3xl mx-auto shadow-lg'>
              <div className='flex flex-col items-center'>
                <span className='text-l mb-1 '>Travel</span>
                <GiPalmTree className='h-5 w-5 '/>
              </div> 
            </Button>
          </Link>
          <Link to='/search?category=Science' className='mx-auto'>
            <Button className='bg-green-400 dark:bg-green-400 w-32 h-16 my-5 rounded-tl-3xl mx-auto shadow-lg'>
              <div className='flex flex-col items-center'>
                <span className='text-l mb-1 '>Science</span>
                <GiMaterialsScience className='h-5 w-5'/>
              </div>
            </Button>
          </Link>
          <Link to='/search?category=Geography' className='mx-auto'>
            <Button className='bg-orange-400 dark:bg-orange-400 w-32 h-16 my-5 rounded-tl-3xl mx-auto shadow-lg'>
              <div className='flex flex-col items-center'>
                <span className='text-l mb-1 '>Geography</span>
                <IoMdGlobe className='h-5 w-5'/>
              </div>
            </Button>
          </Link>  
          <Link to='/search?category=Food' className='mx-auto'>
            <Button className='bg-purple-400 dark:bg-purple-400 w-32 h-16  my-5 rounded-tl-3xl mx-auto shadow-lg'>
              <div className='flex flex-col items-center'>
                <span className='text-l mb-1'>Food</span>
                <GiFrenchFries className='h-5 w-5'/>
              </div> 
            </Button>
          </Link>
          <Link to='/search?category=Netherlands' className='mx-auto'>
            <Button className='bg-rose-400 dark:bg-rose-400 w-32 h-16 my-5 rounded-tl-3xl mx-auto shadow-lg'>
            <div className='flex flex-col items-center'>
              <span className='text-l mb-1'>Netherlands</span>
              <FaRegFlag className='h-5 w-5'/>
            </div>
            </Button>
          </Link>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row gap-2 sm:gap-7'>
        <div>
          <h1 className='text-4xl p-6 mt-5 mb-1 sm:ml-14'>Recent Articles:</h1>
          <div className='sm:ml-14 flex flex-col gap-14 sm:gap-10 mt-1 mb-4 sm:mb-14'>
            {recentPosts && recentPosts.map((post)=>(
              <RecentHomePost key={post._id} post={post}/>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-2 sm:gap-14 mr-7 '>
          <div className='flex flex-col mt-1 sm:mt-10 p-5'>
            <div className='flex flex-row items-center gap-3'>
              <h1 className='text-orange-500 dark:text-orange-400 text-md'>What's hot</h1>
              <ImFire className='text-orange-400'/>
            </div>
            <h1 className='text-3xl font-semibold'>Trending</h1>
            <div>
              {popular && popular.map((post)=>(
                <EditorAndPopularPost key={post._id} post={post} />
              ))}
            </div>
          </div>
          <div className='flex flex-col mt-1 sm:mt-14 p-5 mb-14'>
            <div className='flex flex-row items-center gap-3'>
              <h1 className='text-blue-600 dark:text-blue-400 text-md'>What's chosen</h1>
              <FaMedal className='text-blue-400'/>
            </div>
            <h1 className='text-3xl font-semibold'>Editor's Choice</h1>
            <div>
              {editorChoice && editorChoice.map((post)=>(
                <EditorAndPopularPost key={post._id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
