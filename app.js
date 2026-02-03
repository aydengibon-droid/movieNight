import express from 'express'
import { PORT } from './config.js'
import { getMovie, getMovies } from './readUtil.js'
import req from 'express/lib/request.js'
const app = express()

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
  res.send('<a href="/show"> Badness It Choose Me </a>')
})

app.get("/calc/rect/:length/:width", (req, res) => {
  let data = req.params
  res.status(200).send(`The area of a rectangle 6 ${data.length} x ${data.width} is ${data.length * data.width}`)
})

app.get("/:type", (req, res) => {
  let type = req.params.type.toLowerCase()
  if (type != "movie" && type != "series") {
    res.status(400).send({ "error": "Invalid URI" })
    return
  }
  getMovies(res, type)
})

app.get("/:type/p:page", (req, res) => {
  const pageSize = 10
  let type = req.params.type.toLowerCase()
  if (type != "movie" && type != "series") {
    res.status(400).send({ "error": "Invalid URI" })
    return
  }
  let page = parseInt(req.params.page)
  if (!page || isNaN(page) || page < 1) {
    res.status(400).send({ "error": "Invalid page number" })
    return
  }
  page = (page - 1) * pageSize
  getMovies(res, type, page)
})

app.get("/info/:id", (req, res) => {
  let movieID = req.params.id
  if (!movieID || movieID.length != 24) {
    res.status(400).send({ "error": "Invalid movie ID" })
    return
  }
  getMovie(res, movieID)
})