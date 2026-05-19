import express from 'express';
import cors from 'cors'
import todoRouter from './routes/user.route.js'

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true,
}))

app.use(express.json())

app.use('/todos', todoRouter)

app.listen(PORT, () => {
    return console.log(`the server is up and running at ${PORT}`)
})