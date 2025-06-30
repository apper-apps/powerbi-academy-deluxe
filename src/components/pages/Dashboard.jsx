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
      <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-6 sm:space-y-8 pb-safe-bottom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Welcome back to PowerBI Academy!
            </h1>
            <p className="text-gray-600 text-sm-mobile sm:text-base">
              Continue your Power BI learning journey. You're making great progress!
            </p>
          </div>
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center space-y-2 xs:space-y-0 xs:space-x-3">
            <Badge variant="primary" size="lg" className="text-center xs:text-left">
              Skill Level: {dashboardData.skillLevel}
            </Badge>
            <Button
              variant="primary"
              onClick={() => navigate('/modules')}
              className="min-touch"
            >
              <ApperIcon name="Play" className="w-4 h-4 mr-2" />
              Continue Learning
            </Button>
          </div>
        </motion.div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 touch:hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center shadow-lg`}>
                  <ApperIcon name={stat.icon} className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                {stat.progress && (
                  <ProgressRing 
                    progress={stat.progress} 
                    size={40} 
                    strokeWidth={3}
                    showLabel={false}
                    className="sm:hidden"
                  />
                )}
                {stat.progress && (
                  <ProgressRing 
                    progress={stat.progress} 
                    size={50} 
                    strokeWidth={4}
                    showLabel={false}
                    className="hidden sm:block"
                  />
                )}
              </div>
              
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {stat.value}
                  {stat.total && <span className="text-gray-400">/{stat.total}</span>}
                  {stat.suffix && <span className="text-base sm:text-lg text-gray-500 ml-1">{stat.suffix}</span>}
                </p>
                <p className="text-gray-600 text-xs-mobile sm:text-sm mt-1">{stat.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
{/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {/* Recent Lessons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Lessons</h2>
              <Button
                variant="ghost"
                onClick={() => navigate('/progress')}
                className="text-sm-mobile sm:text-base min-touch"
              >
                <span className="hidden sm:inline">View All</span>
                <span className="sm:hidden">All</span>
                <ApperIcon name="ArrowRight" className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {recentLessons.map((lesson, index) => (
                <motion.div
                  key={lesson.Id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onClick={() => navigate(`/lesson/${lesson.moduleId}/${lesson.Id}`)}
                  className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200 min-touch"
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                    lesson.completed ? 'bg-success text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <ApperIcon 
                      name={lesson.completed ? 'Check' : 'Play'} 
                      className="w-4 h-4 sm:w-5 sm:h-5" 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm-mobile sm:text-base truncate">{lesson.title}</h3>
                    <div className="flex items-center space-x-2 sm:space-x-3 mt-1">
                      <span className="text-xs-mobile sm:text-sm text-gray-500 truncate">{lesson.module}</span>
                      <span className="text-xs-mobile sm:text-sm text-gray-400">•</span>
                      <span className="text-xs-mobile sm:text-sm text-gray-500">{lesson.estimatedTime} min</span>
                      {lesson.completed && (
                        <>
                          <span className="text-xs-mobile sm:text-sm text-gray-400 hidden xs:inline">•</span>
                          <Badge variant="success" size="sm" className="hidden xs:inline-flex">Completed</Badge>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <ApperIcon name="ChevronRight" className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Recommended Modules */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Recommended For You</h2>
            
            <div className="space-y-3 sm:space-y-4">
              {recommendedModules.map((module, index) => (
                <motion.div
                  key={module.Id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  onClick={() => navigate(`/lesson/${module.Id}/${module.lessons[0]?.Id || 1}`)}
                  className="p-3 sm:p-4 rounded-lg border-2 border-gray-100 hover:border-primary hover:shadow-md cursor-pointer transition-all duration-200 group min-touch"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow duration-200 flex-shrink-0">
                      <ApperIcon name="BookOpen" className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 text-sm-mobile sm:text-base truncate">
                        {module.title}
                      </h3>
                      <p className="text-xs-mobile sm:text-sm text-gray-600 mt-1 line-clamp-2">
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
              className="w-full mt-4 sm:mt-6 min-touch"
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
          className="bg-gradient-to-r from-primary to-secondary rounded-xl shadow-xl p-6 sm:p-8 text-white"
        >
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Ready to level up your Power BI skills?</h2>
              <p className="text-white text-opacity-90 text-sm-mobile sm:text-base">
                Explore advanced modules and practice with real-world datasets.
              </p>
            </div>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <Button
                variant="secondary"
                onClick={() => navigate('/resources')}
                className="min-touch"
              >
                <ApperIcon name="Download" className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Download Resources</span>
                <span className="sm:hidden">Resources</span>
              </Button>
              <Button
                variant="accent"
                onClick={() => navigate('/modules')}
                className="min-touch"
              >
                <ApperIcon name="Rocket" className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Start New Module</span>
                <span className="sm:hidden">New Module</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard