import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import toast from 'react-hot-toast'
import { assets, blogCategories } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

const AddBlog = () => {
  const { axios } = useAppContext()

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(false)
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [category, setCategory] = useState('Technology')
  const [isPublished, setIsPublished] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  // "All" is only a filter on the home page, not a real category
  const categories = blogCategories.filter((item) => item !== 'All')

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!image) return toast.error('Please upload a thumbnail')
    if (!title.trim()) return toast.error('Please enter a blog title')
    if (!quillRef.current.getText().trim()) return toast.error('Please write the blog description')

    try {
      setIsAdding(true)

      const blog = {
        title: title.trim(),
        subTitle: subTitle.trim(),
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      }

      const formData = new FormData()
      formData.append('blog', JSON.stringify(blog))
      formData.append('image', image)

      const { data } = await axios.post('/api/blog/add', formData)

      if (data.success) {
        toast.success(data.message)
        // Clear the form
        setImage(false)
        setTitle('')
        setSubTitle('')
        setCategory('Technology')
        setIsPublished(false)
        quillRef.current.root.innerHTML = ''
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsAdding(false)
    }
  }

  const GenerateContent = () => {
    // Day 3: AI generation will be added here
    toast('AI generation will be added on Day 3')
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
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >

      <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto mt-6">

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

        {/* Published */}
        <p className="mt-4">Publish Now</p>

        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="border border-gray-300 rounded-lg p-2"
        />

        {/* Blog Description */}
        <p className="mt-4">Blog Description</p>

        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">

          <div ref={editorRef}></div>

          <button
            type="button"
            onClick={GenerateContent}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            Generate with AI
          </button>

        </div>

        <button
          type="submit"
          disabled={isAdding}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition mt-2 disabled:opacity-60"
        >
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>

      </div>

    </form>
  )
}

export default AddBlog
