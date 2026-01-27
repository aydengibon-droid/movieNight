import express from 'express'
import { PORT } from './config.js'
import { getMovies } from './readUtil.js'
const app = express()

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
  res.send('<a href="/show"> Badness It Choose Me </a>')
})

app.get("/show", (req, res) => {
  res.send({ "msg": "This is for shows" })
})

app.get("/calc/rect/:length/:width", (req, res) => {
  let data = req.params
  res.status(200).send(`The area of a rectangle 6 ${data.length} x ${data.width} is ${data.length * data.width}`)
})

app.get("/movies", (req, res) => {
  getMovies(res)
})