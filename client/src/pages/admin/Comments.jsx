import React from 'react'
import toast from 'react-hot-toast'
import CommentTableItem from '../../components/admin/CommentTableItem'
import { useAppContext } from '../../context/AppContext'

const Comments = () => {
  const { axios } = useAppContext()
  const [comments, setComments] = React.useState([])
  const [filter, setFilter] = React.useState('Not approved')

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/admin/comments')
      if (data.success) setComments(data.comments)
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  React.useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 min-h-screen">

      <div className="flex justify-between items-center max-w-3xl">

        <h1>Comments</h1>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setFilter('Approved')}
            className={`shadow-custm-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === 'Approved' ? 'text-primary' : 'text-gray-700'
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter('Not approved')}
            className={`shadow-custm-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === 'Not approved' ? 'text-primary' : 'text-gray-700'
            }`}
          >
            Not Approved
          </button>
        </div>

      </div>

      <div className="relative h-4/5 max-w-3xl overflow-x-auto shadow rounded-lg bg-white mt-4 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">

          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">Blog Title & Comment</th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">Date</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {comments
              .filter((comment) =>
                filter === 'Approved' ? comment.isApproved === true : comment.isApproved === false
              )
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default Comments
