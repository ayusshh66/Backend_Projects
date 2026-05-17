import React, { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import ChatRoom from './components/ChatRoom'
import { io } from 'socket.io-client'


const socket = io.connect('http://localhost:8000')


function App() {
  const [userName, setUserName] = useState("")


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home setUserName={setUserName}/>}/>
      <Route path='/chatroom' element={<ChatRoom setUserName={setUserName} userName={userName} socket={socket}/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App