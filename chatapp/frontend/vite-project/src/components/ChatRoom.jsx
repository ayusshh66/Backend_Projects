import React, { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

function ChatRoom({ setUserName, userName }) {
  const socketRef = useRef(null)
  const [room, setRoom] = useState('')
  const [msg, setMsg] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socketRef.current = io('http://localhost:8000')

    socketRef.current.on('receive_message', (data) => {
      setMessages(prev => [...prev, data])
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [])

  const joinRoom = () => {
    if (room) socketRef.current.emit('join_room', room)
  }

  const sendMessage = () => {
    if (msg && room) {
      const data = { room, message: msg, sender: userName }
      socketRef.current.emit('send_message', data)
      setMessages(prev => [...prev, data])
      setMsg('')
    }
  }

  return (
    <div className='w-full h-screen bg-neutral-100 flex flex-col max-w-3xl mx-auto shadow-xl'>
      <div className='bg-neutral-400 py-4 px-4 flex gap-4 items-center justify-center'>
        <div className='font-semibold text-md'>
          Hi! <span className='text-indigo-700'>{userName}</span> enter room Id to chat
        </div>
        <input
          placeholder='Room Id'
          className='bg-neutral-200 text-neutral-600 pl-3 outline-none rounded-3xl py-1 shadow-2xl shadow-neutral-700 '
          onChange={(e) => setRoom(e.target.value)}
        />
        <button
          className='bg-neutral-600 px-4 rounded-3xl text-neutral-100 cursor-pointer py-1 -ml-15 hover:scale-105 active:scale-95 '
          onClick={joinRoom}
        >Join</button>
      </div>

      <div className='flex-1 overflow-y-auto p-4 flex flex-col gap-2'>
        {messages.map((m, i) => (
          <div key={i} className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
            m.sender === userName
              ? 'bg-blue-500 text-white self-end'
              : 'bg-white text-neutral-800 self-start shadow-sm'
          }`}>
            <p className='text-xs font-bold mb-1 opacity-70'>{m.sender}</p>
            {m.message}
          </div>
        ))}
      </div>

      <div className='bg-white border-t border-neutral-300 px-4 py-3'>
        <div className='flex gap-2'>
          <input
            placeholder='Message'
            value={msg}
            className='flex-1 bg-neutral-200 text-neutral-600 pl-4 outline-none rounded-3xl py-2'
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            className='bg-neutral-600 px-4 rounded-3xl text-neutral-100 cursor-pointer py-2 hover:scale-105 active:scale-95'
            onClick={sendMessage}
          >Send</button>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom