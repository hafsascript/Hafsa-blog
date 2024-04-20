import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import {useSelector} from 'react-redux'

export default function DashboardProfile() {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <div className='max-w-lg mx-auto p-2 w-full'>
      <h1 className='my-9 text-center text-slate-700 dark:text-white font-semibold text-4xl'>Profile</h1>
      <form className='flex flex-col gap-5'>
        <div className='w-40 h-40 self-center cursor-pointer my-1'> 
          <img src={currentUser.profilePicture} alt="Picture"
          className='rounded-full w-full h-full border-8 border-[#9ae7bd] object-cover'/>
        </div>
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placeholder='password'/>
        <Button type='submit' gradientMonochrome='purple' className='my-4'>
          Update
        </Button>
      </form>
      <div className='text-red-700 flex justify-between mt-1'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
