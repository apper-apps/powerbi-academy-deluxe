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
import { getDashboardStats, getRecentLessons, getRecommendedModules } from '@/services/api/dashboardService'

const Dashboard = () => {
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState(null)
  const [recentLessons, setRecentLessons] = useState([])
  const [recommendedModules, setRecommendedModules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [stats, recent, recommended] = await Promise.all([
        getDashboardStats(),
        getRecentLessons(),
        getRecommendedModules()
      ])
      
      setDashboardData(stats)
      setRecentLessons(recent)
      setRecommendedModules(recommended)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadDashboardData()
  }, [])
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadDashboardData} />
  if (!dashboardData) return <Empty type="dashboard" onAction={() => navigate('/modules')} />
  
  const statCards = [
    {
      title: 'Modules Completed',
      value: dashboardData.completedModules,
      total: dashboardData.totalModules,
      icon: 'BookOpen',
      color: 'from-primary to-secondary',
      progress: (dashboardData.completedModules / dashboardData.totalModules) * 100
    },
    {
      title: 'Lessons Finished',
      value: dashboardData.completedLessons,
      total: dashboardData.totalLessons,
      icon: 'GraduationCap',
      color: 'from-success to-green-600',
      progress: (dashboardData.completedLessons / dashboardData.totalLessons) * 100
    },
    {
      title: 'Learning Hours',
      value: dashboardData.totalHours,
      icon: 'Clock',
      color: 'from-info to-accent',
      suffix: 'hrs'
    },
    {
      title: 'Current Streak',
      value: dashboardData.streak,
      icon: 'Flame',
      color: 'from-warning to-yellow-600',
      suffix: 'days'
    }
  ]
  
  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back to PowerBI Academy!
            </h1>
            <p className="text-gray-600">
              Continue your Power BI learning journey. You're making great progress!
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <Badge variant="primary" size="lg">
              Skill Level: {dashboardData.skillLevel}
            </Badge>
            <Button
              variant="primary"
              onClick={() => navigate('/modules')}
            >
              <ApperIcon name="Play" className="w-4 h-4 mr-2" />
              Continue Learning
            </Button>
          </div>
        </motion.div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center shadow-lg`}>
                  <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
                </div>
                {stat.progress && (
                  <ProgressRing 
                    progress={stat.progress} 
                    size={50} 
                    strokeWidth={4}
                    showLabel={false}
                  />
                )}
              </div>
              
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                  {stat.total && <span className="text-gray-400">/{stat.total}</span>}
                  {stat.suffix && <span className="text-lg text-gray-500 ml-1">{stat.suffix}</span>}
                </p>
                <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Lessons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Lessons</h2>
              <Button
                variant="ghost"
                onClick={() => navigate('/progress')}
              >
                View All
                <ApperIcon name="ArrowRight" className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentLessons.map((lesson, index) => (
                <motion.div
                  key={lesson.Id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onClick={() => navigate(`/lesson/${lesson.moduleId}/${lesson.Id}`)}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    lesson.completed ? 'bg-success text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <ApperIcon 
                      name={lesson.completed ? 'Check' : 'Play'} 
                      className="w-5 h-5" 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-sm text-gray-500">{lesson.module}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{lesson.estimatedTime} min</span>
                      {lesson.completed && (
                        <>
                          <span className="text-sm text-gray-400">•</span>
                          <Badge variant="success" size="sm">Completed</Badge>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <ApperIcon name="ChevronRight" className="w-5 h-5 text-gray-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Recommended Modules */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recommended For You</h2>
            
            <div className="space-y-4">
              {recommendedModules.map((module, index) => (
                <motion.div
                  key={module.Id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  onClick={() => navigate(`/lesson/${module.Id}/${module.lessons[0]?.Id || 1}`)}
                  className="p-4 rounded-lg border-2 border-gray-100 hover:border-primary hover:shadow-md cursor-pointer transition-all duration-200 group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow duration-200">
                      <ApperIcon name="BookOpen" className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors duration-200">
                        {module.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {module.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="info" size="sm">{module.difficulty}</Badge>
                        <span className="text-xs text-gray-500">
                          {module.lessons?.length || 0} lessons
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Button
              variant="outline"
              className="w-full mt-6"
              onClick={() => navigate('/modules')}
            >
              <ApperIcon name="Grid" className="w-4 h-4 mr-2" />
              Browse All Modules
            </Button>
          </motion.div>
        </div>
        
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-primary to-secondary rounded-xl shadow-xl p-8 text-white"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Ready to level up your Power BI skills?</h2>
              <p className="text-white text-opacity-90">
                Explore advanced modules and practice with real-world datasets.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button
                variant="secondary"
                onClick={() => navigate('/resources')}
              >
                <ApperIcon name="Download" className="w-4 h-4 mr-2" />
                Download Resources
              </Button>
              <Button
                variant="accent"
                onClick={() => navigate('/modules')}
              >
                <ApperIcon name="Rocket" className="w-4 h-4 mr-2" />
                Start New Module
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard