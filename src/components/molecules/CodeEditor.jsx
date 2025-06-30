import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 sm:px-5 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 rounded-lg p-1.5">
              <ApperIcon name="Code" className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-white font-semibold text-sm sm:text-base">
                {language.toUpperCase()} Editor
              </span>
              <div className="text-gray-400 text-xs">
                Write and test your code
              </div>
            </div>
          </div>
<div className="flex items-center space-x-2">
            {solution && !showSolution && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShowSolution}
                className="min-touch text-yellow-400 hover:text-yellow-300 hover:bg-gray-700 border border-gray-600"
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
                className="min-touch bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2"
              >
                {isValidating ? (
                  <ApperIcon name="Loader" className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ApperIcon name="Play" className="w-4 h-4 mr-2" />
                )}
                <span className="hidden sm:inline">{isValidating ? 'Validating Code...' : 'Run & Test'}</span>
                <span className="sm:hidden">{isValidating ? 'Testing...' : 'Run'}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      
{/* Enhanced Code Editor Area */}
      <div className="relative bg-gray-900">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          readOnly={readOnly}
          className="w-full h-56 sm:h-72 p-4 sm:p-5 font-mono text-sm sm:text-base bg-gray-900 text-gray-100 border-none resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset code-editor"
          placeholder={`// Enter your ${language.toUpperCase()} code here...\n// Use the hints and documentation to guide you`}
          style={{ fontSize: '16px' }} // Prevents zoom on iOS
        />
        
        {/* Line Numbers */}
        <div className="absolute left-2 top-4 sm:top-5 text-gray-500 font-mono text-sm pointer-events-none select-none">
          {code.split('\n').map((_, index) => (
            <div key={index} className="leading-6 text-right pr-2" style={{ minWidth: '2em' }}>
              {index + 1}
            </div>
          ))}
        </div>
        
        {language === 'dax' && (
          <div
            className="absolute inset-0 p-4 sm:p-5 pl-12 font-mono text-sm sm:text-base pointer-events-none overflow-hidden"
            dangerouslySetInnerHTML={{ __html: highlightDAX(code) }}
            style={{ 
              color: 'transparent',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word'
            }}
          />
        )}
      </div>
      
{/* Enhanced Validation Results */}
      <AnimatePresence>
        {validationResult && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`border-t ${
              validationResult.success 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200'
            }`}
          >
            <div className="p-4 sm:p-5">
              <div className="flex items-start space-x-4">
                <div className={`rounded-full p-2 ${
                  validationResult.success ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <ApperIcon 
                    name={validationResult.success ? 'CheckCircle' : 'AlertCircle'} 
                    className={`w-5 h-5 ${
                      validationResult.success ? 'text-green-600' : 'text-red-600'
                    }`} 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className={`font-bold text-base ${
                      validationResult.success ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {validationResult.success ? '🎉 Excellent Work!' : '❌ Needs Improvement'}
                    </h4>
                    {validationResult.success && (
                      <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                        PASSED
                      </div>
                    )}
                  </div>
                  
                  <p className={`text-sm sm:text-base leading-relaxed mb-3 ${
                    validationResult.success ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {validationResult.message}
                  </p>
                  
                  {validationResult.hints && validationResult.hints.length > 0 && (
                    <div className="bg-white bg-opacity-60 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <ApperIcon name="Lightbulb" className="w-4 h-4 text-yellow-600" />
                        <p className="text-sm font-semibold text-gray-700">💡 Helpful Hints:</p>
                      </div>
                      <ul className="space-y-2">
                        {validationResult.hints.map((hint, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                            <div className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <span className="leading-relaxed">{hint}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CodeEditor