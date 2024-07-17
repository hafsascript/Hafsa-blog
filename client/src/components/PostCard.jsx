import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({post}) {
  return (
    <div className='group relative w-full border h-[400px] overflow-hidden rounded-lg sm:w-[350px]
    border-blue-800 hover:border-2
    transition-all'>
        <Link to={`/post/${post.slug}`}>
            <img className='h-[260px] w-full
            object-cover group-hover:h-[200px]
            transition-all duration-300 z-20'src={post.image}/>
        </Link>
        <div className='p-3 flex flex-col gap-2'>
            <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
            <button className={post.category==='Tech'&& 'bg-blue-500 text-white p-2 rounded-3xl text-sm w-[120px]'
            || post.category==='Travel'&& 'bg-pink-500 text-white p-2 rounded-3xl text-sm w-[120px] '
            || post.category==='Food'&& 'bg-purple-500 text-white p-2 rounded-3xl text-sm w-[120px]'
            || post.category==='Science'&& 'bg-green-500 text-white p-2 rounded-3xl text-sm w-[120px]'
            || post.category==='Geography'&& 'bg-orange-500 text-white p-2 rounded-3xl text-sm w-[120px]'
            || post.category==='Netherlands'&& 'bg-rose-500 text-white p-2 rounded-3xl text-sm w-[120px]'
            || post.category==='Uncategorized'&& 'bg-yellow-300 text-white p-2 rounded-3xl text-sm w-[120px]'
            || post.category==='Thoughts'&& 'bg-red-600 text-white p-2 rounded-3xl text-sm w-[120px]'
            || post.category==='Entertainment'&& 'bg-teal-400 text-white p-2 rounded-3xl text-sm w-[120px]'}>
                {post.category}</button>
            <Link className='z-10 group-hover:bottom-0
            absolute bottom-[-200px]
            left-0 right-0
            border border-blue-800 text-blue-500
            hover:bg-green-500 hover:text-white
            transition-all duration-300
            text-center py-2 rounded-sm !rounded-tl-none m-2' to={`/post/${post.slug}`}>
                Read Article
            </Link>
        </div>
    </div>
  )
}
