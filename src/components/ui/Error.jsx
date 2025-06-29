import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ 
  message = "Something went wrong. Please try again.", 
  onRetry = null,
  type = "general"
}) => {
  const getErrorConfig = () => {
    switch (type) {
      case 'lesson':
        return {
          icon: 'BookOpen',
          title: 'Lesson Loading Failed',
          suggestion: 'The lesson content could not be loaded. Please check your connection and try again.'
        }
      case 'progress':
        return {
          icon: 'TrendingUp',
          title: 'Progress Data Unavailable',
          suggestion: 'Your progress data could not be retrieved. Please refresh to try again.'
        }
      case 'exercise':
        return {
          icon: 'Code',
          title: 'Exercise Validation Error',
          suggestion: 'There was an issue validating your exercise. Please try submitting again.'
        }
      default:
        return {
          icon: 'AlertTriangle',
          title: 'Something Went Wrong',
          suggestion: 'An unexpected error occurred. Please try again.'
        }
    }
  }

  const config = getErrorConfig()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-6"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-gradient-to-br from-error to-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name={config.icon} className="w-8 h-8 text-white" />
        </motion.div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {config.title}
        </h3>
        
        <p className="text-gray-600 mb-2">
          {message}
        </p>
        
        <p className="text-sm text-gray-500 mb-6">
          {config.suggestion}
        </p>
        
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="primary"
            className="w-full animate-pulse-success"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
        
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 3 }}
          className="mt-4"
        >
          <ApperIcon name="Coffee" className="w-6 h-6 text-gray-400 mx-auto" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Error