import React from 'react'

const Newsletter = () => {
  return (
    <div className='mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-40 my-16 
                    rounded-2xl bg-gradient-to-br from-primary/10 via-white to-primary/5
                    border border-gray-200 shadow-sm
                    px-6 py-12 sm:px-12 sm:py-14
                    flex flex-col items-center text-center'>

      <span className='mb-3 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium'>
        Newsletter
      </span>

      <h1 className='text-3xl sm:text-4xl font-bold text-gray-900'>
        Never miss a blog
      </h1>

      <p className='mt-3 max-w-xl text-sm sm:text-base text-gray-600 leading-6'>
        Subscribe to our newsletter and get the latest articles,
        tutorials and updates delivered straight to your inbox.
      </p>

      <form className='mt-7 flex w-full max-w-lg flex-col sm:flex-row gap-3'>

        <input
          type='email'
          placeholder='Enter your email'
          required
          className='flex-1 px-5 py-3 rounded-full border border-gray-300
                     bg-white text-gray-700
                     outline-none
                     focus:border-primary
                     focus:ring-2 focus:ring-primary/20
                     transition'
        />

        <button
          type='submit'
          className='px-7 py-3 rounded-full
                     bg-primary text-white font-medium
                     hover:opacity-90
                     active:scale-95
                     transition-all duration-200
                     shadow-sm'
        >
          Subscribe
        </button>

      </form>

      <p className='mt-4 text-xs text-gray-400'>
        No spam. Unsubscribe anytime.
      </p>

    </div>
  )
}

export default Newsletter