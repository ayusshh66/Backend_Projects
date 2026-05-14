import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function HomePage({setUser, user}) {
  console.log(user)

  const navigate = useNavigate()

  const handleLogout = async () => {
    const res = await axios.post('http://localhost:8000/user/logout')
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }

  return (
    <>
    <div className='max-w-xl  mx-auto h-120 mt-55'>
      <div className=' flex flex-col items-center gap-10 bg-blue-100 h-70 rounded-2xl shadow-2xl shadow-blue-400 '>
        
          {user?(<div className='flex flex-col justify-center items-center gap-8 p-20'>
            <div className='text-5xl font-semibold bg-gradient-to-l from-blue-400 via-blue-500 to-blue-400  bg-clip-text text-transparent'>
          WELCOME, {user.name}
          <div className=' text-xl flex justify-center mt-10'>
           {user.email}  
          </div>
            </div>
            <NavLink to='/' className='hover:scale-110 delay-100 active:scale-95 bg-blue-400 shadow-md text-shadow-md shadow-blue-200 w-20 h-8 rounded-lg px-4 py-2 flex justify-center items-center text-neutral-100 font-semibold' onClick={handleLogout}>LogOut</NavLink>
          </div>):(
            <>
              <div className='flex flex-col gap-8 justify-center items-center p-20'>
                <div className='text-5xl font-semibold bg-gradient-to-l from-blue-400 via-blue-500 to-blue-400  bg-clip-text text-transparent'>
          Please Enter  </div>
                <div className='flex gap-10'>
                  <NavLink to='/login' className='hover:scale-110 delay-100 active:scale-95 bg-blue-400 shadow-md text-shadow-md shadow-blue-200 w-20 h-8 rounded-lg px-4 py-2 flex justify-center items-center text-neutral-100 font-semibold'>
                LogIn
              </NavLink >
              <NavLink to='/signup' className=' hover:scale-110 delay-100 active:scale-95 bg-blue-400 shadow-md text-shadow-md shadow-blue-200 w-20 h-8 rounded-lg px-4 py-2 flex justify-center items-center text-neutral-100 font-semibold'>
                SignUp
              </NavLink>
                </div>
              </div>
            </>
          )}
      </div>
    </div>
    </>
                
  )
}

export default HomePage