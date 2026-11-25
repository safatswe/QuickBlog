import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    isPublished: { type: Boolean, default: false },

    // Who wrote it: a user, or null when the admin wrote it
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

    // pending = waiting for admin, approved = accepted, rejected = declined
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
    rejectionReason: { type: String, default: '' },
  },
  { timestamps: true }
)

const Blog = mongoose.model('Blog', blogSchema)
export default Blog