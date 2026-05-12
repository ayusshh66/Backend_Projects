import express from 'express'

const PORT = process.env.PORT ?? 8000;

const app = express()

app.get('/', (req,res) => {
    res.status(200).end(`everything is fine`)
})

app.listen(PORT, () => {
    console.log(`server is up and running at ${PORT}`)
})