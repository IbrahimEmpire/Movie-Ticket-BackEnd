import jwt from 'jsonwebtoken'
import Movie from '../models/Movie.js';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

export const addMovie = async(req, res, next)=>{
    const extractedToken = req.headers.authorization.split(" ")[1];
    if(!extractedToken && extractedToken.trim() === ""){
        return res.status(404).json({message: "Token Not Found"})
    }
   let adminId;
   jwt.verify(extractedToken, process.env.KEY, (err, decrypted)=>{
    if(err){
        return res.status(400).json({message:`${err.message}`})
    }else{
    adminId = decrypted.id
    return;
}
   })

//    create Movie
const { title, description, releaseDate, posterUrl, featured, actors} = req.body;
if(!title && title.trim() === " " && !description && description.trim() === " " && !posterUrl && posterUrl.trim() === " "){
    return res.status(400).json({message: "Invalid Inputs"})
}
let movie;
try {
    movie = new Movie({title, description, 
        admin: adminId,
    releaseDate: new Date(`${releaseDate}`),
    posterUrl,
    featured,
    actors,
    
    })
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction()
    await movie.save({session})
    adminUser.addMovie.push(movie)
    await adminUser.save({ session })
    await session.commitTransaction()
   
   
    
} catch (error) {
    console.log(error)
}
if(!movie){
   return res.status(400).json({messagea:"Movie Not Save"})
}
return res.status(200).json({movie})
}

export const getAllMovie = async(req, res, next)=>{
    let movies;
    try {
        movies = await Movie.find()
    } catch (error) {
        console.log(error)
    }
    if(!movies){
        return res.status(500).json({message: "Request Failed, Movie is not fount"})
    }
    return res.status(200).json({movies})
}

export const getMovieById = async(req, res, next)=>{
     const id = req.params.id
     let movie;
     try {
        movie = await Movie.findById(id)
     } catch (error) {
        console.log(error)
     }
     if(!movie){
        return res.status(500).json({message: "Ivalid Movie Id"})
     }
     return res.status(200).json({movie })
}

export const deletMovie = async(req, res, next)=>{
    const id = req.params.id
    let user;
    try {
        user = await Movie.findByIdAndRemove(id)
    } catch (error) {
        console.log(error)
        
    }
    if(!user){
       return res.status(500).json({message: "movie Not Fount"})
    }
    return res.status(200).json({message:"movie deleted succsess"})
}