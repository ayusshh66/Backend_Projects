import React from 'react'
import {useState, useEffect} from 'react'
import { io } from 'socket.io-client'


function ChatRoom({ setUserName, userName, socket }) {
  const [room, setRoom] = useState('')
  const [msg, setMsg] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages(prev => [...prev, data])
    })
    return () => socket.off("receive_message")
  }, [socket])

  const joinRoom = () => {
    if (room) socket.emit("join_room", room)
  }

  const sendMessage = () => {
    if (msg && room) {
      const data = { room, message: msg, sender: userName }
      socket.emit("send_message", data)
      setMessages(prev => [...prev, data]) // show own message
      setMsg('')
    }
  }

  return (
    <div className='w-full h-screen bg-neutral-100 flex flex-col max-w-3xl mx-auto shadow-xl'>

      {/* Header */}
      <div className='bg-neutral-400 py-4 px-4 flex gap-4 items-center'>
        <div className='font-semibold'>
          Hi! <span className='text-blue-900'>{userName}</span> enter room Id to chat
        </div>
        <input
          placeholder='Room Id'
          className='bg-neutral-200 text-neutral-600 pl-3 outline-none rounded-3xl py-1'
          onChange={(e) => setRoom(e.target.value)}
        />
        <button
          className='bg-neutral-600 px-4 rounded-3xl text-neutral-100 cursor-pointer py-1'
          onClick={joinRoom}
        >Join</button>
      </div>

      {/* Messages area */}
      <div className='flex-1 overflow-y-auto p-4 flex flex-col gap-2'>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
              m.sender === userName
                ? 'bg-blue-500 text-white self-end'
                : 'bg-white text-neutral-800 self-start'
            }`}
          >
            <p className='text-xs font-bold mb-1 opacity-70'>{m.sender}</p>
            {m.message}
          </div>
        ))}
      </div>

      {/* Message input - sticks to bottom */}
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
            className='bg-neutral-600 px-4 rounded-3xl text-neutral-100 cursor-pointer'
            onClick={sendMessage}
          >Send</button>
        </div>
      </div>

    </div>
  )
}

export default ChatRoom