import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import LessonContent from '@/components/organisms/LessonContent'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { getLessonById } from '@/services/api/lessonService'
import { getModuleById } from '@/services/api/moduleService'
import { markLessonComplete, getUserProgress } from '@/services/api/progressService'

const LessonPage = () => {
  const { moduleId, lessonId } = useParams()
  const navigate = useNavigate()
  
  const [lesson, setLesson] = useState(null)
  const [module, setModule] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  
  const loadLessonData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [lessonData, moduleData, progress] = await Promise.all([
        getLessonById(parseInt(lessonId)),
        getModuleById(parseInt(moduleId)),
        getUserProgress()
      ])
      
      setLesson(lessonData)
      setModule(moduleData)
      setIsCompleted(progress.completedLessons?.includes(lessonData.Id) || false)
      
      // Find current lesson index
      const lessonIndex = moduleData.lessons.findIndex(l => l.Id === lessonData.Id)
      setCurrentLessonIndex(lessonIndex)
      
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadLessonData()
  }, [moduleId, lessonId])
  
  const handleLessonComplete = async () => {
    try {
      await markLessonComplete(parseInt(lessonId))
      setIsCompleted(true)
      toast.success('Lesson completed! 🎉')
    } catch (err) {
      toast.error('Failed to mark lesson as complete')
    }
  }
  
  const handleNext = () => {
    if (currentLessonIndex < module.lessons.length - 1) {
      const nextLesson = module.lessons[currentLessonIndex + 1]
      navigate(`/lesson/${moduleId}/${nextLesson.Id}`)
    } else {
      // Last lesson in module
      toast.success('Module completed! 🏆')
      navigate('/modules')
    }
  }
  
  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      const prevLesson = module.lessons[currentLessonIndex - 1]
      navigate(`/lesson/${moduleId}/${prevLesson.Id}`)
    }
  }
  
  if (loading) return <Loading type="lesson" />
  if (error) return <Error message={error} onRetry={loadLessonData} type="lesson" />
  if (!lesson || !module) return <Error message="Lesson not found" type="lesson" />
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/modules')}
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-1" />
            Back to Modules
          </Button>
          
          <div className="h-6 w-px bg-gray-300"></div>
          
          <div>
            <h1 className="font-semibold text-gray-900">{module.title}</h1>
            <p className="text-sm text-gray-500">
              Lesson {currentLessonIndex + 1} of {module.lessons.length}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Progress Bar */}
          <div className="hidden sm:flex items-center space-x-3">
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${((currentLessonIndex + 1) / module.lessons.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-sm text-gray-600 whitespace-nowrap">
              {Math.round(((currentLessonIndex + 1) / module.lessons.length) * 100)}%
            </span>
          </div>
          
          {!isCompleted && (
            <Button
              variant="success"
              onClick={handleLessonComplete}
            >
              <ApperIcon name="Check" className="w-4 h-4 mr-1" />
              Mark Complete
            </Button>
          )}
        </div>
      </motion.div>
      
      {/* Lesson Content */}
      <div className="flex-1 overflow-hidden">
        <LessonContent
          lesson={lesson}
          onNext={handleNext}
          onPrevious={currentLessonIndex > 0 ? handlePrevious : null}
          isCompleted={isCompleted}
        />
      </div>
      
      {/* Mobile Progress */}
      <div className="sm:hidden bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Lesson Progress</span>
          <span className="text-sm text-gray-600">
            {currentLessonIndex + 1} / {module.lessons.length}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${((currentLessonIndex + 1) / module.lessons.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  )
}

export default LessonPage