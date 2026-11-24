
import React from 'react'
import{assets} from '../../assets/assets'

const CommentTableItem = ({ comment, fetchComments }) => {

  const { blog, createdAt, _id } = comment
  const BlogDate = new Date(createdAt)

  const approveComment = async () => {
    console.log('Approve comment:', _id)

    // API call will go here later

    fetchComments()
  }

  const deleteComment = async () => {
    console.log('Delete comment:', _id)

    // API call will go here later

    fetchComments()
  }

  return (
    <tr className="border-y border-gray-300">

      <td className="px-6 py-4">

        <b className="font-medium text-gray-700">
          Blog
        </b>: {blog?.title}

        <br />
        <br />

        <b className="font-medium text-gray-700">
          Name
        </b>: {comment.name}

        <br />

        <b className="font-medium text-gray-700">
          Comment
        </b>: {comment.content}

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

