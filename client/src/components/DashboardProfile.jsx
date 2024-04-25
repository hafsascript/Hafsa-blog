import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signoutSuccess} from '../redux/user/userSlice.js';
import {HiOutlineExclamationCircle} from 'react-icons/hi'
export default function DashboardProfile() {
  const {currentUser, error} = useSelector(state=>state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageUploadProgress , setImageUploadProgress] = useState(null);
  const [imageUploadError , setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFileUpload, setImageFileUpload] = useState(false);
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(null);
  const [userUpdateError, setUserUpdateError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
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
    setImageFileUpload(true);
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
        setImageFileUpload(false);
      }, ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageFileUrl(downloadURL);
          setFormData({...formData, profilePicture: downloadURL})
          setImageFileUpload(false);
          
        })}
    )
  }

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
    
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setUserUpdateError(null);
    setUserUpdateSuccess(null);
    if (Object.keys(formData).length === 0){
      setUserUpdateError('No Changes Detected');
      return;
    }
    if (imageFileUpload){
      setUserUpdateError('Kindly Wait For Image To Completely Upload');
      return;
    }
    try {
      
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if(!res.ok){
        dispatch(updateFailure(data.message));
        setUserUpdateError(data.message);
      }
      else{
        dispatch(updateSuccess(data));
        setUserUpdateSuccess('User Updated Successfully');
      }
    } catch(error){
      dispatch(updateFailure(error.message));
      setUserUpdateError(error.message);
    }
  }
  const handleDeleteAccount = async()=>{
    setShowModal(false);
    try{
      dispatch(deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok){
        dispatch(deleteFailure(data.message));
      } else {
        dispatch(deleteSuccess(data));
      }
    }catch(error){
      dispatch(deleteFailure(error.message));
    }
  }

  const handleSignOut = async()=>{
    try{
      const res = await fetch('/api/user/signout',{
        method: 'POST'
      })
      const data = await res.json();
      if(!res.ok){
        console.log(data.message)
      } else {dispatch(signoutSuccess());}
    }catch(error){
      console.log(error.message)
    }
  }
  return (
    <div className='max-w-lg mx-auto p-2 w-full'>
      <h1 className='my-9 text-center text-slate-700 dark:text-white font-semibold text-4xl'>Profile</h1>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
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
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange}/>
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange}/>
        <TextInput type='password' id='password' placeholder='password' onChange={handleChange}/>
        <Button type='submit' gradientMonochrome='purple' className='mt-4'>
          Update
        </Button>
      </form>
      <div className='text-red-700 flex justify-between mt-4 mb-9'>
        <span className='cursor-pointer' onClick={()=>setShowModal(true)}>Delete Account</span>
        <span className='cursor-pointer' onClick={handleSignOut}>Sign Out</span>
      </div>
      {userUpdateSuccess &&(
        <Alert color='success' className='my-4'>
          {userUpdateSuccess}
        </Alert>
      )}
      {userUpdateError && (
        <Alert color='failure' className='my-4'>
          {userUpdateError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='my-4'>
          {error}
        </Alert>
      )}
      <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
        <Modal.Header/>
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-rose-300 mb-5 mx-auto'/>
              <h3 className='mb-5 text-lg text-rose-500'>Are you sure you want to delete this account?</h3>
              <div className='flex justify-center gap-11'>
                <Button color='failure' onClick={handleDeleteAccount}>
                  Yes, I'm Sure
                </Button>
                <Button color='dark' onClick={()=>setShowModal(false)}>
                  No, Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
      </Modal>
    </div>
  )
}


