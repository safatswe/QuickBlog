import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAppContext } from '../context/AppContext'
import { getStatus } from '../utils/blogStatus'

const MyBlogs = () => {
  const { axios } = useAppContext()
  const navigate = useNavigate()

  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMyBlogs = async () => {
    try {
      const { data } = await axios.get('/api/user/blogs')
      if (data.success) setBlogs(data.blogs)
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMyBlogs()
  }, [])

  const deleteBlog = async (id) => {
    if (!window.confirm('Delete this blog?')) return
    try {
      const { data } = await axios.post('/api/user/blogs/delete', { id })
      if (data.success) {
        toast.success(data.message)
        fetchMyBlogs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <Navbar />

      <div className="mx-8 sm:mx-20 xl:mx-32 mb-24 min-h-[50vh]">

        <div className="flex items-center justify-between gap-4 mt-6 mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-700">My Blogs</h1>
          <button
            onClick={() => navigate('/write')}
            className="rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5"
          >
            Write a new blog
          </button>
        </div>

        {loading && <p className="text-gray-500">Loading...</p>}

        {!loading && blogs.length === 0 && (
          <div className="text-center text-gray-500 py-16 border border-dashed border-gray-300 rounded-lg">
            <p>You have not written any blogs yet.</p>
            <button
              onClick={() => navigate('/write')}
              className="mt-4 text-primary underline cursor-pointer"
            >
              Write your first blog
            </button>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {blogs.map((blog) => {
            const status = getStatus(blog)
            return (
              <div
                key={blog._id}
                className="flex flex-col sm:flex-row gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <img src={blog.image} alt={blog.title} className="w-full sm:w-44 aspect-video object-cover rounded" />

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-medium text-gray-800">{blog.title}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${status.className}`}>
                      {status.label}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    {blog.category} · {new Date(blog.createdAt).toDateString()}
                  </p>

                  {blog.status === 'pending' && (
                    <p className="text-xs text-yellow-700 mt-2">Waiting for the admin to review it.</p>
                  )}

                  {blog.status === 'rejected' && (
                    <p className="text-xs text-red-600 mt-2">
                      Rejected{blog.rejectionReason ? `: ${blog.rejectionReason}` : '.'}
                    </p>
                  )}

                  <div className="flex gap-3 mt-3">
                    {blog.isPublished && (
                      <button
                        onClick={() => navigate(`/blog/${blog._id}`)}
                        className="text-xs border border-primary text-primary px-3 py-1 rounded cursor-pointer"
                      >
                        View
                      </button>
                    )}
                    <button
                      onClick={() => deleteBlog(blog._id)}
                      className="text-xs border border-red-300 text-red-500 px-3 py-1 rounded cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      <Footer />
    </>
  )
}

export default MyBlogs