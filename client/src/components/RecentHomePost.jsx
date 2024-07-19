import React from 'react'
import { Link } from 'react-router-dom'

export default function RecentHomePost({post}) {
  return (
    <div>
      <div className='flex flex-col sm:flex-row gap-1'>
        <div className=''>
          <img className=' px-6 h-64 w-96 object-cover 'src={post.image}></img>
        </div>
        <div className=' flex flex-col px-6 p-3 sm:p-6 gap-4'>
          <div className='flex flex-row gap-7'>
            <p className='text-slate-500 text-sm'>{new Date(post.createdAt).toLocaleDateString()}</p>
            <p className={post.category==='Tech'&& 'text-blue-500 text-sm'
            || post.category==='Travel'&& 'text-pink-500 text-sm'
            || post.category==='Food'&& 'text-purple-500 text-sm'
            || post.category==='Science'&& 'text-green-500 text-sm'
            || post.category==='Geography'&& 'text-orange-500 text-sm'
            || post.category==='Netherlands'&& 'text-rose-500 text-sm'
            || post.category==='Thoughts'&& 'text-red-600 text-sm'
            || post.category==='Entertainment'&& 'text-teal-400 text-sm'
            || post.category==='Uncategorized'&& 'text-yellow-500 text-sm'}>{post.category}</p>
          </div>
          <div className='font-bold dark:text-white'>
            {post.title}
          </div>
          <div className='max-w-2xl dark:text-gray-500 mx-auto w-full post-content line-clamp-3 '
        dangerouslySetInnerHTML={{__html : post && post.content}}>

        </div>
        <Link to={`/post/${post.slug}`}>
          <div className='text-sm dark:bg-slate-800 bg-slate-100 py-1 px-2 shadow-emerald-300 shadow-md w-[100px] text-center'>Read More...</div>
        </Link>
        </div>
      </div>
    </div>
  )
}
