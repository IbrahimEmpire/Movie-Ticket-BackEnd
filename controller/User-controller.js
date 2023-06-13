
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'

export const getAllUsers = async (req, res, next)=>{
   let users;
    try {
       users = await User.find()
     
    } catch (err) {
        return next(err) 
    }
    if(!users){
        return res.status(500).json({message: "Unexpected Error Occured"})
    }
    return res.status(200).json({ users })
   
}

export const signUp = async (req, res, next )=>{
    const { name, email, password} = req.body;
    if(!name && name.trim() && !email && email.trim() && !password && password.trim()){
        res.status(422).json({message: "Invalid Inputs"})
    }
    const hashedPassword = bcrypt.hashSync(password)
    let user;
    try {
        user = new User({name, email, password:hashedPassword})
        user = await user.save()
    } catch (err) {
        return next(err)
    }
    if(!user){
        return res.status(500).json({message: "Unexpected Error Occured"})
    }
    return res.status(201).json({ id: user._id })
}

export const updateUser = async(req, res, next)=>{
    const id = req.params.id
    const { name, email, password} = req.body;
    if(!name && name.trim() && 
    !email && email.trim() && 
    !password && password.trim()){
        res.status(422).json({message: "Invalid Inputs"})
    }
    const hashedPassword = bcrypt.hashSync(password)
    let user;
    try {
        user = await User.findByIdAndUpdate(id, {name, email, password: hashedPassword})
        
    } catch (error) {
        return console.log(error)
    }
    if(!user){
        return res.status(500).json({message: "Update Error Occured"})
    }
    return res.status(201).json({message: "user update succesfull"})
}

export const deleteUser = async(req, res, next)=>{
    const id = req.params.id
    let user;
    try {
        user = await User.findByIdAndRemove(id)
    } catch (error) {
        console.log(error)
        
    }
    if(!user){
       return res.status(500).json({message: "UserId Not Fount"})
    }
    return res.status(200).json({message:"userId deleted succsess"})
}

export const userLogin = async(req, res, next)=>{
    const { email, password} = req.body;
    if( !email && email.trim() && !password && password.trim()){
        res.status(422).json({message: "Invalid Inputs"})
    }
    let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (error) {
        console.log(error)
    }
    if(!existingUser){
        return res.status(404).json({message:"User Not found"})
    }
    const isPassword = await bcrypt.compareSync(password, existingUser.password)
    if(!isPassword){
      return res.status(400).json({message:"invalid password"})
    }
    return res.status(200).json({message:"login successfull", id: existingUser._id })
}

export const getBookingsOfUser = async(req, res, next)=>{
    const id = req.params.id
    let booking;
     try {
        booking = await Booking.find({user: id})
        .populate("movie")
        .populate("user")
     } catch (error) {
        return console.log(error)
     }
     if(!booking){
        return res.status(500).json({message: "Unable To Get Booking"})
     }
     return res.status(200).json({ booking })
}

export const getUserById = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
      user = await User.findById(id);
    } catch (err) {
      return console.log(err);
    }
    if (!user) {
      return res.status(500).json({ message: "Unexpected Error Occured" });
    }
    return res.status(200).json({ user });
}