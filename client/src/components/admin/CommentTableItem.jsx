import React from 'react'
import toast from 'react-hot-toast'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

const CommentTableItem = ({ comment, fetchComments }) => {
  const { axios } = useAppContext()
  const { blog, createdAt, _id } = comment
  const BlogDate = new Date(createdAt)

  const approveComment = async () => {
    try {
      const { data } = await axios.post('/api/admin/approve-comment', { id: _id })
      if (data.success) {
        toast.success(data.message)
        await fetchComments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteComment = async () => {
    if (!window.confirm('Delete this comment?')) return
    try {
      const { data } = await axios.post('/api/admin/delete-comment', { id: _id })
      if (data.success) {
        toast.success(data.message)
        await fetchComments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <tr className="border-y border-gray-300">

      <td className="px-6 py-4">
        <b className="font-medium text-gray-700">Blog</b>: {blog?.title}
        <br /><br />
        <b className="font-medium text-gray-700">Name</b>: {comment.name}
        <br />
        <b className="font-medium text-gray-700">Comment</b>: {comment.content}
      </td>

      <td className="px-6 py-4 max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>

      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">

          {!comment.isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              alt="Approve"
              className="w-5 hover:scale-110 transition-all cursor-pointer"
            />
          ) : (
            <p className="text-xs border border-green-500 text-green-500 px-2 py-1">
              Approved
            </p>
          )}

          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            alt="Delete"
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />

        </div>
      </td>

    </tr>
  )
}

export default CommentTableItem
