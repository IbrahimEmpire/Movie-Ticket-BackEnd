import Admin from "../models/Admin.js";
import bcrypt from 'bcryptjs'
import  Jwt  from "jsonwebtoken";

export const addAdmin = async(req,res, next)=>{
    const {email, password } = req.body;
    if( !email && email.trim() && !password && password.trim()){
        res.status(422).json({message: "Invalid Inputs"})
    }
let exist;
try {
    exist = await Admin.findOne({email})
    
} catch (error) {
 return console.log(error)
}
if(exist){
  return  res.status(400).json({message:"This admin email id already exist"})
}
let admin;
const hashedPassword = bcrypt.hashSync(password)

try {
   admin = new Admin({email, password: hashedPassword})
   admin = await admin.save()
} catch (error) {
  return  console.log(error)
}
if(!admin){
    return res.status(500).json({message:"admin is not save in storage"})
}
return res.status(200).json({ admin })
}

export const adminLogin = async(req, res, next)=>{
    const { email, password } = req.body
    if(!email && email.trim() === " " && !password && password.trim() === " "){
        return res.status(500).json({message: "Input Email and Password"})
    }
    let exist;
    try {
        exist = await Admin.findOne({email})
    } catch (error) {
        console.log(error)
    }
    if(!exist){
        return res.status(500).json({message: "Admin is Not Fount"})
    }
    const isPassword = await bcrypt.compareSync(password, exist.password)
    if(!isPassword){
        res.status(400).json({message: "Invalid Password"})
    }
    const token = Jwt.sign({id:exist._id},process.env.KEY, {expiresIn: "7d"})
    
    return res.status(200).json({message: "Authentication Complete, Token Valid Only 7Days",token, id:exist._id} )
   
}

export const getAdmin = async(req, res,next)=>{
    let admin;
    try {
        admin = await Admin.find()
    } catch (error) {
        console.log(error)
    }
    if(!admin){
        return res.status(500).json({message:"Server Error"})
    }
    return res.status(200).json({admin})
}

export const getAdminById = async(req, res, next)=> {
    const id = req.params.id
    let admin;
    try {
        admin = await Admin.findById(id).populate("addMovie")
    } catch (error) {
        console.log(error)
    }
    if(!admin){
        return console.log(err)
    }
    return res.status(200).json({ admin })


}