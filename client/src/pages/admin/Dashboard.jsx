
import React from 'react'
import toast from 'react-hot-toast'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import BlogTableItem from '../../components/admin/BlogTableItem'

const Dashboard = () => {

  const { axios } = useAppContext()

  const [dashboardData, setDashboardData] = React.useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/admin/dashboard')
      if (data.success) setDashboardData(data.dashboardData)
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  React.useEffect(() => {
    fetchDashboardData()
  }, [])

  return (
    <div className="flex-1 p-4 md:p-8 bg-blue-50/50 min-h-screen">

      {/* Dashboard Cards */}
      <div className="flex flex-wrap gap-4">

        {/* Blogs */}
        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-md w-full sm:w-[48%] lg:w-[30%]">

          <img
            src={assets.dashboard_icon_1}
            alt="Blogs"
            className="w-12 md:w-14"
          />

          <div>
            <p className="text-xl font-bold text-gray-800">
              {dashboardData.blogs}
            </p>

            <p className="text-sm font-semibold text-gray-600">
              Blogs
            </p>
          </div>

        </div>

        {/* Comments */}
        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-md w-full sm:w-[48%] lg:w-[30%]">

          <img
            src={assets.dashboard_icon_2}
            alt="Comments"
            className="w-12 md:w-14"
          />

          <div>
            <p className="text-xl font-bold text-gray-800">
              {dashboardData.comments}
            </p>

            <p className="text-sm font-semibold text-gray-600">
              Comments
            </p>
          </div>

        </div>

        {/* Drafts */}
        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-md w-full sm:w-[48%] lg:w-[30%]">

          <img
            src={assets.dashboard_icon_3}
            alt="Drafts"
            className="w-12 md:w-14"
          />

          <div>
            <p className="text-xl font-bold text-gray-800">
              {dashboardData.drafts}
            </p>

            <p className="text-sm font-semibold text-gray-600">
              Drafts
            </p>
          </div>

        </div>

      </div>

      {/* Latest Blogs Title */}
      <div className="flex items-center gap-3 m-4 mt-8 text-gray-600">

        <img
          src={assets.dashboard_icon_4}
          alt="Latest Blogs"
          className="w-6 h-6"
        />

        <p className="font-semibold">
          Latest Blogs
        </p>

      </div>

      {/* Blog Table */}
      <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg bg-white">

        <table className="w-full text-sm text-gray-500">

          <thead className="text-xs text-gray-600 text-left uppercase bg-gray-50">

            <tr>
              <th className="px-2 py-4 xl:px-6">
                #
              </th>

              <th className="px-2 py-4">
                Blog Title
              </th>

              <th className="px-2 py-4 max-sm:hidden">
                Date
              </th>

              <th className="px-2 py-4 max-sm:hidden">
                Status
              </th>

              <th className="px-2 py-4">
                Action
              </th>
            </tr>

          </thead>

          <tbody>

            {dashboardData.recentBlogs.map((blog, index) => (

              <BlogTableItem
                key={blog._id}
                blog={blog}
                fetchBlogs={fetchDashboardData}
                index={index + 1}
              />

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Dashboard

