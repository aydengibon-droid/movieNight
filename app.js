import express from 'express'
import { PORT } from './config.js'

const app = express()

app.get('/', (req, res) => {
  res.send('<a href="/show"> Badness It Choose Me </a>')
})

app.get("/show", (req,res)=>{
    res.send({"msg":"This is for shows"})
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})