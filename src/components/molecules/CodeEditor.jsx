import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const CodeEditor = ({ 
  initialCode = '', 
  onValidate = null,
  solution = '',
  language = 'dax',
  readOnly = false 
}) => {
  const [code, setCode] = useState(initialCode)
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState(null)
  const [showSolution, setShowSolution] = useState(false)
  
  const highlightDAX = (text) => {
    const keywords = ['CALCULATE', 'SUM', 'AVERAGE', 'COUNT', 'FILTER', 'ALL', 'RELATED', 'IF', 'SWITCH', 'FORMAT', 'VAR', 'RETURN']
    const functions = ['SUMX', 'COUNTX', 'AVERAGEX', 'MAXX', 'MINX', 'CONCATENATEX', 'DIVIDE', 'BLANK', 'TODAY', 'NOW']
    const operators = ['=', '+', '-', '*', '/', '>', '<', '>=', '<=', '<>', '&&', '||']
    
    let highlighted = text
    
    // Highlight keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
      highlighted = highlighted.replace(regex, `<span class="dax-keyword">${keyword.toUpperCase()}</span>`)
    })
    
    // Highlight functions
    functions.forEach(func => {
      const regex = new RegExp(`\\b${func}\\b`, 'gi')
      highlighted = highlighted.replace(regex, `<span class="dax-function">${func.toUpperCase()}</span>`)
    })
    
    // Highlight strings
    highlighted = highlighted.replace(/"([^"]*)"/g, '<span class="dax-string">"$1"</span>')
    highlighted = highlighted.replace(/'([^']*)'/g, '<span class="dax-string">\'$1\'</span>')
    
    // Highlight numbers
    highlighted = highlighted.replace(/\b\d+\.?\d*\b/g, '<span class="dax-number">$&</span>')
    
    // Highlight comments
    highlighted = highlighted.replace(/\/\/.*$/gm, '<span class="dax-comment">$&</span>')
    highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, '<span class="dax-comment">$&</span>')
    
    return highlighted
  }
  
  const handleValidate = async () => {
    if (!onValidate) return
    
    setIsValidating(true)
    
    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const result = await onValidate(code)
    setValidationResult(result)
    setIsValidating(false)
  }
  
  const handleShowSolution = () => {
    setShowSolution(true)
    setCode(solution)
  }
  
return (
    <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between bg-gray-50 px-3 sm:px-4 py-2 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Code" className="w-4 h-4 text-gray-500" />
          <span className="text-sm-mobile sm:text-sm font-medium text-gray-700">
            {language.toUpperCase()} Editor
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {solution && !showSolution && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleShowSolution}
              className="min-touch"
            >
              <ApperIcon name="Lightbulb" className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Show Solution</span>
              <span className="sm:hidden">Solution</span>
            </Button>
          )}
          
          {onValidate && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleValidate}
              disabled={isValidating || readOnly}
              className="min-touch"
            >
              {isValidating ? (
                <ApperIcon name="Loader" className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <ApperIcon name="Play" className="w-4 h-4 mr-1" />
              )}
              <span className="hidden sm:inline">{isValidating ? 'Validating...' : 'Run Code'}</span>
              <span className="sm:hidden">{isValidating ? 'Running...' : 'Run'}</span>
            </Button>
          )}
        </div>
      </div>
      
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          readOnly={readOnly}
          className="w-full h-48 sm:h-64 p-3 sm:p-4 font-mono text-sm-mobile sm:text-sm bg-white border-none resize-none focus:outline-none code-editor"
          placeholder={`Enter your ${language.toUpperCase()} code here...`}
          style={{ fontSize: '16px' }} // Prevents zoom on iOS
        />
        
        {language === 'dax' && (
          <div
            className="absolute inset-0 p-3 sm:p-4 font-mono text-sm-mobile sm:text-sm pointer-events-none overflow-hidden"
            dangerouslySetInnerHTML={{ __html: highlightDAX(code) }}
            style={{ 
              color: 'transparent',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word'
            }}
          />
        )}
      </div>
      
      {validationResult && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-3 sm:p-4 border-t ${
            validationResult.success 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}
        >
          <div className="flex items-start space-x-3">
            <ApperIcon 
              name={validationResult.success ? 'CheckCircle' : 'XCircle'} 
              className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                validationResult.success ? 'text-success' : 'text-error'
              }`} 
            />
            <div className="flex-1 min-w-0">
              <p className={`font-medium text-sm-mobile sm:text-base ${
                validationResult.success ? 'text-success' : 'text-error'
              }`}>
                {validationResult.success ? 'Success!' : 'Error'}
              </p>
              <p className="text-xs-mobile sm:text-sm text-gray-600 mt-1">
                {validationResult.message}
              </p>
              {validationResult.hints && validationResult.hints.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-medium text-gray-500 mb-1">Hints:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {validationResult.hints.map((hint, index) => (
                      <li key={index} className="flex items-start space-x-1">
                        <span>•</span>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default CodeEditor