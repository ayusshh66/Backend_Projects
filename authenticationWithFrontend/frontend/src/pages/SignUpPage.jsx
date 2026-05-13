import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'

function SignUpPage({setUser}) {
    const [form, setForm] = useState({
        "email" : '',
        "password" : '',
    })
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
            console.log('sending:', form)  

        try {
            const res = await axios.post('http://localhost:8000/user/signup', form)
            
            setUser(res.data)
            navigate('/')
        } catch (error) {
            console.log('error:', error)
            setError('invalid credentials')
        }
    }
  return (
    <div className='h-screen w-full flex justify-center items-center '>
        <div className='bg-neutral-300 rounded-lg  w-lg h-90 shadow-2xl shadow-neutral-800 '>
                <form className='flex flex-col items-center h-full gap-12' onSubmit={handleSubmit}>
                    <div className='flex gap-4 mt-6  text-2xl'>
                        <NavLink to='/login' className={({isActive}) => isActive?"font-bold text-black": "text-gray-500"}><div>LOGIN</div></NavLink>
                        <NavLink to = 'signup' className={({isActive}) => isActive?"font-bold text-black": "text-gray-500"}><div >SIGNUP</div></NavLink>
                    </div>
                    {error && <div className='text-red-500 mb-4'>{error}</div>}
                    <div className='flex justify-center items-center gap-10'>
                        <h1>email :</h1>
                        <input type="email" placeholder='xyz@gmail.com' className='bg-neutral-100 rounded-2xl px-4 py-2 w-70 outline-none'
                                value={form.email} onChange={(e) => setForm({...form, email : e.target.value})}/>
                    </div>
                    <div className='flex justify-center items-center gap-5'>
                        <h1>Password :</h1>
                        <input type="password" placeholder='password' className='bg-neutral-100 rounded-2xl px-4 py-2 w-70 outline-none'
                                value={form.password} onChange={(e) => setForm({...form, password : e.target.value})}/>
                    </div>
                    <button className='flex justify-center items-center bg-neutral-500 
                    w-20 h-10 px-4 py-2 rounded-lg  text-white cursor-pointer active:scale-90'>LogIn</button>
                </form>
        </div>
    </div>
  )
}

export default SignUpPage