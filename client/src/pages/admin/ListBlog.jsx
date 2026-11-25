import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'

const ListBlog = () => {
  const { axios } = useAppContext()
  const [blogs, setBlogs] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const filter = searchParams.get('filter') === 'pending' ? 'pending' : 'all'

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

  const pendingCount = blogs.filter((blog) => blog.status === 'pending').length
  const shownBlogs = filter === 'pending' ? blogs.filter((blog) => blog.status === 'pending') : blogs

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 min-h-screen">

      <div className="flex items-center justify-between max-w-4xl mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-semibold">All Blogs</h1>

        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setSearchParams({})}
            className={`border rounded-full px-4 py-1 cursor-pointer ${filter === 'all' ? 'text-primary border-primary' : 'text-gray-700'}`}
          >
            All
          </button>
          <button
            onClick={() => setSearchParams({ filter: 'pending' })}
            className={`border rounded-full px-4 py-1 cursor-pointer ${filter === 'pending' ? 'text-primary border-primary' : 'text-gray-700'}`}
          >
            Pending ({pendingCount})
          </button>
        </div>
      </div>

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
            {shownBlogs.map((blog, index) => (
              <BlogTableItem
                key={blog._id}
                blog={blog}
                fetchBlogs={fetchBlogs}
                index={index + 1}
              />
            ))}
          </tbody>

        </table>

        {shownBlogs.length === 0 && (
          <p className="text-center text-gray-400 py-8">
            {filter === 'pending' ? 'No blogs are waiting for review.' : 'No blogs yet.'}
          </p>
        )}
      </div>

    </div>
  )
}

export default ListBlog