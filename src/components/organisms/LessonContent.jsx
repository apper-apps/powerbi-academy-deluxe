import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import CodeEditor from '@/components/molecules/CodeEditor'

const LessonContent = ({ lesson, onNext, onPrevious, isCompleted = false }) => {
  const handleExerciseValidation = async (code) => {
    // Simulate validation logic
    const isCorrect = code.trim().toLowerCase().includes('sum') || 
                     code.trim().toLowerCase().includes('calculate')
    
    return {
      success: isCorrect,
      message: isCorrect 
        ? 'Great job! Your DAX formula is correct.' 
        : 'Not quite right. Make sure you\'re using the correct DAX functions.',
      hints: isCorrect ? [] : [
        'Try using the SUM() function',
        'Check your table and column references',
        'Make sure your syntax is correct'
      ]
    }
  }
  
  return (
    <div className="h-full flex">
      {/* Instructions Panel */}
      <div className="w-1/2 p-6 border-r border-gray-200 overflow-y-auto custom-scrollbar">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Lesson Header */}
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <ApperIcon name="BookOpen" className="w-4 h-4" />
              <span>Lesson {lesson.Id}</span>
              <span>•</span>
              <span>{lesson.estimatedTime} min</span>
              {isCompleted && (
                <>
                  <span>•</span>
                  <div className="flex items-center space-x-1 text-success">
                    <ApperIcon name="CheckCircle" className="w-4 h-4" />
                    <span>Completed</span>
                  </div>
                </>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {lesson.title}
            </h1>
          </div>
          
          {/* Lesson Content */}
          <div className="prose prose-gray max-w-none">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <ApperIcon name="Target" className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Learning Objective</h3>
                  <p className="text-gray-700 text-sm">
                    Learn how to create basic calculations in Power BI using DAX formulas 
                    to analyze sales data and generate meaningful insights.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Instructions</h3>
              <p className="text-gray-700 leading-relaxed">
                In this lesson, you'll learn how to create a simple DAX measure to calculate 
                total sales. DAX (Data Analysis Expressions) is the formula language used in 
                Power BI to create custom calculations.
              </p>
              
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <ApperIcon name="Lightbulb" className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Tip</h4>
                    <p className="text-gray-700 text-sm">
                      Start with the SUM function and reference the Sales[Amount] column. 
                      DAX is case-insensitive, but it's good practice to use proper casing.
                    </p>
                  </div>
                </div>
              </div>
              
              <h4 className="font-medium text-gray-900">Steps to Complete:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Create a new measure called "Total Sales"</li>
                <li>Use the SUM function to aggregate the Sales[Amount] column</li>
                <li>Test your formula in the code editor</li>
                <li>Click "Run Code" to validate your solution</li>
              </ol>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={!onPrevious}
            >
              <ApperIcon name="ChevronLeft" className="w-4 h-4 mr-1" />
              Previous
            </Button>
            
            <Button
              variant="primary"
              onClick={onNext}
              disabled={!isCompleted}
            >
              Next Lesson
              <ApperIcon name="ChevronRight" className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Practice Panel */}
      <div className="w-1/2 p-6 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Practice Exercise</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <ApperIcon name="Code" className="w-4 h-4" />
              <span>DAX Formula</span>
            </div>
          </div>
          
          <CodeEditor
            initialCode="// Create a measure to calculate Total Sales\n// Hint: Use SUM(Sales[Amount])\n\nTotal Sales = "
            onValidate={handleExerciseValidation}
            solution="Total Sales = SUM(Sales[Amount])"
            language="dax"
          />
          
          {/* Power BI Preview Panel */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Power BI Preview</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-xs text-gray-500">Connected</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 min-h-32 flex items-center justify-center">
              <div className="text-center">
                <ApperIcon name="BarChart3" className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">
                  Your visualization will appear here once you run the code
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LessonContent