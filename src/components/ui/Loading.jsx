import { motion } from 'framer-motion'

const Loading = ({ type = 'dashboard' }) => {
  if (type === 'lesson') {
    return (
      <div className="flex h-full">
        {/* Instructions Panel Skeleton */}
        <div className="w-1/2 p-6 border-r border-gray-200">
          <div className="space-y-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/5"></div>
              </div>
            </div>
            <div className="animate-pulse">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-3"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Practice Panel Skeleton */}
        <div className="w-1/2 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
            <div className="h-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
            <div className="flex space-x-3">
              <div className="h-10 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
              <div className="h-10 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'modules') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 animate-pulse"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 mt-2"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
              </div>
              <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 animate-pulse"
        >
          <div className="space-y-4">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
            <div className="h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Loading