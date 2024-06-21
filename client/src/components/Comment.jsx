import React, { useEffect, useState } from 'react'
import moment from 'moment';
import {FaThumbsUp} from 'react-icons/fa'
import { useSelector} from 'react-redux';

export default function Comment({comment, onLike}) {
    const [user, setUser] = useState({});
    const {currentUser} = useSelector(state=>state.user);
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
                <div className='flex text-xs items-center mt-2 gap-2 '>
                    <button className={`text-neutral-400 hover:text-amber-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-amber-500'}`}
                    type='button'
                    onClick={()=>onLike(comment._id)}>
                        <FaThumbsUp className='text-sm'/>
                    </button>
                    <p className='text-yellow-500'>
                        {comment.numberOfLikes > 0 && comment.numberOfLikes + " " +(comment.numberOfLikes === 1 ? 'like' : 'likes') }
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
