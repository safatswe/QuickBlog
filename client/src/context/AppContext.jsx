import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  // Load the saved login (if any) and attach the token to every request.
  // An old login without a role is cleared, so the person simply logs in again.
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem('token')
    const savedRole = localStorage.getItem('role')
    if (saved && savedRole) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${saved}`
      return saved
    }
    localStorage.removeItem('token')
    return null
  })
  const [role, setRole] = useState(() => (localStorage.getItem('token') ? localStorage.getItem('role') : null))
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '')
  const [blogs, setBlogs] = useState([])
  const [input, setInput] = useState('')

  // role is 'admin' or 'user'
  const login = (newToken, newRole = 'admin', name = '') => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('role', newRole)
    localStorage.setItem('userName', name)
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    setToken(newToken)
    setRole(newRole)
    setUserName(name)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userName')
    delete axios.defaults.headers.common['Authorization']
    setToken(null)
    setRole(null)
    setUserName('')
  }

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/blog/all')
      if (data.success) setBlogs(data.blogs)
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  // If the server says our token is bad or expired, log out automatically
  useEffect(() => {
    const id = axios.interceptors.response.use((res) => {
      const msg = res.data?.message
      if (res.data?.success === false && (msg === 'Invalid or expired token' || msg === 'Not authorized')) {
        logout()
      }
      return res
    })
    return () => axios.interceptors.response.eject(id)
  }, [])

  const value = { axios, token, role, userName, login, logout, blogs, fetchBlogs, input, setInput }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)