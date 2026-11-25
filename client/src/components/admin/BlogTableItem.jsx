import React from 'react'
import toast from 'react-hot-toast'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import { getStatus } from '../../utils/blogStatus'

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { axios } = useAppContext()
  const { title, createdAt } = blog

  const BlogDate = new Date(createdAt)
  const status = getStatus(blog)
  const isPending = (blog.status || 'approved') === 'pending'

  // Sends a request, shows the result, and refreshes the list
  const run = async (url, body) => {
    try {
      const { data } = await axios.post(url, body)
      if (data.success) {
        toast.success(data.message)
        await fetchBlogs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const approveBlog = () => run('/api/admin/approve-blog', { id: blog._id })

  const rejectBlog = () => {
    const reason = window.prompt('Reason for rejecting (optional, the author will see it):')
    if (reason === null) return // cancelled
    run('/api/admin/reject-blog', { id: blog._id, reason })
  }

  const deleteBlog = () => {
    if (!window.confirm('Delete this blog and all its comments?')) return
    run('/api/blog/delete', { id: blog._id })
  }

  const togglePublish = () => run('/api/blog/toggle-publish', { id: blog._id })

  return (
    <tr className="border-y border-gray-300">

      <th className="px-2 py-4">{index}</th>

      <td className="px-2 py-4">
        {title}
        {blog.author?.name && (
          <p className="text-xs text-gray-400 font-normal">by {blog.author.name}</p>
        )}
      </td>

      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>

      <td className="px-2 py-4 max-sm:hidden">
        <span className={`text-xs px-2 py-0.5 rounded-full ${status.className}`}>
          {status.label}
        </span>
      </td>

      <td className="px-2 py-4">
        <div className="flex items-center gap-2 text-xs flex-wrap">

          {isPending ? (
            <>
              <button
                className="border border-green-500 text-green-600 px-2 py-0.5 rounded cursor-pointer"
                onClick={approveBlog}
              >
                Approve
              </button>
              <button
                className="border border-red-400 text-red-500 px-2 py-0.5 rounded cursor-pointer"
                onClick={rejectBlog}
              >
                Reject
              </button>
            </>
          ) : (
            <button
              className="border px-2 py-0.5 rounded cursor-pointer"
              onClick={togglePublish}
            >
              {blog.isPublished ? "Unpublish" : "Publish"}
            </button>
          )}

          <img
            src={assets.cross_icon}
            alt="Delete"
            onClick={deleteBlog}
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>

    </tr>
  )
}

export default BlogTableItem