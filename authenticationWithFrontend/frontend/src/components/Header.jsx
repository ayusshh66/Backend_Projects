import axios from 'axios'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Header({user, setUser}) {
    const navigate = useNavigate();
    const handleLogOut = async () => {
        const res = await axios.post('http://localhost:8000/user/logout')
        localStorage.removeItem('token')
        setUser(null);
        navigate('/')
    }
  return (
    <div>
        <div className='wi-full bg-neutral-500 flex justify-between'>
            <div>PERN AUTH</div>
            {user?
            (<NavLink><button onClick={handleLogOut}>LogOut</button></NavLink>):
            (<>
                <NavLink to='/login'>LogIn</NavLink>
                <NavLink to='/signup'>SignUp</NavLink> 
            </>
            )}
        </div>
    </div>
  )
}

export default Header