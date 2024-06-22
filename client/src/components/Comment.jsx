import React, { useEffect, useState } from 'react'
import moment from 'moment';
import {FaThumbsUp} from 'react-icons/fa'
import { useSelector} from 'react-redux';
import {Button, Textarea} from 'flowbite-react'

export default function Comment({comment, onLike, onSaveEdits, onDelete}) {
    const [user, setUser] = useState({});
    const {currentUser} = useSelector(state=>state.user);
    const [editComment, setEditComment] = useState(false)
    const [editedContent, setEditedContent] = useState(comment.content)
    
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

    const handleEdit = ()=>{
        setEditComment(true);
        setEditedContent(comment.content);
    };

    const handleSave = async()=>{
        try{
            const res = await fetch(`/api/comment/editComment/${comment._id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: editedContent
                })
            })
            if(res.ok) {
                setEditComment(false)
                onSaveEdits(comment, editedContent)
            }
        }catch(error){
            console.log(error.message)
        }
    };
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
                {editComment ? (
                    <>
                        <Textarea
                        className='mb-2 p-2 bg-green-100 rounded-sm resize-none'
                        value={editedContent}
                        rows='5'
                        onChange={(e)=> setEditedContent(e.target.value)}/>
                        <div className='flex justify-between my-1'>
                            <Button
                            type='button'
                            size='sm'
                            gradientMonochrome='success'
                            onClick={handleSave}>
                                Save
                            </Button>
                            <Button
                            type='button'
                            size='sm'
                            gradientMonochrome='failure'
                            outline
                            onClick={()=>setEditComment(false)}>
                                Cancel
                            </Button>
                        </div>
                    </>
                ) : (
                <>
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
                        {
                        currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                            <>
                                <button type='button'
                                onClick={handleEdit}
                                className='text-gray-400 hover:text-purple-500 ml-3'>
                                    Edit
                                </button>
                                <button type='button'
                                onClick={()=> onDelete(comment._id)}
                                className='text-gray-400 hover:text-red-500 ml-3'>
                                    Delete
                                </button>
                                
                            </>
                        )
                        }
                    </div>
                </>

                )}
            </div>
        </div>
    </div>
  )
}
