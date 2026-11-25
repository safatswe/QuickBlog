import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'
import { uploadImage } from '../configs/cloudinary.js'

const makeToken = (user) =>
  jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '7d' })

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name?.trim() || !email?.trim() || !password) {
      return res.json({ success: false, message: 'Name, email and password are required' })
    }
    if (!emailPattern.test(email.trim())) {
      return res.json({ success: false, message: 'Please enter a valid email' })
    }
    if (password.length < 6) {
      return res.json({ success: false, message: 'Password must be at least 6 characters' })
    }

    const cleanEmail = email.trim().toLowerCase()

    // The admin email is reserved
    if (cleanEmail === (process.env.ADMIN_EMAIL || '').toLowerCase()) {
      return res.json({ success: false, message: 'This email is not available' })
    }

    const exists = await User.findOne({ email: cleanEmail })
    if (exists) return res.json({ success: false, message: 'This email is already registered' })

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name: name.trim(), email: cleanEmail, password: hashed })

    res.json({ success: true, token: makeToken(user), name: user.name })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.json({ success: false, message: 'Email and password are required' })
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() })
    const matches = user ? await bcrypt.compare(password, user.password) : false

    if (!matches) return res.json({ success: false, message: 'Invalid email or password' })

    res.json({ success: true, token: makeToken(user), name: user.name })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Blogs written by the logged-in user (all statuses)
export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.userId }).sort({ createdAt: -1 })
    res.json({ success: true, blogs })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// A user submits a blog: it waits for the admin to accept or reject it
export const addUserBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category } = JSON.parse(req.body.blog)
    const imageFile = req.file

    if (!title?.trim() || !description || !category || !imageFile) {
      return res.json({ success: false, message: 'Missing required fields' })
    }

    const uploaded = await uploadImage(imageFile.buffer)

    await Blog.create({
      title: title.trim(),
      subTitle,
      description,
      category,
      image: uploaded.secure_url,
      author: req.userId,
      status: 'pending',
      isPublished: false,
    })

    res.json({ success: true, message: 'Blog submitted. It will appear after the admin approves it.' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const deleteMyBlog = async (req, res) => {
  try {
    const { id } = req.body
    const blog = await Blog.findOneAndDelete({ _id: id, author: req.userId })
    if (!blog) return res.json({ success: false, message: 'Blog not found' })

    await Comment.deleteMany({ blog: id })
    res.json({ success: true, message: 'Blog deleted' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}