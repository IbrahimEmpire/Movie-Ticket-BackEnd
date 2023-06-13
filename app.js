import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import userRouter from './routes/User-routers.js'
import adminRouter from './routes/admin-routers.js';
import movieRouter from './routes/movie-routers.js';
import bookingRouter from './routes/booking-routers.js';
import cors from 'cors'


const app = express()
const PORT = 5000  
dotenv.config()
app.use(express.json());
app.use(cors())

app.use("/user", userRouter)
app.use("/admin", adminRouter)
app.use("/movie", movieRouter)
app.use("/booking", bookingRouter)





mongoose.connect(`mongodb+srv://ibrahim:${process.env.MONGODB_PASSWORD}@cluster0.yavg0jv.mongodb.net/movieBooking`
).then(()=>app.listen(PORT, ()=> console.log("port is on and mongo connected ", PORT)))  
.catch((e)=> console.log(e))










   



     
