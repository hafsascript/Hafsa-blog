import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashboardProfile() {
  const {currentUser} = useSelector(state=>state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageUploadProgress , setImageUploadProgress] = useState(null);
  const [imageUploadError , setImageUploadError] = useState(null);
  const filePickerRef = useRef();
  const handleImageUpload = (e)=>{
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  }
  useEffect(()=>{
    if(imageFile){
      uploadImage()
    }
  }, [imageFile])
  const uploadImage = async ()=>{
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      }, (error)=>{
        setImageUploadError('Something Went Wrong ... Note That Image Must Be Less Than 2MB');
        setImageUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      }, ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageFileUrl(downloadURL);
        })}
    )
  }

  return (
    <div className='max-w-lg mx-auto p-2 w-full'>
      <h1 className='my-9 text-center text-slate-700 dark:text-white font-semibold text-4xl'>Profile</h1>
      <form className='flex flex-col gap-5'>
        <input type='file' accept='image/*' onChange={handleImageUpload} ref={filePickerRef} hidden/>
        <div className='relative w-40 h-40 self-center cursor-pointer my-1'
        onClick={()=>filePickerRef.current.click()}> 
        {imageUploadProgress && (
          <CircularProgressbar value={imageUploadProgress || 0} text={`${imageUploadProgress}%`}
          strokeWidth={5}
          styles={{
            root:{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            },
            path: {
              stroke: `rgba(57,155,215, ${imageUploadProgress/100})`
            }
          }} />
        )}
          <img src={imageFileUrl || currentUser.profilePicture} alt="Picture"
          className={`rounded-full w-full h-full border-8 border-[#9ae7bd] object-cover
          ${imageUploadProgress && imageUploadProgress < 100 && 'opacity-60'}`}/>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placeholder='password'/>
        <Button type='submit' gradientMonochrome='purple' className='mt-4'>
          Update
        </Button>
      </form>
      <div className='text-red-700 flex justify-between mt-4 mb-9'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
