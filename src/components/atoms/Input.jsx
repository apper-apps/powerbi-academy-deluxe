import { forwardRef } from 'react'

const Input = forwardRef(({ 
  label, 
  error, 
  className = '', 
  required = false,
  ...props 
}, ref) => {
  const inputClasses = `
    w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
    ${error 
      ? 'border-error focus:ring-error focus:border-error' 
      : 'border-gray-200 hover:border-gray-300'
    }
    ${className}
  `
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="text-sm text-error animate-slideIn">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input