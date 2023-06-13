import express from 'express'
import { addAdmin, adminLogin, getAdmin, getAdminById } from '../controller/admin-controller.js'



const adminRouter = express.Router()

adminRouter.post("/signUp", addAdmin)
adminRouter.post("/login", adminLogin )
adminRouter.get("/",getAdmin)
adminRouter.get("/:id", getAdminById)

export default adminRouter