import React from 'react';
import {Button, FileInput, Select, TextInput} from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-5xl my-9 font-semibold'>Create A Post</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Title' required id='title'
          className='flex-1 my-1'/>
          <Select required>
            <option value="uncategorized">Select A Category</option>
            <option value="science">Science</option>
            <option value="geography">Geography</option>
            <option value="tech">Tech</option>
            <option value="thoughts">Thoughts</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4
         border-green-500 border-dotted p-4 mt-2'>
          <FileInput type='file' accept='image/*' required/>
          <Button type='button' gradientDuoTone='tealToLime' size='sm'>
            Upload Image
          </Button>
         </div>
         <ReactQuill theme='snow' placeholder='Write Something Here...' className='h-72 mb-12 mt-2' required/>
         <Button type='submit' gradientDuoTone='pinkToOrange' >Publish</Button>
      </form>
    </div>
  )
}
