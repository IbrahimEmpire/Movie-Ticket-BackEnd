import mongoose from "mongoose";

const shcema = mongoose.Schema

const userSchema = new shcema({
    name: {
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    }, 
    password:{
        type:String,
        require: true,
        minLength: 6
    },
    bookings:[{
        type: mongoose.Types.ObjectId,
        ref:"Movie"
    }]
})

export default mongoose.model("User", userSchema)