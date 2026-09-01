
import React from 'react'
import { assets } from '../../assets/assets'

const BlogTableItem = ({ blog, fetchBlogs, index }) => {

  const { title, createdAt } = blog

  const BlogDate = new Date(createdAt)

  return (
    <tr className="border-y border-gray-300">

      {/* Number */}
      <th className="px-2 py-4">
        {index}
      </th>

      {/* Blog Title */}
      <td className="px-2 py-4">
        {title}
      </td>

      {/* Date */}
      <td className="px-2 py-4 max-sm:hidden">
        {BlogDate.toDateString()}
      </td>

      {/* Status */}
      <td className="px-2 py-4 max-sm:hidden">

        <p
          className={
            blog.isPublished
              ? "text-green-600"
              : "text-orange-700"
          }
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>

      </td>

      {/* Action */}
      <td className="px-2 py-4">

        <div className="flex items-center gap-3 text-xs">

          <button
            className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
            onClick={fetchBlogs}
          >
            {blog.isPublished ? "Unpublish" : "Publish"}
          </button>

          <img
            src={assets.cross_icon}
            alt="Delete"
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />

        </div>

      </td>

    </tr>
  )
}

export default BlogTableItem

