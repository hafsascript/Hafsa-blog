import React, { useState } from 'react';
import {Alert, Button, FileInput, Select, TextInput} from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js'
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate} from 'react-router-dom';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress , setImageUploadProgress] = useState(null);
  const [imageUploadError , setImageUploadError] = useState(null);
  const [formData, setFormData] =useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
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
      const res = await fetch('/api/post/create',{
        method: 'POST',
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
      <h1 className='text-center text-5xl my-9 font-semibold'>Create A Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput onChange={(e)=>setFormData({...formData, title:e.target.value})}
          type='text'
          placeholder='Title'
          required
          id='title'
          className='flex-1 my-1'/>
          <Select onChange={(e)=> setFormData({...formData, category: e.target.value})}
          required
          >
            <option value="Uncategorized">Select A Category</option>
            <option value="Science">Science</option>
            <option value="Geography">Geography</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Tech">Tech</option>
            <option value="Thoughts">Thoughts</option>
            <option value="Netherlands">Netherlands</option>
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
         placeholder='Write Something Here...'
         className='h-72 mb-12 mt-2'
         required
         
         onChange={(value)=>{setFormData({...formData,content:value})}}/>
         <Button type='submit' gradientDuoTone='pinkToOrange' >Publish</Button>
         {publishError && (
          <Alert className='mt-6 mb-2' color='failure'>
            {publishError}
          </Alert>
         )}
      </form>
    </div>
  )
}
