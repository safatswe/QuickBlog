// Gives the label and colours for a blog's status badge
export const getStatus = (blog) => {
  const status = blog.status || 'approved'

  if (status === 'pending') {
    return { label: 'Pending', className: 'bg-yellow-100 text-yellow-700' }
  }
  if (status === 'rejected') {
    return { label: 'Rejected', className: 'bg-red-100 text-red-700' }
  }
  if (!blog.isPublished) {
    return { label: 'Unpublished', className: 'bg-gray-100 text-gray-600' }
  }
  return { label: 'Published', className: 'bg-green-100 text-green-700' }
}