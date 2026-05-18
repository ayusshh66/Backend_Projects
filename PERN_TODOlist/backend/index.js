import express from 'express';
import cors from 'cors'
import todoRouter from './routes/user.route.js'

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(cors())
app.use(express.json())

app.use('/todos', todoRouter)

app.listen(PORT, () => {
    return console.log(`the server is up and running at ${PORT}`)
})