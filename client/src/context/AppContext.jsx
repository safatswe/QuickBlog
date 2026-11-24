import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  // Load the saved token (if any) and attach it to every request
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem('token')
    if (saved) axios.defaults.headers.common['Authorization'] = `Bearer ${saved}`
    return saved
  })
  const [blogs, setBlogs] = useState([])
  const [input, setInput] = useState('')

  const login = (newToken) => {
    localStorage.setItem('token', newToken)
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setToken(null)
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

  const value = { axios, token, login, logout, blogs, fetchBlogs, input, setInput }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
