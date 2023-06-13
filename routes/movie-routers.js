import express from 'express'
import { addMovie, getAllMovie, getMovieById } from '../controller/movie-controller.js'

const movieRouter = express.Router()

movieRouter.get("/",getAllMovie)
movieRouter.get("/:id",getMovieById)
movieRouter.post("/",addMovie)

export default movieRouter