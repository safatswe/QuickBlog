import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Quill from 'quill'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets, blogCategories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const WriteBlog = () => {
  const { axios } = useAppContext()
  const navigate = useNavigate()

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(false)
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [category, setCategory] = useState('Technology')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  // "All" is only a filter on the home page, not a real category
  const categories = blogCategories.filter((item) => item !== 'All')

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!image) return toast.error('Please upload a thumbnail')
    if (!title.trim()) return toast.error('Please enter a blog title')
    if (!quillRef.current.getText().trim()) return toast.error('Please write the blog description')

    try {
      setIsSubmitting(true)

      const blog = {
        title: title.trim(),
        subTitle: subTitle.trim(),
        description: quillRef.current.root.innerHTML,
        category,
      }

      const formData = new FormData()
      formData.append('blog', JSON.stringify(blog))
      formData.append('image', image)

      const { data } = await axios.post('/api/user/blogs/add', formData)

      if (data.success) {
        toast.success(data.message)
        navigate('/my-blogs')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const GenerateContent = async () => {
    if (!title.trim()) return toast.error('Enter a blog title first')

    const hasText = quillRef.current.getText().trim().length > 0
    if (hasText && !window.confirm('Replace the current text with AI-generated content?')) return

    try {
      setIsGenerating(true)
      const { data } = await axios.post('/api/blog/generate', { prompt: title.trim() })

      if (data.success) {
        quillRef.current.clipboard.dangerouslyPasteHTML(data.content)
        toast.success('Blog content generated')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write your blog here...',
      })
    }
  }, [])

  return (
    <>
      <Navbar />

      <form onSubmit={onSubmitHandler} className="text-gray-600 mx-4 sm:mx-auto max-w-3xl mb-24">

        <div className="bg-white shadow rounded-lg p-6 mt-4">

          <h1 className="text-2xl font-semibold text-gray-700 mb-1">Write a blog</h1>
          <p className="text-sm text-gray-500 mb-6">
            The admin reviews every blog before it appears on the site. You can follow its status in My Blogs.
          </p>

          {/* Upload Thumbnail */}
          <p>Upload Thumbnail</p>

          <label
            htmlFor="image"
            className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer mt-2"
          >
            <img
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              alt="upload"
              className="mt-2 h-16 rounded cursor-pointer"
            />

            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
            />
          </label>

          {/* Blog Title */}
          <p className="mt-4">Blog Title</p>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />

          {/* Blog Subtitle */}
          <p className="mt-4">Blog Subtitle</p>

          <input
            type="text"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />

          {/* Category */}
          <p className="mt-4">Blog Category</p>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
          >
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>

          {/* Blog Description */}
          <p className="mt-4">Blog Description</p>

          <div className="max-w-2xl h-74 pb-16 sm:pb-10 pt-2 relative">

            <div ref={editorRef}></div>

            {isGenerating && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}

            <button
              type="button"
              onClick={GenerateContent}
              disabled={isGenerating}
              className="absolute bottom-1 right-2 z-20 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate with AI'}
            </button>

          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition mt-2 disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Submit for review'}
          </button>

        </div>

      </form>

      <Footer />
    </>
  )
}

export default WriteBlog