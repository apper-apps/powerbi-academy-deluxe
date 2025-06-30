import { motion } from "framer-motion";
import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import CodeEditor from "@/components/molecules/CodeEditor";
import VideoPlayer from "@/components/molecules/VideoPlayer";
const LessonContent = ({ lesson, onNext, onPrevious, isCompleted = false }) => {
  // State management
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [showPractice, setShowPractice] = useState(false);
  
  // Derived state
  const hasVideo = lesson.videoUrl && lesson.videoUrl.length > 0;
  const hasExercise = lesson.exercises && lesson.exercises.length > 0;
  
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
  
const handleVideoProgress = (progress) => {
    setVideoProgress(progress.played)
  }

  const handleChapterChange = (chapter) => {
    setCurrentChapter(chapter)
  }

return (
    <div className="h-full flex flex-col md:flex-row">
      {/* Instructions Panel */}
      <div className="w-full md:w-1/2 p-6 md:border-r border-gray-200 overflow-y-auto custom-scrollbar order-2 md:order-1">
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
          
          {/* Current Chapter Display */}
          {currentChapter && (
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Play" className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  Now Playing: {currentChapter.title}
                </span>
              </div>
            </div>
          )}
          
          {/* Lesson Content */}
          <div className="prose prose-gray max-w-none">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <ApperIcon name="Target" className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Learning Objective</h3>
                  <p className="text-gray-700 text-sm">
                    {lesson.objective || 'Learn how to create basic calculations in Power BI using DAX formulas to analyze sales data and generate meaningful insights.'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Instructions</h3>
              <p className="text-gray-700 leading-relaxed">
                {lesson.content}
              </p>
              
              {lesson.tips && (
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <ApperIcon name="Lightbulb" className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Tip</h4>
                      <p className="text-gray-700 text-sm">
                        {lesson.tips}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {lesson.steps && (
                <>
                  <h4 className="font-medium text-gray-900">Steps to Complete:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    {lesson.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </>
)}
            </div>
          </div>
          
          {/* Continue Learning Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 text-center">
            <ApperIcon name="BookOpen" className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Continue Learning</h3>
            <p className="text-gray-600 mb-6">
              Review the instructions and complete this lesson to continue your learning journey.
            </p>
            <Button
              variant="primary"
              onClick={onNext}
              disabled={!isCompleted}
              className="min-touch"
            >
              <ApperIcon name="ArrowRight" className="w-4 h-4 mr-2" />
              Continue Learning
            </Button>
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
      
{/* Video/Practice Panel */}
      <div className="w-full md:w-1/2 flex flex-col order-1 md:order-2">
        {/* Toggle Buttons */}
        {hasVideo && hasExercise && (
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex space-x-2">
              <Button
                variant={!showPractice ? "primary" : "outline"}
                onClick={() => setShowPractice(false)}
                className="flex-1"
              >
                <ApperIcon name="Play" className="w-4 h-4 mr-1" />
                Video Demonstration
              </Button>
              <Button
                variant={showPractice ? "primary" : "outline"}
                onClick={() => setShowPractice(true)}
                className="flex-1"
              >
                <ApperIcon name="Code" className="w-4 h-4 mr-1" />
                Practice Exercise
              </Button>
            </div>
          </div>
        )}
        
        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {/* Video Player */}
          {hasVideo && (!hasExercise || !showPractice) && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full p-6 bg-gray-50"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Video Demonstration</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <ApperIcon name="Play" className="w-4 h-4" />
                    <span>Watch & Learn</span>
                  </div>
                </div>
                
                <VideoPlayer
                  videoUrl={lesson.videoUrl}
                  chapters={lesson.chapters || []}
                  onProgress={handleVideoProgress}
                  onChapterChange={handleChapterChange}
                  className="h-96"
                />
                
                {/* Video Progress */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Video Progress</span>
                    <span className="text-sm text-gray-600">
                      {Math.round(videoProgress * 100)}% Complete
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                      style={{ width: `${videoProgress * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Practice Exercise */}
          {hasExercise && (!hasVideo || showPractice) && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full p-6 bg-gray-50 overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Practice Exercise</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <ApperIcon name="Code" className="w-4 h-4" />
                    <span>DAX Formula</span>
                  </div>
                </div>
                
                <CodeEditor
                  initialCode={lesson.exercises[0]?.startingCode || "// Create a measure to calculate Total Sales\n// Hint: Use SUM(Sales[Amount])\n\nTotal Sales = "}
                  onValidate={handleExerciseValidation}
                  solution={lesson.exercises[0]?.solution || "Total Sales = SUM(Sales[Amount])"}
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
              </div>
            </motion.div>
          )}
)}
        </div>
      </div>
    </div>
  )
}

export default LessonContent