import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Blog from './pages/Blog'
import UserAuth from './pages/UserAuth'
import MyBlogs from './pages/MyBlogs'
import WriteBlog from './pages/WriteBlog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import Login from './components/admin/Login'
import { useAppContext } from './context/AppContext'
import 'quill/dist/quill.snow.css'

const App = () => {
  const { token, role } = useAppContext()

  // Pages only for logged-in normal users
  const userOnly = (page) => (token && role === 'user' ? page : <Navigate to="/login" replace />)

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />

        {/* Normal users */}
        <Route path="/login" element={<UserAuth />} />
        <Route path="/my-blogs" element={userOnly(<MyBlogs />)} />
        <Route path="/write" element={userOnly(<WriteBlog />)} />

        {/* Admin */}
        <Route path="/admin" element={token && role === 'admin' ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="list-blogs" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App