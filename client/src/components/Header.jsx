import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {
  const { input, setInput } = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setInput(inputRef.current.value)
  }

  const onClear = () => {
    setInput('')
    inputRef.current.value = ''
  }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className='text-center mt-20 mb-8'>
        <div className='inline-flex items-center justify-center gap-4 mb-4 px-6 py-1.5 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary '>
          <p>NEW:AI feature integrated</p>
          <img src={assets.star_icon} alt="start" className='w-2.5 ' />
        </div>
        <h1 className='text-3xl sm:text-6xl font-semibold sm-leading-16 text-gray-700'>Your own <span className='text-primary'>blogging</span> <br /> platform</h1>
        <p className='text-gray-500 text-sm sm:text-base mt-4'>QuickBlog is a blogging platform that allows you to create and share your thoughts with the world. <br /> It is a simple and easy to use platform that allows you to create your own blog in minutes.</p>

        <form onSubmit={onSubmitHandler}>
          <input
            ref={inputRef}
            type="text"
            placeholder='Search for blogs'
            required
            className='mt-6 px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
          />
          <button type='submit' className='px-6 py-2 rounded-r-full bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>Search</button>
        </form>

        {input && (
          <div className='mt-3'>
            <button onClick={onClear} className='border text-xs py-1 px-3 rounded-sm cursor-pointer'>
              Clear Search
            </button>
          </div>
        )}
      </div>
      <img src={assets.gradientBackground} alt="gradient" className='absolute -top-50 -z-1 opacity-50' />
    </div>
  )
}

export default Header
