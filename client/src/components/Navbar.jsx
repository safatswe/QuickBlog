import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { token, role, userName, logout } = useAppContext()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className='w-32 sm:w-44 cursor-pointer'
      />

      <div className='flex items-center gap-2 sm:gap-3'>

        {/* Not logged in */}
        {!token && (
          <>
            <button
              onClick={() => navigate('/login?mode=signup')}
              className='rounded-full text-sm cursor-pointer border border-primary text-primary px-5 sm:px-8 py-2.5'
            >
              Sign up
            </button>
            <button
              onClick={() => navigate('/login')}
              className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 sm:px-10 py-2.5'
            >
              Login
              <img src={assets.arrow} alt="arrow" className='w-3' />
            </button>
          </>
        )}

        {/* Admin */}
        {token && role === 'admin' && (
          <button
            onClick={() => navigate('/admin')}
            className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'
          >
            Dashboard
            <img src={assets.arrow} alt="arrow" className='w-3' />
          </button>
        )}

        {/* Normal user */}
        {token && role === 'user' && (
          <>
            <span className='hidden md:inline text-sm text-gray-600'>Hi, {userName}</span>
            <button
              onClick={() => navigate('/write')}
              className='rounded-full text-sm cursor-pointer border border-primary text-primary px-4 sm:px-6 py-2.5'
            >
              Write
            </button>
            <button
              onClick={() => navigate('/my-blogs')}
              className='rounded-full text-sm cursor-pointer bg-primary text-white px-4 sm:px-6 py-2.5'
            >
              My Blogs
            </button>
            <button
              onClick={handleLogout}
              className='text-sm cursor-pointer text-gray-500 hover:text-red-500 px-2'
            >
              Logout
            </button>
          </>
        )}

      </div>
    </div>
  )
}

export default Navbar