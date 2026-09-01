import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-gray-300'>

      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-8'>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>

          {/* Logo & Description */}
          <div className='lg:col-span-2'>

            <h2 className='text-2xl font-bold text-white'>
              Blog<span className='text-primary'>.</span>
            </h2>

            <p className='mt-3 max-w-xl text-sm leading-6 text-gray-400'>
              Discover insightful articles, useful tutorials and inspiring
              stories. Stay curious, keep learning and never stop exploring.
            </p>

            {/* Social Links */}
            <div className='flex gap-3 mt-4'>

              <a
                href='#'
                className='w-9 h-9 flex items-center justify-center rounded-full
                           bg-gray-800 text-gray-400 hover:bg-primary
                           hover:text-white transition'
              >
                f
              </a>

              <a
                href='#'
                className='w-9 h-9 flex items-center justify-center rounded-full
                           bg-gray-800 text-gray-400 hover:bg-primary
                           hover:text-white transition'
              >
                X
              </a>

              <a
                href='#'
                className='w-9 h-9 flex items-center justify-center rounded-full
                           bg-gray-800 text-gray-400 hover:bg-primary
                           hover:text-white transition'
              >
                in
              </a>

              <a
                href='#'
                className='w-9 h-9 flex items-center justify-center rounded-full
                           bg-gray-800 text-gray-400 hover:bg-primary
                           hover:text-white transition'
              >
                ◎
              </a>

            </div>
          </div>


          {/* Quick Links */}
          <div>

            <h3 className='text-white font-semibold mb-4'>
              Quick Links
            </h3>

            <ul className='space-y-2 text-sm'>

              <li>
                <a href='#' className='hover:text-primary transition'>
                  Home
                </a>
              </li>

              <li>
                <a href='#' className='hover:text-primary transition'>
                  About Us
                </a>
              </li>

              <li>
                <a href='#' className='hover:text-primary transition'>
                  Blogs
                </a>
              </li>

              <li>
                <a href='#' className='hover:text-primary transition'>
                  Contact
                </a>
              </li>

            </ul>
          </div>


          {/* Categories */}
          <div>

            <h3 className='text-white font-semibold mb-4'>
              Categories
            </h3>

            <ul className='space-y-2 text-sm'>

              <li>
                <a href='#' className='hover:text-primary transition'>
                  All
                </a>
              </li>

              <li>
                <a href='#' className='hover:text-primary transition'>
                  Technology
                </a>
              </li>

              <li>
                <a href='#' className='hover:text-primary transition'>
                  Startup
                </a>
              </li>

              <li>
                <a href='#' className='hover:text-primary transition'>
                  Lifestyle
                </a>
              </li>

              <li>
                <a href='#' className='hover:text-primary transition'>
                  Finance
                </a>
              </li>

            </ul>

          </div>

        </div>


        {/* Bottom Section */}
        <div className='border-t border-gray-800 mt-8 pt-5
                        flex flex-col sm:flex-row
                        items-center justify-between gap-3'>

          <p className='text-xs text-gray-500'>
            © 2026 Blog. All rights reserved.
          </p>

          <div className='flex gap-5 text-xs text-gray-500'>

            <a href='#' className='hover:text-gray-300 transition'>
              Privacy Policy
            </a>

            <a href='#' className='hover:text-gray-300 transition'>
              Terms & Conditions
            </a>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer