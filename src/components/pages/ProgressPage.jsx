import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ProgressRing from '@/components/atoms/ProgressRing'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { getUserProgress, getDetailedProgress } from '@/services/api/progressService'

const ProgressPage = () => {
  const navigate = useNavigate()
  const [progressData, setProgressData] = useState(null)
  const [detailedProgress, setDetailedProgress] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  
  const loadProgressData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [progress, detailed] = await Promise.all([
        getUserProgress(),
        getDetailedProgress()
      ])
      
      setProgressData(progress)
      setDetailedProgress(detailed)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadProgressData()
  }, [])
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadProgressData} type="progress" />
  if (!progressData) return <Empty type="progress" onAction={() => navigate('/modules')} />
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'modules', label: 'Modules', icon: 'BookOpen' },
    { id: 'achievements', label: 'Achievements', icon: 'Award' },
    { id: 'stats', label: 'Statistics', icon: 'TrendingUp' }
  ]
  
  const achievements = [
    { id: 1, name: 'First Steps', description: 'Complete your first lesson', icon: 'Baby', earned: true },
    { id: 2, name: 'Data Explorer', description: 'Complete the Data Fundamentals module', icon: 'Database', earned: true },
    { id: 3, name: 'Visualization Master', description: 'Create 10 different chart types', icon: 'BarChart3', earned: false },
    { id: 4, name: 'DAX Apprentice', description: 'Write 5 DAX formulas', icon: 'Code', earned: false },
    { id: 5, name: 'Speed Learner', description: 'Complete 3 lessons in one day', icon: 'Zap', earned: true },
    { id: 6, name: 'Consistent Learner', description: 'Learn for 7 days straight', icon: 'Calendar', earned: false }
  ]
  
  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Learning Progress</h1>
          <p className="text-xl text-gray-600">
            Track your Power BI learning journey and celebrate your achievements!
          </p>
        </motion.div>
        
        {/* Overall Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <ProgressRing 
              progress={progressData.overallProgress} 
              size={120} 
              className="mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Overall Progress</h3>
            <p className="text-gray-600">
              {progressData.completedLessons} of {progressData.totalLessons} lessons completed
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-success to-green-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="Trophy" className="w-6 h-6 text-white" />
              </div>
              <Badge variant="success" size="lg">
                Level {progressData.skillLevel}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Skill Level</h3>
            <p className="text-gray-600 mb-4">
              {progressData.totalHours} hours of learning completed
            </p>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-success to-green-600 rounded-full"
                style={{ width: `${(progressData.skillProgress || 60)}%` }}
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-warning to-yellow-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="Flame" className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {progressData.streak}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Learning Streak</h3>
            <p className="text-gray-600">
              {progressData.streak} {progressData.streak === 1 ? 'day' : 'days'} in a row!
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Keep it up to maintain your streak 🔥
            </p>
          </motion.div>
        </div>
        
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <ApperIcon name={tab.icon} className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
          
<div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <p className="text-sm text-gray-500">{detailedProgress.length} completed lessons</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {detailedProgress.slice(0, 6).map((activity, index) => (
                    <motion.div
                      key={activity.Id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                          <ApperIcon name="Check" className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
                            {activity.lessonTitle}
                          </h4>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                            {activity.moduleTitle}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge variant="success" size="sm">
                              Score: {activity.score}%
                            </Badge>
                            <p className="text-xs text-gray-500">{activity.completedAt}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
{/* Learning Statistics */}
                <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{progressData.totalHours}h</p>
                    <p className="text-sm text-gray-600">Total Learning Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{detailedProgress.length}</p>
                    <p className="text-sm text-gray-600">Lessons Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-warning">{Math.round(detailedProgress.reduce((sum, a) => sum + a.score, 0) / detailedProgress.length)}%</p>
                    <p className="text-sm text-gray-600">Average Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary">{progressData.streak}</p>
                    <p className="text-sm text-gray-600">Day Streak</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'achievements' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-xl border-2 ${
                      achievement.earned
                        ? 'border-primary bg-gradient-to-br from-primary/5 to-secondary/5'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      achievement.earned
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      <ApperIcon name={achievement.icon} className="w-6 h-6" />
                    </div>
                    <h4 className={`font-semibold mb-2 ${
                      achievement.earned ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {achievement.name}
                    </h4>
                    <p className={`text-sm ${
                      achievement.earned ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                    {achievement.earned && (
                      <Badge variant="success" size="sm" className="mt-3" earned>
                        <ApperIcon name="Check" className="w-3 h-3 mr-1" />
                        Earned
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
        
{/* Continue Learning CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-primary to-secondary rounded-xl shadow-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <ApperIcon name="Target" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Keep Up The Great Work!</h2>
                <p className="text-white text-opacity-90 text-sm">
                  You're {progressData.overallProgress}% through your Power BI learning journey
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate('/modules')}
              className="flex-shrink-0"
            >
              <ApperIcon name="BookOpen" className="w-4 h-4 mr-2" />
              Continue Learning
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProgressPage