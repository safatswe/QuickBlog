
import React from 'react'

const Login = () => {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log('Email:', email)
    console.log('Password:', password)
  }

  return (
    <div className="flex items-center justify-center h-screen">

      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg bg-white">

        {/* Header */}
        <div className="w-full py-4 text-center">

          <h1 className="text-2xl font-bold">
            <span className="text-primary">Admin</span> Login
          </h1>

          <p className="text-gray-600 text-sm mt-2">
            Please enter your credentials to access the admin panel.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-4"
        >

          {/* Email */}
          <div className="flex flex-col gap-1">

            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>

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

          {/* Password */}
          <div className="flex flex-col gap-1">

            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition mt-2"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  )
}

export default Login

