import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
        <Link to="/" className=' font-bold dark:text-white'>
            <span className='px-2 py-1 bg-sky-300 rounded-lg text-white text-7xl'>Hafsa</span>
            <span className='px-1 py-1 text-5xl'>Blog</span>
        </Link>
        <p className='text-sm mt-5'>
          This is Hafsa Blog
        </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-5'>
            <div>
              <Label value='Username'/>
              <TextInput
              type='text'
              placeholder='username'
              id='username'/>
            </div>
            <div>
              <Label value='Email'/>
              <TextInput
              type='text'
              placeholder='email'
              id='Email'/>
            </div>
            <div>
              <Label value='Password'/>
              <TextInput
              type='text'
              placeholder='password'
              id='password'/>
              
            </div>
            <Button gradientDuoTone='purpleToBlue' type='submit' >
                Sign Up
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-4'>
            <span>Already Have An Account?</span>
            <Link to='/sign-in' className='text-orange-500'>Sign In</Link>
          </div>
         

        </div>
      </div>
    </div>
  )
}
