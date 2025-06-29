import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import ProgressRing from '@/components/atoms/ProgressRing'

const ModuleCard = ({ module, progress = 0 }) => {
  const navigate = useNavigate()
  
  const handleCardClick = () => {
    navigate(`/lesson/${module.Id}/${module.lessons[0]?.Id || 1}`)
  }
  
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'success'
      case 'intermediate': return 'warning'
      case 'advanced': return 'error'
      default: return 'info'
    }
  }
  
  const getModuleIcon = (title) => {
    if (title.toLowerCase().includes('data')) return 'Database'
    if (title.toLowerCase().includes('visual')) return 'BarChart3'
    if (title.toLowerCase().includes('dax')) return 'Code'
    if (title.toLowerCase().includes('report')) return 'FileText'
    return 'BookOpen'
  }
  
return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group touch:hover:shadow-xl min-touch"
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex-shrink-0">
              <ApperIcon 
                name={getModuleIcon(module.title)} 
                className="w-5 h-5 sm:w-6 sm:h-6 text-white" 
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200 truncate">
                {module.title}
              </h3>
              <Badge 
                variant={getDifficultyColor(module.difficulty)} 
                size="sm"
                className="mt-1"
              >
                {module.difficulty}
              </Badge>
            </div>
          </div>
          
          <ProgressRing 
            progress={progress} 
            size={50} 
            strokeWidth={3}
            showLabel={false}
            className="flex-shrink-0 sm:hidden"
          />
          <ProgressRing 
            progress={progress} 
            size={60} 
            strokeWidth={4}
            showLabel={false}
            className="flex-shrink-0 hidden sm:block"
          />
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm-mobile sm:text-base">
          {module.description}
        </p>
        
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className="flex items-center space-x-1">
              <ApperIcon name="BookOpen" className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{module.lessons?.length || 0} lessons</span>
            </span>
            <span className="flex items-center space-x-1">
              <ApperIcon name="Clock" className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{module.estimatedTime || 60} min</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-1 text-primary group-hover:text-secondary transition-colors duration-200">
            <span className="font-medium hidden sm:inline">Start Learning</span>
            <span className="font-medium sm:hidden">Start</span>
            <ApperIcon name="ArrowRight" className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>
      
      <div className="h-1 bg-gray-100">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </motion.div>
  )
}

export default ModuleCard