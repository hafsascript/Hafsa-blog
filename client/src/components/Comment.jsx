import React, { useEffect, useState } from 'react'
import moment from 'moment';

export default function Comment({comment}) {
    const [user, setUser] = useState({});
    console.log(user)
    useEffect(()=>{
        const getUser = async()=>{
            try{
                const res = await fetch(`/api/user/${comment.userId}`);

                const data = await res.json();
                if(res.ok){
                    setUser(data);
                }
            }catch(error){
                console.log(error.message);
            }
        }

        getUser();
    },[comment])
  return (
    <div className='flex p-5 border-b border-green-500 gap-3 '>
        <div className='flex-shrink-0'> 
            <img  className='w-10 h-10 rounded-full bg-slate-300' src={user.profilePicture} alt={user.username}/>
        </div>
        <div className='flex-1 '>
            <div className='flex flex-col'>
                <div className='flex items-center my-2 gap-1'>
                    <span className='font-bold mr-1 text-xs '>
                        {user ? `@${user.username}` : 'User Unavailable'}
                    </span>
                    <span className='text-red-400 text-xs'>
                        {moment(comment.createdAt).fromNow()}
                    </span>
                </div>
                <div>
                    <p className=' mb-2'>{comment.content}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
