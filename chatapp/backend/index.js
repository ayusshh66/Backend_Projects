import express from 'express';
import { createServer } from 'node:http';
import {Server}   from 'socket.io'
import cors from 'cors'

const app = express();
const server = createServer(app);
app.use(cors())
const io = new Server(server, {
    cors : {
        origin : 'http://localhost:5173',
        methods : ["GET", "POST"],
    },
})

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on("join_room", (data) => {   
    socket.join(data);
    console.log(`joined room: ${data}`)

    
  })

  socket.on("send_message", (data) => {  
    socket.to(data.room).emit('receive_message', data);
  })

})

app.get('/', async (req,res) =>{
    res.status(200).json(`the server is ready`)
})

server.listen(8000, () => {
    console.log(`the server is up and running at ${8000} `);
});