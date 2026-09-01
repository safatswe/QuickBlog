
import React from 'react'
import { useParams } from 'react-router-dom'
import { blog_data, assets, comments_data } from '../assets/assets'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Moment from 'moment'
import Loader from '../components/Loader'

const Blog = () => {

  const { id } = useParams()

  const [data, setData] = React.useState(null)
  const [comments, setComments] = React.useState([])

  // Form states
  const [name, setName] = React.useState('')
  const [comment, setComment] = React.useState('')

  // Loading state for button
  const [isPosting, setIsPosting] = React.useState(false)

  // Fetch blog data
  const fetchBlogData = () => {
    const blog = blog_data.find(item => item._id === id)
    setData(blog)
  }

  // Fetch comments
  const fetchComments = () => {
    setComments(comments_data)
  }

  // Load blog and comments
  React.useEffect(() => {
    fetchBlogData()
    fetchComments()
  }, [id])

  // Add comment
  const handleSubmit = (e) => {
    e.preventDefault()

    // Check empty fields
    if (!name.trim()) {
      alert('Please enter your name.')
      return
    }

    if (!comment.trim()) {
      alert('Please write a comment.')
      return
    }

    setIsPosting(true)

    // Create new comment
    const newComment = {
      _id: Date.now().toString(),
      name: name.trim(),
      content: comment.trim(),
      createdAt: new Date()
    }

    // Add comment to the beginning
    setComments(prevComments => [
      newComment,
      ...prevComments
    ])

    // Clear form
    setName('')
    setComment('')

    // Small delay for button effect
    setTimeout(() => {
      setIsPosting(false)
    }, 500)
  }

  // Show loader while blog is loading
  if (!data) {
    return <Loader />
  }

  return (
    <div className="relative min-h-screen">

      {/* ================= BACKGROUND ================= */}

      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-10 opacity-50"
      />

      {/* ================= NAVBAR ================= */}

      <Navbar />

      {/* ================= BLOG HEADER ================= */}

      <div className="flex flex-col items-center justify-center gap-4 mt-20 mx-8 sm:mx-20 xl:mx-32">

        <p className="text-gray-500 text-sm">
          Published on:{' '}
          {Moment(data.createdAt).format('MMMM Do YYYY')}
        </p>

        <h1 className="text-3xl md:text-5xl font-bold text-center max-w-4xl">
          {data.title}
        </h1>

        <h2 className="text-lg md:text-xl text-gray-500 text-center max-w-2xl">
          {data.subTitle}
        </h2>

      </div>

      {/* ================= BLOG CONTENT ================= */}

      <div className="mx-5 max-w-5xl md:mx-auto my-10">

        <img
          src={data.image}
          alt={data.title}
          className="rounded-3xl mb-8 w-full"
        />

        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{
            __html: data.description
          }}
        />

      </div>

      {/* ================= COMMENTS ================= */}

      <div className="max-w-3xl mx-auto px-5 mt-16 mb-20">

        {/* ================= COMMENT HEADER ================= */}

        <div className="flex items-center justify-between mb-6">

          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              Comments
              <span className="text-gray-400 text-lg ml-2">
                ({comments.length})
              </span>
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Share your thoughts with us
            </p>
          </div>

        </div>

        {/* ================= ADD COMMENT ================= */}

        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-7 shadow-sm mb-10">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">

              <img
                src={assets.user_icon}
                alt="User"
                className="w-6 h-6"
              />

            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Leave a comment
              </h4>

              <p className="text-sm text-gray-500">
                We'd love to hear what you think!
              </p>
            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >

            {/* ================= NAME ================= */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
              />

            </div>

            {/* ================= COMMENT ================= */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your comment
              </label>

              <textarea
                rows="5"
                placeholder="Write your thoughts about this article..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={500}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
              />

              <p className="text-xs text-gray-400 text-right mt-1">
                {comment.length}/500
              </p>

            </div>

            {/* ================= BUTTON ================= */}

            <div className="flex justify-end">

              <button
                type="submit"
                disabled={isPosting}
                className="px-7 py-3 rounded-xl bg-primary text-white font-medium hover:opacity-90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >

                {isPosting ? 'Posting...' : 'Post Comment'}

              </button>

            </div>

          </form>

        </div>

        {/* ================= COMMENT LIST ================= */}

        <div className="flex flex-col gap-5">

          {comments.length === 0 ? (

            /* No comments */

            <div className="text-center py-14 border border-dashed border-gray-200 rounded-2xl">

              <div className="text-5xl mb-4">
                💬
              </div>

              <h4 className="text-lg font-semibold text-gray-700">
                No comments yet
              </h4>

              <p className="text-sm text-gray-500 mt-1">
                Be the first person to share your thoughts!
              </p>

            </div>

          ) : (

            /* Comments */

            comments.map((item, index) => (

              <div
                key={item._id || index}
                className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
              >

                {/* User Information */}

                <div className="flex items-center gap-3 mb-4">

                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">

                    <img
                      src={assets.user_icon}
                      alt="User"
                      className="w-5 h-5"
                    />

                  </div>

                  <div>

                    <p className="font-semibold text-gray-800">
                      {item.name}
                    </p>

                    <p className="text-xs text-gray-400">
                      {Moment(item.createdAt).format('MMMM Do YYYY')}
                    </p>

                  </div>

                </div>

                {/* Comment */}

                <p className="text-gray-600 text-sm leading-7 ml-13">
                  {item.content}
                </p>

              </div>

            ))

          )}

        </div>

      </div>

      {/* ================= FOOTER ================= */}

      <Footer />

    </div>
  )
}

export default Blog

