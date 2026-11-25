import express from 'express'
import auth from '../middleware/auth.js'
import {
  adminLogin,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
  deleteCommentById,
  approveCommentById,
  approveBlogById,
  rejectBlogById,
} from '../controllers/adminController.js'

const adminRouter = express.Router()

adminRouter.post('/login', adminLogin)
adminRouter.get('/blogs', auth, getAllBlogsAdmin)
adminRouter.get('/comments', auth, getAllComments)
adminRouter.get('/dashboard', auth, getDashboard)
adminRouter.post('/delete-comment', auth, deleteCommentById)
adminRouter.post('/approve-comment', auth, approveCommentById)
adminRouter.post('/approve-blog', auth, approveBlogById)
adminRouter.post('/reject-blog', auth, rejectBlogById)

export default adminRouter