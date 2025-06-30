import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Editor from '@monaco-editor/react'
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
  const [editorHeight, setEditorHeight] = useState(300)
  const editorRef = useRef(null)
// Configure Monaco Editor for DAX language
  useEffect(() => {
    if (editorRef.current) {
      const monaco = editorRef.current
      
      // Register DAX language
      monaco.languages.register({ id: 'dax' })
      
      // Define DAX syntax highlighting
      monaco.languages.setMonarchTokensProvider('dax', {
        tokenizer: {
          root: [
            [/\b(CALCULATE|SUM|AVERAGE|COUNT|FILTER|ALL|RELATED|IF|SWITCH|FORMAT|VAR|RETURN|SUMX|COUNTX|AVERAGEX|MAXX|MINX|CONCATENATEX|DIVIDE|BLANK|TODAY|NOW)\b/i, 'keyword'],
            [/"([^"\\]|\\.)*$/, 'string.invalid'],
            [/"/, 'string', '@string'],
            [/'([^'\\]|\\.)*$/, 'string.invalid'],
            [/'/, 'string', '@string_single'],
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/\d+/, 'number'],
            [/\/\/.*$/, 'comment'],
            [/\/\*/, 'comment', '@comment'],
            [/[=+\-*/<>!&|]+/, 'operator'],
            [/[()[\]{}]/, 'delimiter'],
            [/[a-zA-Z_$][\w$]*/, 'identifier']
          ],
          string: [
            [/[^\\"]+/, 'string'],
            [/\\./, 'string.escape'],
            [/"/, 'string', '@pop']
          ],
          string_single: [
            [/[^\\']+/, 'string'],
            [/\\./, 'string.escape'],
            [/'/, 'string', '@pop']
          ],
          comment: [
            [/[^\/*]+/, 'comment'],
            [/\*\//, 'comment', '@pop'],
            [/[\/*]/, 'comment']
          ]
        }
      })
      
      // Set DAX theme
      monaco.editor.defineTheme('dax-theme', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'keyword', foreground: '569CD6', fontStyle: 'bold' },
          { token: 'string', foreground: 'CE9178' },
          { token: 'number', foreground: 'B5CEA8' },
          { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
          { token: 'operator', foreground: 'D4D4D4' },
          { token: 'identifier', foreground: '9CDCFE' }
        ],
        colors: {
          'editor.background': '#1F2937',
          'editor.foreground': '#F3F4F6'
        }
      })
    }
  }, [])
  
  // Auto-adjust editor height based on content
  const updateEditorHeight = () => {
    if (editorRef.current) {
      const editor = editorRef.current
      const lineCount = editor.getModel()?.getLineCount() || 1
      const lineHeight = 19
      const padding = 40
      const minHeight = 200
      const maxHeight = 600
      
      const newHeight = Math.min(Math.max(lineCount * lineHeight + padding, minHeight), maxHeight)
      
      if (newHeight !== editorHeight) {
        setEditorHeight(newHeight)
      }
    }
  }
  
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor
    monaco.editor.setTheme('dax-theme')
    
    // Listen for content changes to adjust height
    editor.onDidChangeModelContent(() => {
      updateEditorHeight()
    })
    
    // Initial height adjustment
    setTimeout(updateEditorHeight, 100)
  }
  
  const handleEditorChange = (value) => {
    setCode(value || '')
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
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
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
      
{/* Enhanced Code Editor Area - Flexible Monaco Editor */}
      <div className="flex-1 min-h-0 bg-gray-900 relative">
        <Editor
          value={code}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          language={language === 'dax' ? 'dax' : 'javascript'}
          theme="dax-theme"
          height={editorHeight}
          options={{
            readOnly: readOnly,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: 'on',
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 3,
            renderLineHighlight: 'line',
            automaticLayout: true,
            wordWrap: 'on',
            wrappingIndent: 'indent',
            padding: { top: 16, bottom: 16 },
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8
            },
            overviewRulerBorder: false,
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            contextmenu: true,
            mouseWheelZoom: false,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: true,
            smoothScrolling: true,
            tabSize: 2,
            insertSpaces: true,
            detectIndentation: false,
            renderWhitespace: 'selection',
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true
            }
          }}
        />
        
        {/* Resize indicator */}
        <div className="absolute bottom-2 right-2 opacity-50 hover:opacity-100 transition-opacity">
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <ApperIcon name="Maximize2" className="w-3 h-3" />
            <span>Auto-resize</span>
          </div>
        </div>
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