import React, { useEffect, useState } from 'react';
import {Alert, Button, FileInput, Select, TextInput} from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js'
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate, useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress , setImageUploadProgress] = useState(null);
  const [imageUploadError , setImageUploadError] = useState(null);
  const [formData, setFormData] =useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const {postId} = useParams();
  const {currentUser} = useSelector(state=>state.user)

  useEffect(()=>{
    try{
        const fetchPost = async()=>{
            const res = await fetch(`/api/post/getposts?postId=${postId}`);
            const data = await res.json()
            if(!res.ok){
                console.log(data.message);
                setPublishError(data.message)
                return
            }
            if(res.ok){
                setPublishError(null)
                setFormData(data.posts[0])
            }}

        fetchPost();


    }catch(error){
        console.log(error.message)
    }
  },[postId])
  const handleUploadImage = async()=>{
    try{
      setImageUploadError(null)
      setImageUploadProgress(null)
      if(!file){
        setImageUploadError('Select An Image')
        return;}
        const storage = getStorage(app);
        const fileName = new Date().getTime()+'-'+file.name;
        const storageRef =ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef,file);
        uploadTask.on(
          'state_changed',
          (snapshot)=>{
            const progress = 
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageUploadProgress(progress.toFixed(0));
          },
          (error) =>{
            setImageUploadError('Image Upload Failed');
            setImageUploadProgress(null);
          },
          ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
              setImageUploadProgress(null);
              setImageUploadError(null);
              setFormData({...formData, image: downloadURL});
            })
          }
        )

      
    }catch(error){
      setImageUploadError('Image Upload Failed');
      setImageUploadProgress(null);
      
    }
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if (!res.ok){
        setPublishError(data.message);
        return;
      }
      if (res.ok){
        setPublishError(null);
        navigate(`/post/${data.slug}`)
      }
    } catch(error){
      setPublishError('Something Went Wrong');
    }
  };
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-5xl my-9 font-semibold'>Update Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput onChange={(e)=>setFormData({...formData, title:e.target.value})}
          type='text'
          placeholder='Title'
          required
          id='title'
          className='flex-1 my-1' value={formData.title}/>
          <Select value={formData.category} onChange={(e)=> setFormData({...formData, category: e.target.value})}
          required
          >
            <option value="uncategorized">Select A Category</option>
            <option value="science">Science</option>
            <option value="geography">Geography</option>
            <option value="tech">Tech</option>
            <option value="thoughts">Thoughts</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4
         border-green-500 border-dotted p-4 mt-2'>
          <FileInput onChange={(e)=>setFile(e.target.files[0])} type='file' accept='image/*' required/>
          <Button onClick={handleUploadImage} type='button' gradientDuoTone='tealToLime' size='sm' disabled={imageUploadProgress}>
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                value={imageUploadProgress}
                text={`${imageUploadProgress || 0}%`}/>
              </div>
            ) : 'Upload Image'}
          </Button>
         </div>
         {imageUploadError && (
          <Alert color='failure'>
            {imageUploadError}
          </Alert>
         )}
         {formData.image && (
          <img
          src={formData.image}
          alt='picture'
          className='w-full h-80 object-cover'/>
         )}
         <ReactQuill
         theme='snow'
         value={formData.content}
         placeholder='Write Something Here...'
         className='h-72 mb-12 mt-2'
         required
         
         onChange={(value)=>{setFormData({...formData,content:value})}}/>
         <Button type='submit' gradientDuoTone='purpleToPink' >Update</Button>
         {publishError && (
          <Alert className='mt-6 mb-2' color='failure'>
            {publishError}
          </Alert>
         )}
      </form>
    </div>
  )
}
