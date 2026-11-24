import mongoose from 'mongoose'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'
import { uploadImage } from '../configs/cloudinary.js'
import { generateText } from '../configs/ai.js'

export const addBlog = async (req, res) => {
  try {
    // The frontend sends: FormData with "blog" (JSON string) and "image" (file)
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog)
    const imageFile = req.file

    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: 'Missing required fields' })
    }

    const uploaded = await uploadImage(imageFile.buffer)

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: uploaded.secure_url,
      isPublished: Boolean(isPublished),
    })

    res.json({ success: true, message: 'Blog added successfully' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 })
    res.json({ success: true, blogs })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params
    if (!mongoose.isValidObjectId(blogId)) {
      return res.json({ success: false, message: 'Blog not found' })
    }

    const blog = await Blog.findById(blogId)
    if (!blog || !blog.isPublished) {
      return res.json({ success: false, message: 'Blog not found' })
    }

    res.json({ success: true, blog })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body
    await Blog.findByIdAndDelete(id)
    await Comment.deleteMany({ blog: id })
    res.json({ success: true, message: 'Blog deleted successfully' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body
    const blog = await Blog.findById(id)
    if (!blog) return res.json({ success: false, message: 'Blog not found' })

    blog.isPublished = !blog.isPublished
    await blog.save()
    res.json({ success: true, message: 'Blog status updated' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body
    if (!blog || !name?.trim() || !content?.trim()) {
      return res.json({ success: false, message: 'Name and comment are required' })
    }

    await Comment.create({ blog, name: name.trim(), content: content.trim() })
    res.json({ success: true, message: 'Comment added for review' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body
    const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 })
    res.json({ success: true, comments })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body

    if (!prompt || !prompt.trim()) {
      return res.json({ success: false, message: 'Please enter a blog title first' })
    }
    if (prompt.length > 200) {
      return res.json({ success: false, message: 'Title is too long (max 200 characters)' })
    }

    const fullPrompt = `Write a complete, engaging blog post about: "${prompt.trim()}".

Rules:
- Output ONLY valid HTML using these tags: h2, h3, p, ul, ol, li, strong, em.
- Do NOT include html, head, body or h1 tags, and do NOT use markdown or code fences.
- Start with a short introduction paragraph, then write 3 to 4 sections, each with an h2 heading, and finish with a conclusion section.
- Around 500 words, in a friendly and clear tone.`

    let content = await generateText(fullPrompt)

    // Remove code fences if the AI added them anyway
    content = content.replace(/```html/gi, '').replace(/```/g, '').trim()

    res.json({ success: true, content })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
