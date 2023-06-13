import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Movie from '../models/Movie.js';
import User from "../models/User.js";


export const newBooking = async(req, res, next)=>{
    const { movie, seatNumber, date, user} = req.body;

    let existingMovie;
    let existingUser;
    try {
        existingMovie = await Movie.findById(movie)
        existingUser = await User.findById(user)
    } catch (error) {
        return console.log(error)
    }
    if(!existingMovie){
        return res.status(404).json({message: "Movie Not Found With Given ID"})
    }
    if(!existingUser){
        return res.status(404).json({message: "User Not Found With Given ID"})
    }

    let booking;
    try {
        booking = new Booking({
            movie,
            seatNumber,
            date: new Date(`${date}`),
            user
        })

        const session = await mongoose.startSession()
        session.startTransaction()
        existingUser.bookings.push(booking)
        existingMovie.bookings.push(booking)
        await existingUser.save({session})
        await existingMovie.save({session})
        await booking.save({session})
        session.commitTransaction()

    } catch (error) {
        console.log(error)
    }
    if(!booking){
        return res.status(500).json({message: "Booking Process Failed"})
    }
    return res.status(201).json({booking})
}

export const getBookById = async (req, res, next)=>{
    const id = req.params.id
    let booking;
    try {
        booking = await Booking.findById(id)
    } catch (error) {
        return console.log(error)
    }
    if(!booking){
        return res.status(400).json({message: "Booking Not Found This Id"})
    }
    return res.status(200).json({booking})
}

export const deleteBooking = async(req, res, next)=>{
    const id = req.params.id
    let booking;
   try {
    booking = await Booking.findByIdAndRemove(id).populate("user movie")
    console.log(booking)
    const session = await mongoose.startSession()
    session.startTransaction()
    await booking.user.bookings.pull(booking)
    await booking.movie.bookings.pull(booking)  
    await booking.movie.save({session})
    await booking.user.save({session})
    session.commitTransaction()


   } catch (error) {
    return console.log(error)
   }
    if(!booking){
        return res.status(400).json({message: "Booking Not Found This Id"})
    }
    return res.status(200).json({message: "Delete Success"})
}