import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'

const LessonItem = ({ lesson, moduleId, isCompleted = false, isActive = false }) => {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate(`/lesson/${moduleId}/${lesson.Id}`)
  }
  
return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-200 min-touch ${
        isActive 
          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg' 
          : 'bg-white hover:bg-gray-50 shadow-md hover:shadow-lg touch:hover:shadow-lg'
      }`}
    >
      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
        isCompleted 
          ? 'bg-success text-white' 
          : isActive 
            ? 'bg-white bg-opacity-20 text-white'
            : 'bg-gray-100 text-gray-400'
      }`}>
        {isCompleted ? (
          <ApperIcon name="Check" className="w-4 h-4" />
        ) : (
          <ApperIcon name="Play" className="w-4 h-4" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className={`font-medium text-sm-mobile sm:text-base truncate ${isActive ? 'text-white' : 'text-gray-900'}`}>
          {lesson.title}
        </h4>
        <div className="flex items-center space-x-2 sm:space-x-3 mt-1">
          <span className={`text-xs-mobile sm:text-sm ${isActive ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
            {lesson.estimatedTime} min
          </span>
          {lesson.difficulty && (
            <Badge 
              variant={isActive ? 'outline' : 'default'} 
              size="sm"
              className="hidden xs:inline-flex"
            >
              {lesson.difficulty}
            </Badge>
          )}
        </div>
      </div>
      
      <ApperIcon 
        name="ChevronRight" 
        className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} 
      />
    </motion.div>
  )
}

export default LessonItem