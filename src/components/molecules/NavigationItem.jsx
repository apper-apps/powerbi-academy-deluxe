import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const NavigationItem = ({ 
  to, 
  icon, 
  label, 
  badge, 
  isCollapsed = false 
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
          isActive
            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
            : 'text-gray-600 hover:text-primary hover:bg-gray-50'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ApperIcon 
              name={icon} 
              className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary'}`} 
            />
          </motion.div>
          
          {!isCollapsed && (
            <>
              <span className="font-medium flex-1">{label}</span>
              {badge && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  isActive 
                    ? 'bg-white bg-opacity-20 text-white' 
                    : 'bg-primary text-white'
                }`}>
                  {badge}
                </span>
              )}
            </>
          )}
        </>
      )}
    </NavLink>
  )
}

export default NavigationItem