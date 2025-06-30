import { motion } from "framer-motion";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import CodeEditor from "@/components/molecules/CodeEditor";
import VideoPlayer from "@/components/molecules/VideoPlayer";

const LessonContent = ({ lesson, onNext, onPrevious, isCompleted = false }) => {
  // State management
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [showPractice, setShowPractice] = useState(false);
  const [visualizationData, setVisualizationData] = useState(null);
  const [visualizationLoading, setVisualizationLoading] = useState(false);
  
  // Derived state
  const hasVideo = lesson.videoUrl && lesson.videoUrl.length > 0;
  const hasExercise = lesson.exercises && lesson.exercises.length > 0;
  
const handleExerciseValidation = async (code) => {
    try {
      setVisualizationLoading(true);
      
      // Simulate validation logic
      const isCorrect = code.trim().toLowerCase().includes('sum') || 
                       code.trim().toLowerCase().includes('calculate');
      
      // Generate visualization data if correct
      if (isCorrect) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate sample visualization data
        setVisualizationData({
          type: 'bar',
          title: 'Total Sales by Category',
          colors: ['#3B82F6', '#8B5CF6', '#10B981'],
          categories: ['Electronics', 'Clothing', 'Books', 'Home'],
          series: [{
            name: 'Sales Amount',
            data: [45000, 32000, 18000, 27000]
          }]
        });
      } else {
        setVisualizationData(null);
      }
      
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
      };
    } catch (error) {
      console.error('Exercise validation error:', error);
      return {
        success: false,
        message: 'An error occurred while validating your code. Please try again.',
        hints: ['Check your syntax and try again']
      };
    } finally {
      setVisualizationLoading(false);
    }
  };
  
const handleVideoProgress = (progress) => {
    setVideoProgress(progress.played)
  }

  const handleChapterChange = (chapter) => {
    setCurrentChapter(chapter)
  }

return (
    <div className="h-full flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Instructions Panel */}
      <div className="w-full md:w-1/2 p-4 sm:p-6 md:border-r border-gray-200 overflow-y-auto custom-scrollbar order-2 md:order-1">
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
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 mb-6 border border-blue-100 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-lg p-2">
                  <ApperIcon name="Target" className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Learning Objective</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {lesson.objective || 'Learn how to create basic calculations in Power BI using DAX formulas to analyze sales data and generate meaningful insights.'}
                  </p>
                </div>
              </div>
            </div>
            
<div className="space-y-6">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <ApperIcon name="BookOpen" className="w-5 h-5 mr-2 text-blue-600" />
                  Instructions
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {lesson.content}
                </p>
              </div>
              
              {lesson.tips && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-5 border border-yellow-200">
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-100 rounded-lg p-2">
                      <ApperIcon name="Lightbulb" className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">💡 Pro Tip</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {lesson.tips}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
{lesson.steps && (
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <ApperIcon name="CheckSquare" className="w-5 h-5 mr-2 text-green-600" />
                    Steps to Complete:
                  </h4>
                  <ol className="space-y-3">
                    {lesson.steps.map((step, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-gray-700 leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
          
{/* Continue Learning Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-center text-white shadow-lg">
            <div className="bg-white bg-opacity-20 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <ApperIcon name="BookOpen" className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Continue Learning</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              {hasExercise 
                ? "Complete the practice exercise to unlock the next lesson and continue your journey." 
                : "Review the instructions and continue your learning journey."
              }
            </p>
            <Button
              variant="secondary"
              onClick={onNext}
              disabled={!isCompleted}
              className="min-touch bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3"
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
              className="min-touch flex items-center space-x-2"
            >
              <ApperIcon name="ChevronLeft" className="w-4 h-4" />
              <span className="hidden sm:inline">Previous Lesson</span>
              <span className="sm:hidden">Previous</span>
            </Button>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <ApperIcon name="Clock" className="w-4 h-4" />
              <span>{lesson.estimatedTime} min remaining</span>
            </div>
            
            <Button
              variant="primary"
              onClick={onNext}
              disabled={!isCompleted}
              className="min-touch flex items-center space-x-2"
            >
              <span className="hidden sm:inline">Next Lesson</span>
              <span className="sm:hidden">Next</span>
              <ApperIcon name="ChevronRight" className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
      
{/* Video/Practice Panel */}
      <div className="w-full md:w-1/2 flex flex-col order-1 md:order-2 bg-white">
        {/* Toggle Buttons */}
        {hasVideo && hasExercise && (
          <div className="bg-gray-50 border-b border-gray-200 p-4">
            <div className="flex space-x-2">
              <Button
                variant={!showPractice ? "primary" : "outline"}
                onClick={() => setShowPractice(false)}
                className="flex-1 min-touch flex items-center justify-center space-x-2 py-3"
              >
                <ApperIcon name="Play" className="w-4 h-4" />
                <span className="hidden sm:inline">Video Demonstration</span>
                <span className="sm:hidden">Video</span>
              </Button>
              <Button
                variant={showPractice ? "primary" : "outline"}
                onClick={() => setShowPractice(true)}
                className="flex-1 min-touch flex items-center justify-center space-x-2 py-3"
              >
                <ApperIcon name="Code" className="w-4 h-4" />
                <span className="hidden sm:inline">Practice Exercise</span>
                <span className="sm:hidden">Practice</span>
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
              className="h-full p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-blue-50 overflow-y-auto"
            >
              <div className="space-y-6">
                {/* Exercise Header */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <div className="bg-blue-100 rounded-lg p-2 mr-3">
                        <ApperIcon name="Code" className="w-5 h-5 text-blue-600" />
                      </div>
                      Practice Exercise
                    </h2>
                    <div className="flex items-center space-x-2">
                      <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                        DAX Formula
                      </div>
                    </div>
                  </div>
                  
                  {/* Exercise Instructions */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <ApperIcon name="Target" className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-2">Exercise Goal</h3>
                        <p className="text-blue-800 text-sm leading-relaxed">
                          {lesson.exercises[0]?.instructions || "Create a DAX measure to calculate key business metrics using the provided dataset."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CodeEditor
                  initialCode={lesson.exercises[0]?.startingCode || "// Create a measure to calculate Total Sales\n// Hint: Use SUM(Sales[Amount])\n\nTotal Sales = "}
                  onValidate={handleExerciseValidation}
                  solution={lesson.exercises[0]?.solution || "Total Sales = SUM(Sales[Amount])"}
                  language="dax"
                />
                
{/* Power BI Preview Panel */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 flex items-center">
                        <ApperIcon name="BarChart3" className="w-5 h-5 mr-2 text-blue-600" />
                        Power BI Preview
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          visualizationData ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                        }`}></div>
                        <span className="text-xs text-gray-600 font-medium">
                          {visualizationData ? 'Live Preview' : 'Waiting for DAX'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {visualizationLoading ? (
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 min-h-80 flex items-center justify-center">
                        <div className="text-center">
                          <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <ApperIcon name="Loader" className="w-8 h-8 text-blue-600 animate-spin" />
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">Generating Visualization</h4>
                          <p className="text-gray-600 text-sm">Processing your DAX code...</p>
                        </div>
                      </div>
                    ) : visualizationData ? (
                      <div className="space-y-4">
                        <div className="text-center mb-4">
                          <h4 className="font-semibold text-gray-900 text-lg">{visualizationData.title}</h4>
                          <p className="text-gray-600 text-sm">Generated from your DAX formula</p>
                        </div>
                        
<div className="h-80">
                          {visualizationData?.type === 'bar' && (
                            <Chart
                              options={{
                                chart: { type: 'bar', toolbar: { show: false } },
                                plotOptions: { bar: { borderRadius: 4, horizontal: false } },
                                colors: visualizationData.colors || ['#3B82F6'],
                                xaxis: { categories: visualizationData.categories || [] },
                                yaxis: { labels: { formatter: (val) => `$${val?.toLocaleString() || 0}` } },
                                dataLabels: { enabled: false },
                                grid: { strokeDashArray: 3 },
                                theme: { mode: 'light' }
                              }}
                              series={visualizationData.series || []}
                              type="bar"
                              height="100%"
                            />
                          )}
                          
{visualizationData?.type === 'donut' && (
                            <Chart
                              options={{
                                chart: { type: 'donut' },
                                labels: visualizationData.labels || [],
                                colors: visualizationData.colors || ['#3B82F6'],
                                legend: { position: 'bottom' },
                                dataLabels: { enabled: true },
                                plotOptions: { pie: { donut: { size: '60%' } } }
                              }}
                              series={visualizationData.series || []}
                              type="donut"
                              height="100%"
                            />
                          )}
{visualizationData?.type === 'line' && (
                            <Chart
                              options={{
                                chart: { type: 'line', toolbar: { show: false } },
                                stroke: { curve: 'smooth', width: 3 },
                                colors: visualizationData.colors || ['#3B82F6'],
                                xaxis: { categories: visualizationData.categories || [] },
                                yaxis: { labels: { formatter: (val) => `$${val?.toLocaleString() || 0}` } },
                                dataLabels: { enabled: false },
                                grid: { strokeDashArray: 3 },
                                markers: { size: 6 }
                              }}
                              series={visualizationData.series || []}
                              type="line"
                              height="100%"
                            />
                          )}
                        </div>
                        
                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <div className="flex items-center space-x-2">
                            <ApperIcon name="CheckCircle" className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">
                              Visualization successfully generated from DAX formula
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8 min-h-80 flex items-center justify-center border-2 border-dashed border-gray-300">
                        <div className="text-center">
                          <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <ApperIcon name="BarChart3" className="w-8 h-8 text-blue-600" />
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">Visualization Preview</h4>
                          <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                            Your data visualization will appear here once you run your DAX code successfully
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LessonContent