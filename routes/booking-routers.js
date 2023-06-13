import express from 'express'
import { deleteBooking, getBookById, newBooking } from '../controller/booking-controller.js'
 
const bookingRouter = express.Router()

bookingRouter.post("/", newBooking)
bookingRouter.get("/:id" ,getBookById)
bookingRouter.delete("/:id", deleteBooking)

export default bookingRouter