import express from 'express'
import { addMovie, deletMovie, getAllMovie, getMovieById } from '../controller/movie-controller.js'


const movieRouter = express.Router()

movieRouter.get("/",getAllMovie)
movieRouter.get("/:id",getMovieById)
movieRouter.post("/",addMovie)
movieRouter.delete("/:id", deletMovie)

export default movieRouter