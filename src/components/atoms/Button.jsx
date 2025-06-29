import { motion } from 'framer-motion'
import { forwardRef } from 'react'

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  className = '', 
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white hover:from-secondary hover:to-primary focus:ring-primary shadow-lg hover:shadow-xl transform hover:scale-105',
    secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white focus:ring-primary shadow-md hover:shadow-lg',
    accent: 'bg-gradient-to-r from-accent to-info text-white hover:from-info hover:to-accent focus:ring-accent shadow-lg hover:shadow-xl transform hover:scale-105',
    success: 'bg-gradient-to-r from-success to-green-600 text-white hover:from-green-600 hover:to-success focus:ring-success shadow-lg hover:shadow-xl',
    danger: 'bg-gradient-to-r from-error to-red-600 text-white hover:from-red-600 hover:to-error focus:ring-error shadow-lg hover:shadow-xl',
    outline: 'border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary focus:ring-primary',
    ghost: 'text-gray-600 hover:text-primary hover:bg-gray-50 focus:ring-primary'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <motion.button
      ref={ref}
      whileHover={!disabled ? { scale: variant === 'ghost' || variant === 'outline' ? 1.02 : 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  )
})

Button.displayName = 'Button'

export default Button