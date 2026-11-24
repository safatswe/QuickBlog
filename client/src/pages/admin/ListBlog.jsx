import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'

const ListBlog = () => {
  const { axios } = useAppContext()
  const [blogs, setBlogs] = useState([])

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/admin/blogs')
      if (data.success) setBlogs(data.blogs)
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 min-h-screen">

      <h1 className="text-2xl font-semibold mb-6">All Blogs</h1>

      <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg bg-white">
        <table className="w-full text-sm text-gray-500">

          <thead className="text-xs text-gray-600 text-left uppercase bg-gray-50">
            <tr>
              <th className="px-2 py-4 xl:px-6">#</th>
              <th className="px-2 py-4">Blog Title</th>
              <th className="px-2 py-4 max-sm:hidden">Date</th>
              <th className="px-2 py-4 max-sm:hidden">Status</th>
              <th className="px-2 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog, index) => (
              <BlogTableItem
                key={blog._id}
                blog={blog}
                fetchBlogs={fetchBlogs}
                index={index + 1}
              />
            ))}
          </tbody>

        </table>

        {blogs.length === 0 && (
          <p className="text-center text-gray-400 py-8">No blogs yet.</p>
        )}
      </div>

    </div>
  )
}

export default ListBlog
