import { Alert, Button, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Comment from './Comment.jsx';



export default function CommentSection({postId}) {

    const {currentUser} = useSelector(state=>state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if (comment.length > 300 ){
            return;
        }

        try{
            setCommentError(null)
            const res = await fetch('/api/comment/create',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comment,
                    postId,
                    userId: currentUser._id
                })
            })
    
            const data = await res.json()
    
            if(res.ok){
                setComment('');
                setCommentError(null);
                setComments([data, ...comments]);
            }
        } catch (error){
            setCommentError('Something Went Wrong')
        }
    }

    useEffect(()=>{
        const getComments = async()=>{
            try{
                const res = await fetch(`/api/comment/getComments/${postId}`);
                
                if (res.ok){
                    const data = await res.json();
                    setComments(data);
                }
            }catch(error){
                console.log(error.message)
            }
        };

        getComments();
    }, [postId])


    const handleLike = async (commentId) => {
        try {
          if (!currentUser) {
            navigate('/sign-in');
            return;
          }
          const res = await fetch(`/api/comment/likeComment/${commentId}`, {
            method: 'PUT',
          });
          if (res.ok) {
            const data = await res.json();
            setComments(
              comments.map((comment) =>
                comment._id === commentId
                  ? {
                      ...comment,
                      likes: data.likes,
                      numberOfLikes: data.likes.length,
                    }
                  : comment
              )
            );
          }
        } catch (error) {
          console.log(error.message);
        }
      };
  return (
    <div className='max-w-2xl mx-auto w-full p-4'>
        {currentUser ? (
        <div className='flex items-center gap-2 my-7  text-sm'>
            <p className='text-slate-400'>Signed in as:</p>
            <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture}/>
            <Link className='text-purple-400 text-xs hover:underline' to={'/dashboard?tab=profile'}>
                @{currentUser.username}
            </Link>
        </div>
        ):(
        <div className='flex gap-1 my-7 text-md'>
            
            <Link  className='hover:text-sky-500 underline text-blue-500'to={'/sign-in'}>Sign In</Link>
            <p className='text-sky-500'>To Comment</p>
        </div>

        )}
        {currentUser && (
            <form onSubmit={handleSubmit} className='border p-5 rounded-lg border-blue-200'>
                <Textarea
                placeholder='Add A Comment Right Here...'
                rows='3'
                maxLength='300'
                onChange={(e)=> setComment(e.target.value)}
                value={comment}/>
                <div className='flex justify-between items-center'>
                    <p className='text-xs my-3 text-gray-500'>
                        {300 - comment.length} characters to go
                    </p>
                    <Button className='my-3' gradientDuoTone='greenToBlue' outline type='submit'>
                        Submit
                    </Button>
                </div>
                {commentError && (
                    <Alert color='failure' className='mt-5 mb-2'>
                    {commentError}
                </Alert>
                ) }
            </form>
            
        )}

        {comments.length === 0 ? (
            <p className='text-lg mx-auto text-center my-6'>No Comments</p>
        ):(
            <>
                <div className='flex flex-col '>
                    <div className='flex flex-row text-md my-5 items-center gap-2 '>
                        <p>Comments</p>
                        <div className='border border-green-400 py-1 px-2 rounded-sm'>
                            <p>{comments.length}</p>
                        </div>
                    </div>
                    {
                        comments.map(comment=>(
                            <Comment key={comment._id} comment={comment} onLike={handleLike}/>
                        ))
                    }
                </div>
            </>
        )}
    </div>
  )
}
