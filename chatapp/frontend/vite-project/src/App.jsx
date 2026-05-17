import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ChatRoom from './components/ChatRoom'

function App() {
  const [userName, setUserName] = useState('')

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home setUserName={setUserName} />} />
        <Route path='/chatroom' element={
          <ChatRoom userName={userName} setUserName={setUserName} />
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App