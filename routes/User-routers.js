import express from "express"
import { deleteUser, getAllUsers, getBookingsOfUser, getUserById, signUp, updateUser, userLogin } from "../controller/User-controller.js"
import User from "../models/User.js"
const userRouter = express.Router()

userRouter.get("/", getAllUsers)
userRouter.get("/:id", getUserById)
userRouter.post("/signUp", signUp)
userRouter.put("/:id",updateUser)
userRouter.delete("/:id", deleteUser)
userRouter.post("/login", userLogin)
userRouter.get("/bookings/:id", getBookingsOfUser)


export default userRouter; 