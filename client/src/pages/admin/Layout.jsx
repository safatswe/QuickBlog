import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const navigate = useNavigate()
  const { logout } = useAppContext()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="h-[60px] flex items-center justify-between px-4 sm:px-12 bg-white border-b border-gray-200">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-32 sm:w-40 cursor-pointer"
          onClick={() => navigate('/')}
        />

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </header>

      <div className="flex h-[calc(100vh-60px)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

    </div>
  )
}

export default Layout
