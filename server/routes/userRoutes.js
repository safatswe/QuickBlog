import express from 'express'
import userAuth from '../middleware/userAuth.js'
import upload from '../middleware/multer.js'
import {
  registerUser,
  loginUser,
  getMyBlogs,
  addUserBlog,
  deleteMyBlog,
} from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/blogs', userAuth, getMyBlogs)
userRouter.post('/blogs/add', userAuth, upload.single('image'), addUserBlog)
userRouter.post('/blogs/delete', userAuth, deleteMyBlog)

export default userRouter