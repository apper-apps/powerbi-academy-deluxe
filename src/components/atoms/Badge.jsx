import { motion } from 'framer-motion'

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  earned = false,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg',
    success: 'bg-gradient-to-r from-success to-green-600 text-white shadow-lg',
    warning: 'bg-gradient-to-r from-warning to-yellow-600 text-white shadow-lg',
    error: 'bg-gradient-to-r from-error to-red-600 text-white shadow-lg',
    info: 'bg-gradient-to-r from-info to-accent text-white shadow-lg',
    outline: 'border-2 border-primary text-primary bg-white'
  }
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <motion.span
      initial={earned ? { scale: 0, rotate: -180 } : false}
      animate={earned ? { scale: 1, rotate: 0 } : {}}
      transition={earned ? { type: "spring", stiffness: 200, damping: 10 } : {}}
      className={`${classes} ${earned ? 'badge-earned' : ''}`}
    >
      {children}
    </motion.span>
  )
}

export default Badge