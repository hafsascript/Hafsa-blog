import React, { useEffect, useState } from 'react'
import {Button, Select, Spinner, TextInput} from 'flowbite-react'
import {useLocation, useNavigate} from 'react-router-dom'
import PostCard from '../components/PostCard.jsx';

export default function Search() {

    const [searchData, setSearchData] = useState({
        searchTerm : '',
        sort : 'desc',
        category : 'Uncategorized'
    });

    const [posts, setPosts] = useState([]);
    const [loading , setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    console.log(searchData);
    console.log(posts)
    

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');

        if (searchTermFromUrl || sortFromUrl || categoryFromUrl){
            setSearchData({
                ...searchData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl,
            })
        }

        const fetchPosts = async()=>{
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getposts?${searchQuery}`)

            if (!res.ok){
                setLoading(false)
                return
            }
            if (res.ok) {
                const data = await res.json()
                setPosts(data.posts)
                setLoading(false);

                if (data.posts.length=== 9) {
                    setShowMore(true)
                } else {
                    setShowMore(false)
                }
            }
                

        };

        fetchPosts();
    },[location.search]);

    const handleChange = (e)=>{
        if (e.target.id === 'searchTerm'){
            setSearchData({...searchData, searchTerm: e.target.value});
        }

        if (e.target.id === 'sort'){
            const order = e.target.value || 'desc';
            setSearchData({...searchData, sort:order})
        }

        if (e.target.id === 'category') {
            const category = e.target.value || 'Uncategorized';
            setSearchData({...searchData, category:category})
        }
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchData.searchTerm);
        urlParams.set('sort', searchData.sort);
        urlParams.set('category', searchData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const handleShowMore = async() =>{
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`)

        if (!res.ok) {
            return;
        }

        if (res.ok){
            const data = await res.json();
            setPosts([...posts,...data.posts]);

            if (data.posts.length ===9){
                setShowMore(true);
            } else {setShowMore(false)}
        }
    };
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='md:min-h-screen p-5 md:p-10 border-b md:border-b-0 md:border-r border-slate-500'>
            <form className='flex flex-col gap-7'
            onSubmit={handleSubmit}>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap
                    font-semibold'>Search Term:</label>
                    <TextInput placeholder='Search...'
                    id='searchTerm' type='text'
                    value={searchData.searchTerm}
                    onChange={handleChange}/>
                </div>
                <div className='flex items-center gap-2'>
                    <label className='font-semibold'>Sort:</label>
                    <Select onChange={handleChange}
                    value={searchData.sort}
                    id='sort'>
                        <option value='desc'>Latest</option>
                        <option value='asc'>Oldest</option>
                    </Select>
                </div>
                <div className='flex items-center gap-2'>
                    <label className='font-semibold'>Category:</label>
                    <Select onChange={handleChange}
                    value={searchData.category}
                    id='category'>
                        <option value="Uncategorized">Select A Category</option>
                        <option value="Science">Science</option>
                        <option value="Geography">Geography</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Tech">Tech</option>
                        <option value="Thoughts">Thoughts</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Entertainment">Entertainment</option>
                    </Select>
                </div>
                <Button type='submit'
                gradientMonochrome='pink'
                className='mt-4'>Search</Button>
            </form>
        </div>
        <div className='w-full'>
            <h1 className='text-4xl font-semibold
            sm:border-b border-slate-500
            p-5 mt-5'>Results:</h1>
            <div className='p-7 flex flex-wrap gap-3'>
                {
                    !loading && posts.length === 0 && <p
                    className='text-xl text-slate-600'>
                        No Articles
                    </p>
                }
                {
                    loading && <Spinner size='xl'/>
                }
                {
                    !loading && posts && posts.map((post)=>(
                        <PostCard key={post._id} post={post}/>
                    ))
                }
                {
                    showMore && <button onClick={handleShowMore}
                    className='text-teal-500
                    text-lg hover:underline p-7 w-full'>
                        Show More
                    </button>
                }
            </div>
        </div>
    </div>
  )
}
