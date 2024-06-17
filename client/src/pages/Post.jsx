import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {Spinner,Button} from 'flowbite-react'
import { Link } from 'react-router-dom';

export default function Post() {
    const {postSlug} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null)

    useEffect(()=>{
        const fetchPost = async()=>{
            try{
                setLoading(true);

                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();

                if(!res.ok){
                    setError(true);
                    setLoading(false);
                    return;
                }

                if(res.ok){
                    setPost(data.posts[0])
                    setLoading(false)
                    setError(false)
                }
            }catch(error){
                setError(true);
                setLoading(false);
            }
        };

        fetchPost();
    },[postSlug])

    if (loading) return (
        <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='xl' />
        </div>
    )
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h1 className='text-3xl mt-12 p-3 text-center font-mono max-w-2xl mx-auto lg:text-5xl'>{post && post.title}</h1>
        <Link to={`/search?category=${ post && post.category}`} className='self-center mt-5 mb-6'>
            <Button color='dark' className='p-4' size='s'>{post && post.category}</Button>
        </Link>
        <img src={post && post.image} alt={post && post.title} className='mt-10
        p-3 max-h-[600px] w-full object-cover'/>
        <div className='flex justify-between p-3 border-b border-emerald-400 mx-auto w-full max-w-5xl text-xs'>
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span>{post && (post.content.length/2000).toFixed(0)} mins </span>
        </div>
        <div className='p-4 max-w-3xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{__html : post && post.content}}>

        </div>
    </main>
  )
}
