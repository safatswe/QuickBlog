
import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../../assets/assets'
import Quill from 'quill'
import { blogCategories } from '../../assets/assets'

const AddBlog = () => {

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(false)
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [category, setCategory] = useState('startup')
  const [ispublished, setIsPublished] = useState(false)

  const onSubmitHandler = (e) => {
    e.preventDefault()
  }

  const GenerateContent = () => {
    // Call AI API to generate content
    // Update the state with the generated content
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow'
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
            src={
              !image
                ? assets.upload_area
                : URL.createObjectURL(image)
            }
            alt="upload"
            className="mt-2 h-16 rounded cursor-pointer"
          />

          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
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
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />

        {/* Category */}
        <p className="mt-4"> Blog Category</p>

       <select onChange={e=>setCategory(e.target.value)} name='category' className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
      <option>Select Category</option>
      {blogCategories.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
      })}
       </select>

        {/* Published */}
        <p className="mt-4">Is Published</p>

        <input
          type="checkbox"
          checked={ispublished}
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
          className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition mt-2"
        >
          Add Blog
        </button>

      </div>

    </form>
  )
}

export default AddBlog

