
//routes/index.js
import express from "express";
import authRoutes from '../routes/auth/auth.js'
import userRoutes from '../routes/user/user.js'
const router = express.Router()

router.use('/auth',authRoutes)
router.use('/users',userRoutes)


export default router

