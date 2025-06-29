import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  type = "general",
  onAction = null,
  actionLabel = "Get Started"
}) => {
  const getEmptyConfig = () => {
    switch (type) {
      case 'modules':
        return {
          icon: 'BookOpen',
          title: 'No Modules Available',
          description: 'Learning modules are being prepared for you. Check back soon to start your Power BI journey!',
          actionLabel: 'Refresh Modules'
        }
      case 'lessons':
        return {
          icon: 'GraduationCap',
          title: 'No Lessons Yet',
          description: 'This module doesn\'t have any lessons yet. More content is coming soon!',
          actionLabel: 'Browse Other Modules'
        }
      case 'progress':
        return {
          icon: 'TrendingUp',
          title: 'No Progress Yet',
          description: 'Start learning to see your progress here. Complete your first lesson to get started!',
          actionLabel: 'Start Learning'
        }
      case 'resources':
        return {
          icon: 'FileText',
          title: 'No Resources Available',
          description: 'Learning resources will appear here as you progress through the modules.',
          actionLabel: 'View Modules'
        }
      case 'search':
        return {
          icon: 'Search',
          title: 'No Results Found',
          description: 'Try adjusting your search terms or browse all available content.',
          actionLabel: 'Clear Search'
        }
      default:
        return {
          icon: 'Lightbulb',
          title: 'Nothing Here Yet',
          description: 'This area is empty right now, but it will fill up as you use the app!',
          actionLabel: 'Get Started'
        }
    }
  }

  const config = getEmptyConfig()
  const finalActionLabel = actionLabel !== "Get Started" ? actionLabel : config.actionLabel

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6"
    >
      <div className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <ApperIcon name={config.icon} className="w-10 h-10 text-white" />
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900 mb-3"
        >
          {config.title}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8 leading-relaxed"
        >
          {config.description}
        </motion.p>
        
        {onAction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={onAction}
              variant="primary"
              size="lg"
              className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <ApperIcon name="Rocket" className="w-5 h-5 mr-2" />
              {finalActionLabel}
            </Button>
          </motion.div>
        )}
        
        <motion.div
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            delay: 1 
          }}
          className="mt-8"
        >
          <ApperIcon name="Sparkles" className="w-8 h-8 text-accent mx-auto opacity-60" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Empty