
import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'

const ListBlog = () => {

  const [blogs, setBlogs] = useState([])

  const fetchBlogs = async () => {
    setBlogs(blog_data)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 min-h-screen">

      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-6">
        All Blogs
      </h1>

      {/* Table */}
      <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg bg-white">

        <table className="w-full text-sm text-gray-500">

          {/* Table Header */}
          <thead className="text-xs text-gray-600 text-left uppercase bg-gray-50">

            <tr>

              <th className="px-2 py-4 xl:px-6">
                #
              </th>

              <th className="px-2 py-4">
                Blog Title
              </th>

              <th className="px-2 py-4 max-sm:hidden">
                Date
              </th>

              <th className="px-2 py-4 max-sm:hidden">
                Status
              </th>

              <th className="px-2 py-4">
                Action
              </th>

            </tr>

          </thead>

          {/* Table Body */}
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

      </div>

    </div>
  )
}

export default ListBlog

