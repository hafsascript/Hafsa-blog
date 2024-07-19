import React from 'react'

export default function About() {
  return (
    <div className='min-h-screen flex flex-col justify-center'>
      <div className='max-w-3xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-9xl text-emerald-500 font font-semibold text-center mt-2 mb-14'>
            Hafsa Blog
          </h1>
          <div className='text-xl text-gray-500 flex flex-col gap-10 mb-2 sm:mb-0'>
            <p>
              Welcome to the World Of Intriguing Insights! Read the articles and stay up to date with what is latest whilst also exploring all that entails our universe 
            </p>

            <p>
              Only Interested In Geography or Only Interested in Science or Wanna soak in ALL the information you can get? Don't Worry ... We got you covered. You can use our very modern search page to get you exactly what you want and it is only a matter of ... say 2 clicks? Well go find out
            </p>

            <p>
              SO GRAB SOME POPCORNS! TURN ON THE AC! DIM THE LIGHTS! ANDDD it is BINGE-READING time
            </p>
            
          </div>
        </div>
      </div>
      <div className='p-4 mx-auto mb-7'>
        <h1 className='text-blue-800 font-semibold text-3xl mt-2 mb-5'>Terms & Conditions:</h1>
        <div >
          <p className='my-2'>1- Enjoy</p>
          <p className='my-2'>2- Don't Spam</p>
        </div>
      </div>
    </div>
  )
}
