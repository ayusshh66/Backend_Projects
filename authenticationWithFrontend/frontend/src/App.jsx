import { useState } from 'react'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Header from './components/Header'
import {BrowserRouter, Navigate, Route,Routes} from 'react-router-dom'
import axios from 'axios'
import './App.css'
import { useEffect } from 'react'
import Error from './components/Error'

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token')  //  get token
            if (!token) return setLoading(false)         // if no token, stops
            
            const res = await axios.get('http://localhost:8000/user/me', {
                headers: {
                    Authorization: `Bearer ${token}`     //  send token
                }
            })
            console.log('me response:', res.data)  // 👈 add this

            setUser(res.data)
        } catch (err) {
            localStorage.removeItem('token')
            setUser(null)
        } finally {
            setLoading(false)
        }
    }
    fetchUser()
}, [])

  if(loading){
    return <div>
      loading........
    </div>
  }


  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes >
          <Route path='/' element={<HomePage setUser={setUser} user={user} />}/>
          <Route path='/signup' element = {<SignUpPage setUser={setUser}/>}/>
          <Route path='/login' element = {user?<Navigate to='/' />:<LoginPage setUser={setUser}/>}/>
          <Route path='*' element = {<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
