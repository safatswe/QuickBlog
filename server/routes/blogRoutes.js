import express from 'express'
import auth from '../middleware/auth.js'
import anyAuth from '../middleware/anyAuth.js'
import limitAI from '../middleware/limitAI.js'
import upload from '../middleware/multer.js'
import {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById,
  togglePublish,
  addComment,
  getBlogComments,
  generateContent,
} from '../controllers/blogController.js'

const blogRouter = express.Router()

blogRouter.post('/add', auth, upload.single('image'), addBlog)
blogRouter.post('/generate', anyAuth, limitAI, generateContent)
blogRouter.get('/all', getAllBlogs)
blogRouter.get('/:blogId', getBlogById)
blogRouter.post('/delete', auth, deleteBlogById)
blogRouter.post('/toggle-publish', auth, togglePublish)
blogRouter.post('/add-comment', addComment)
blogRouter.post('/comments', getBlogComments)

export default blogRouter