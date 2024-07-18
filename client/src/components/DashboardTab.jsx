import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiUsers} from 'react-icons/hi'
import {Button, Table} from 'flowbite-react'
import {Link} from 'react-router-dom'

export default function DashboardTab() {

    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const {currentUser} = useSelector((state)=>state.user);

    useEffect(()=>{
        const fetchUsers = async()=>{
            try{
                const res = await fetch('/api/user/getusers?limit=5')
                const data = await res.json()

                if(res.ok){
                    setUsers(data.users)
                    setTotalUsers(data.totalUsers)
                    setLastMonthUsers(data.lastMonthUsers)
                }
            }catch(error){
                console.log(error.message)
            }
        };
        const fetchPosts = async()=>{
            try{
                const res = await fetch('/api/post/getposts?limit=5')
                const data = await res.json()

                if(res.ok){
                    setPosts(data.posts)
                    setTotalPosts(data.totalPosts)
                    setLastMonthPosts(data.lastMonthPosts)
                }
            }catch(error){
                console.log(error.message)
            }
        };
        const fetchComments = async()=>{
            try{
                const res = await fetch('/api/comment/getAllComments?limit=5')
                const data = await res.json()

                if(res.ok){
                    setComments(data.comments)
                    setTotalComments(data.totalComments)
                    setLastMonthComments(data.lastMonthComments)
                }
            }catch(error){
                console.log(error.message)
            }
        };

        if (currentUser.isAdmin){
            fetchUsers()
            fetchPosts()
            fetchComments()
        }
    },
    [currentUser])
  return (
    <div className='p-3 md:mx-auto'>
        <div className='flex-wrap flex gap-4 justify-center'>
            <div className='flex flex-col p-3 dark:bg-slate-600 gap-4 md:w-72 w-full
            rounded-md shadow-md'>
                <div className='flex justify-between'>
                    <div>
                        <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
                        <p className='text-2xl'>{totalUsers}</p>
                    
                    </div>
                    <HiUsers className='bg-teal-500 text-white
                        rounded-full text-5xl p-2 shadow-lg'/>
                </div>
                <div className='flex gap-2 text-sm'>
                    <span className={lastMonthUsers === 0 ? 'text-red-500 flex items-center' : 'text-green-500 flex items-center'}>
                        <HiArrowNarrowUp className={lastMonthUsers === 0 ? 'hidden' : 'block'}/>
                        {lastMonthUsers}
                    </span>
                    <div className='text-slate-500'>
                        Last Month
                    </div>
                </div>
            </div>
            <div className='flex flex-col p-3 dark:bg-slate-600 gap-4 md:w-72 w-full
            rounded-md shadow-md'>
                <div className='flex justify-between'>
                    <div>
                        <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
                        <p className='text-2xl'>{totalPosts}</p>
                    
                    </div>
                    <HiDocumentText className='bg-pink-500 text-white
                        rounded-full text-5xl p-2 shadow-lg'/>
                </div>
                <div className='flex gap-2 text-sm'>
                    <span className={lastMonthPosts === 0 ? 'text-red-500 flex items-center' : 'text-green-500 flex items-center'}>
                        <HiArrowNarrowUp classname={lastMonthPosts === 0 ? 'hidden' : 'block'}/>
                        {lastMonthPosts}
                    </span>
                    <div className='text-slate-500'>
                        Last Month
                    </div>
                </div>
            </div>
            <div className='flex flex-col p-3 dark:bg-slate-600 gap-4 md:w-72 w-full
            rounded-md shadow-md'>
                <div className='flex justify-between'>
                    <div>
                        <h3 className='text-gray-500 text-md uppercase'>Total Comments</h3>
                        <p className='text-2xl'>{totalComments}</p>
                    
                    </div>
                    <HiAnnotation className='bg-amber-500 text-white
                        rounded-full text-5xl p-2 shadow-lg'/>
                </div>
                <div className='flex gap-2 text-sm'>
                    <span className={lastMonthComments === 0 ? 'text-red-500 flex items-center' : 'text-green-500 flex items-center'}>
                        <HiArrowNarrowUp className={lastMonthComments === 0 ? 'hidden' : 'block'}/>
                        {lastMonthComments}
                    </span>
                    <div className='text-slate-500'>
                        Last Month
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
            <div className='flex flex-col w-full md:w-auto shadow-md
            p-2 rounded-md dark:bg-slate-700'>
                <div className='flex justify-between p-3 text-sm font-semibold items-center'>
                    <h1 className='text-center p-2'>Recent Users</h1>
                    <Button outline gradientDuoTone='greenToBlue'>
                        <Link to={'/dashboard?tab=users'}>See All</Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>User Profile</Table.HeadCell>
                        <Table.HeadCell>Username</Table.HeadCell>
                    </Table.Head>
                    {users && users.map((user)=>(
                        <Table.Body key={user._id} className='divide-y'>
                            <Table.Row className='bg-white dark:border-slate-600
                            dark:bg-slate-700'>
                                <Table.Cell>
                                    <img src={user.profilePicture}
                                    alt='user'
                                    className='w-10 h-10 rounded-full bg-slate-500'/>
                                </Table.Cell>
                                <Table.Cell>{user.username}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table>
            </div>
            <div className='flex flex-col w-full md:w-auto shadow-md
            p-2 rounded-md dark:bg-slate-700'>
                <div className='flex justify-between p-3 text-sm font-semibold items-center'>
                    <h1 className='text-center p-2'>Recent Comments</h1>
                    <Button outline gradientDuoTone='greenToBlue'>
                        <Link to={'/dashboard?tab=comments'}>See All</Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Comment</Table.HeadCell>
                        <Table.HeadCell>Likes</Table.HeadCell>
                    </Table.Head>
                    {comments && comments.map((comment)=>(
                        <Table.Body key={comment._id} className='divide-y'>
                            <Table.Row className='bg-white dark:border-slate-600
                            dark:bg-slate-700'>
                                <Table.Cell className='w-96'>
                                    <p className='line-clamp-2'>{comment.content}</p>
                                </Table.Cell>
                                <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table>
            </div>
            <div className='flex flex-col w-full md:w-auto shadow-md
            p-2 rounded-md dark:bg-slate-700'>
                <div className='flex justify-between p-3 text-sm font-semibold items-center'>
                    <h1 className='text-center p-2'>Recent Posts</h1>
                    <Button outline gradientDuoTone='greenToBlue'>
                        <Link to={'/dashboard?tab=posts'}>See All</Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Post Image</Table.HeadCell>
                        <Table.HeadCell>Post Title</Table.HeadCell>
                        <Table.HeadCell>Post Category</Table.HeadCell>
                    </Table.Head>
                    {posts && posts.map((post)=>(
                        <Table.Body key={post._id} className='divide-y'>
                            <Table.Row className='bg-white dark:border-slate-600
                            dark:bg-slate-700'>
                                <Table.Cell>
                                    <img src={post.image}
                                    alt='user'
                                    className='w-10 h-10 rounded-full bg-slate-500'/>
                                </Table.Cell>
                                <Table.Cell className='w-96'><p className='line-clamp-4'>{post.title}</p></Table.Cell>
                                <Table.Cell className='w-48'>{post.category}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table>
            </div>
        </div>
    </div>
  )
}
