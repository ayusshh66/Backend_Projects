import { useState } from 'react'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Header from './components/Header'
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import axios from 'axios'
import './App.css'
import { useEffect } from 'react'

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:8000/user/me');

        setUser(res.data);
      } catch (err) {
        setUser(null)
      }finally{
        setLoading(false)
      }
    }
    fetchUser()
  },[])

  if(loading){
    return <div>
      loading........
    </div>
  }


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signup' element = {<SignUpPage/>}/>
          <Route path='/login' element = {<LoginPage setUser={setUser}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
