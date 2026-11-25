import React from 'react'
import { motion } from "motion/react"
import { blogCategories } from '../assets/assets'
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'

const BlogList = () => {
  const [menu, setMenu] = React.useState("All")
  const { blogs, input, fetchBlogs } = useAppContext()

  // Reload the blogs whenever this page opens, and when you come back to this browser tab,
  // so newly approved blogs show up without a manual refresh
  React.useEffect(() => {
    fetchBlogs()
    const onFocus = () => fetchBlogs()
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [])

  // 1) apply the search text, 2) apply the category tab
  const filteredBlogs = blogs
    .filter((blog) => {
      if (input === '') return true
      const text = input.toLowerCase()
      return (
        blog.title.toLowerCase().includes(text) ||
        blog.category.toLowerCase().includes(text)
      )
    })
    .filter((blog) => (menu === "All" ? true : blog.category === menu))

  return (
    <div>
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              className={`cursor-pointer text-gray-500 ${menu === item && 'text-white px-4 pt-0.5'}`}
              onClick={() => setMenu(item)}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId='underline'
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute bottom-0 left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      {filteredBlogs.length === 0 ? (
        <p className='text-center text-gray-500 mb-24'>No blogs found.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
          {filteredBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
        </div>
      )}
    </div>
  )
}

export default BlogList