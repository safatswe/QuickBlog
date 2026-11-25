import React, { useEffect, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAppContext } from '../context/AppContext'

const UserAuth = () => {
  const { axios, token, role, login } = useAppContext()
  const [searchParams] = useSearchParams()

  const [mode, setMode] = useState(searchParams.get('mode') === 'signup' ? 'signup' : 'login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // Keep the form in sync when the Navbar buttons change the address
  useEffect(() => {
    setMode(searchParams.get('mode') === 'signup' ? 'signup' : 'login')
  }, [searchParams])

  const isSignup = mode === 'signup'

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const url = isSignup ? '/api/user/register' : '/api/user/login'
      const body = isSignup ? { name, email, password } : { email, password }
      const { data } = await axios.post(url, body)

      if (data.success) {
        login(data.token, 'user', data.name)
        toast.success(isSignup ? 'Account created. Welcome!' : 'Logged in successfully')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Already logged in: go to the right place
  if (token && role === 'admin') return <Navigate to="/admin" replace />
  if (token && role === 'user') return <Navigate to="/my-blogs" replace />

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center my-16 px-4">
        <div className="w-full max-w-sm p-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg bg-white">

          <div className="w-full py-4 text-center">
            <h1 className="text-2xl font-bold">
              <span className="text-primary">{isSignup ? 'Create' : 'Welcome'}</span> {isSignup ? 'Account' : 'Back'}
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              {isSignup
                ? 'Sign up to write blogs and share them with everyone.'
                : 'Log in to write blogs and see their status.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">

            {isSignup && (
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                placeholder={isSignup ? 'At least 6 characters' : 'Enter your password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={isSignup ? 6 : undefined}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition mt-2 disabled:opacity-60"
            >
              {loading ? 'Please wait...' : isSignup ? 'Sign up' : 'Login'}
            </button>

          </form>

          <p className="text-sm text-gray-600 text-center mt-5">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setMode(isSignup ? 'login' : 'signup')}
              className="text-primary font-medium cursor-pointer"
            >
              {isSignup ? 'Login' : 'Sign up'}
            </button>
          </p>

          <p className="text-xs text-gray-400 text-center mt-3">
            Are you the admin? <Link to="/admin" className="underline">Admin login</Link>
          </p>

        </div>
      </div>

      <Footer />
    </>
  )
}

export default UserAuth