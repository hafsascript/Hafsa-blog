import React from 'react'
import {Link} from 'react-router-dom'

export default function EditorAndPopularPost({post}) {
  return (
    <div className='border-b border-slate-400'>
        <div className='mt-7 mb-3 gap-3 flex flex-col'>
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
            <div className='flex flex-row gap-3 items-center'>
                <img className='w-10 h-10 rounded-full' src={post.image}></img>
                <Link
                    to={`/post/${post.slug}`}
                    className='font-semibold text-blue-900 dark:text-teal-500 hover:underline text-sm'>
                        {post.title}
                </Link>
            </div>
            <div className='max-w-lg post-content line-clamp-1 text-sm'
                dangerouslySetInnerHTML={{__html : post && post.content}}>

            </div>
            <p className='text-xs text-slate-500'>{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
    </div>
  )
}
