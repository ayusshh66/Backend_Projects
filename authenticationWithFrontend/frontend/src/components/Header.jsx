import axios from 'axios'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Header() {
    
  return (
    <div>
        <div className='w-full  bg-transparent  text-white flex justify-center font-medium items-center h-12 rounded-b-xl 
         '>
            <NavLink to='/'><div className='text-shadow-md text-shadow-blue-300 text-5xl text-neutral-100'>ICEMAN AUTH</div></NavLink>
        </div>

    </div>
  )
}

export default Header

{/* <div> {user?
                (<NavLink><button onClick={handleLogOut}>LogOut</button></NavLink>):
                (<>
                    <NavLink to='/login'>LogIn</NavLink>
                    <NavLink to='/signup'>SignUp</NavLink> 
                </>
                )}</div> */}
