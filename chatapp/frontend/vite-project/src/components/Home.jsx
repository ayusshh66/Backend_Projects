import React, { useState,  } from 'react'
import { useNavigate } from 'react-router-dom'


function Home({setUserName}) {
   const navigate = useNavigate()

   const redirectChatRoom = () => {
    return navigate('/chatroom')
   }
  return (
    <div className='body w-full h-full selection:bg-neutral-300'>  
        <div className='container flex justify-center items-center h-screen'>
          <div className='card w-xl mx-auto h-70 bg-neutral-300 rounded-2xl shadow-lg shadow-neutral-400'>
              <div className='flex flex-row justify-center items-center h-full'>
                <div className='bg-neutral-100 h-12 rounded-3xl text-black shadow-xs flex '>
                  <input placeholder='Enter User Name' className='outline-none text-neutral-600 text-lg px-4' onChange={(e) => setUserName(e.target.value)}/>
                  <button className='bg-neutral-600 px-4 rounded-3xl text-neutral-100 cursor-pointer hover:scale-105 active:scale-95' onClick={redirectChatRoom}>Join</button>
                </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Home