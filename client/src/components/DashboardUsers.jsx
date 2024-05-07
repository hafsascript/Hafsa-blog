import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux';
import {Modal, Table,Button} from 'flowbite-react'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {FaCheck, FaTimes} from 'react-icons/fa'

export default function DashboardUsers() {
  const {currentUser} = useSelector(state=>state.user)
  const [users, setUsers] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [userIdToDelete,setUserIdToDelete] = useState('')
 
  useEffect(()=>{
    const fetchUsers = async()=>{
      try{
        const res = await fetch('/api/user/getusers')
        const data = await res.json()
        if(res.ok){
          setUsers(data.users)
          if(data.users.length<9){
            setShowMore(false)
          }
        }
      }catch(error){
        console.log(error.message)
      }
    }
    if(currentUser.isAdmin){
      fetchUsers();
    }
  },[currentUser._id])
  const handleShowMore =async()=>{
    const startIndex = users.length
    try{
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok){
        setUsers((prev)=>[...prev,...data.users])
        if(data.users.length<9){
          setShowMore(false);
        }
      }

    }catch(error){console.log(error.message)}
  }
  const handleDeleteUser = async()=>{
    try{
        const res = await fetch(`/api/user/delete/${userIdToDelete}`,{
            method: 'DELETE',
        })

        const data = await res.json();

        if(res.ok){
            setUsers((prev)=> prev.filter((user)=> user._id !== userIdToDelete));
            setShowModal(false)
        } else {
            console.log(data.message)
        }
    }catch(error){
        console.log(error.message)
    }
  }


  return (
    <div className='table-auto w-full overflow-x-scroll
    md:mx-auto p-3
    scrollbar
    scrollbar-track-slate-100 scrollbar-thumb-slate-300
    dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && users.length>0 ? (
        <>
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Date of Creation</Table.HeadCell>
            <Table.HeadCell>User Profile</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Admin Status</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          {users.map((user)=>(
            <Table.Body className='divide-y' key={user._id}>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                    <img
                    src={user.profilePicture}
                    className='w-10 h-10 rounded-full object-cover bg-slate-500'/>
                  
                </Table.Cell>
                <Table.Cell className='text-sky-700'>
                    {user.username}
                </Table.Cell>
                <Table.Cell className='text-fuchsia-700'>{user.email}</Table.Cell>
                <Table.Cell>{user.isAdmin ? (<FaCheck className='text-green-600'/>) : (<FaTimes className='text-red-700'/>) }</Table.Cell>
                <Table.Cell>
                  <span onClick={()=>{
                    setShowModal(true);
                    setUserIdToDelete(user._id);
                  }} className='font-medium text-red-600 hover:underline cursor-pointer'>Delete</span>
                </Table.Cell>
                
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        {showMore && (
          <button onClick={handleShowMore} className='w-full text-yellow-500 self-center text-sm py-7'>Show More</button>
        )}
        </>
      ):(
        <p>No Users</p>
      )}
      <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
        <Modal.Header/>
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-rose-300 mb-5 mx-auto'/>
              <h3 className='mb-5 text-lg text-rose-500'>Are you sure you want to delete this user?</h3>
              <div className='flex justify-center gap-11'>
                <Button color='failure' onClick={handleDeleteUser}>
                  Yes, I'm Sure
                </Button>
                <Button color='dark' onClick={()=>setShowModal(false)}>
                  No, Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
      </Modal>
    </div>
  )
}
