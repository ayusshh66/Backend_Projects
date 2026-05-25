import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'

function LoginPage({ setUser }) {
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            setError('please fill all fields')
            return
        }

        try {
            const res = await axios.post('http://localhost:8000/user/login', form)

            console.log('login response:', res.data)

            localStorage.setItem('token', res.data.data.token)

            setUser(res.data.data.user)
            navigate('/')
        } catch (error) {
            console.log('error:', error)
            setError('invalid credentials')
        }
    }

    return (
        <motion.div
            className='h-screen w-full flex justify-center items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className='bg-neutral-300 rounded-lg w-lg shadow-2xl shadow-neutral-800 flex flex-col items-center gap-10 p-5'
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className='flex gap-4 mt-6 text-2xl'>
                    <NavLink
                        to='/login'
                        className={({ isActive }) =>
                            isActive
                                ? "font-bold text-black"
                                : "text-gray-500"
                        }
                    >
                        LOGIN
                    </NavLink>

                    <NavLink
                        to='/signup'
                        className={({ isActive }) =>
                            isActive
                                ? "font-bold text-black"
                                : "text-gray-500"
                        }
                    >
                        SIGNUP
                    </NavLink>
                </div>

                <form
                    className='flex flex-col items-center h-full gap-12'
                    onSubmit={handleSubmit}
                >

                    {error && (
                        <motion.div
                            className='text-red-500'
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {error}
                        </motion.div>
                    )}

                    <div className='flex justify-center items-center gap-10'>
                        <h1>email :</h1>

                        <motion.input
                            whileFocus={{ scale: 1.03 }}
                            type="email"
                            placeholder='xyz@gmail.com'
                            className='bg-neutral-100 rounded-2xl px-4 py-2 w-70 outline-none'
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className='flex justify-center items-center gap-5'>
                        <h1>Password :</h1>

                        <motion.input
                            whileFocus={{ scale: 1.03 }}
                            type="password"
                            placeholder='password'
                            className='bg-neutral-100 rounded-2xl px-4 py-2 w-70 outline-none'
                            value={form.password}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password: e.target.value
                                })
                            }
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        transition={{
                            type: "spring",
                            stiffness: 300
                        }}
                        className='flex justify-center items-center bg-neutral-500 
                        w-20 h-10 px-4 py-2 rounded-lg text-white cursor-pointer'
                    >
                        LogIn
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    )
}

export default LoginPage