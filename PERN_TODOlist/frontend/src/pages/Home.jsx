import React from 'react'
import { useNavigate } from 'react-router-dom'


function Home({setUser,user}) {
    const navigate = useNavigate();

    const redirectTodo = () => {
        return navigate('/todo')
    }
    
  return (
    <>
        <div className='body w-full h-full bg-gradient-to-b from-white via-pink-200 to-pink-100 selection:bg-pink-200'>
            <div className='flex justify-center items-center h-screen w-xl mx-auto'>
                <div className='container bg-pink-300 h-90 rounded-2xl shadow-2xl flex flex-col justify-center items-center gap-6 '>
                    <div className='font-semibold text-xl text-pink-600'>Enter Your Name</div>
                    <input type='text' placeholder='eg-Joel' className='h-10 w-sm bg-pink-100 rounded-lg p-4 text-neutral-600 outline-none border-1 border-pink-500'/>
                    <button onClick={redirectTodo}  className='bg-pink-600 px-4 py-2 rounded-lg felex justify-center items-center text-pink-50 shadow-2xl shadow-pink-500 cursor-pointer hover:scale-105 active:scale-95'>Make Todo</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home