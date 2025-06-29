import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ModuleCard from '@/components/molecules/ModuleCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { getAllModules } from '@/services/api/moduleService'
import { getUserProgress } from '@/services/api/progressService'

const ModulesPage = () => {
  const [modules, setModules] = useState([])
  const [userProgress, setUserProgress] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDifficulty, setFilterDifficulty] = useState('all')
  const [sortBy, setSortBy] = useState('order')
  
  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [modulesData, progressData] = await Promise.all([
        getAllModules(),
        getUserProgress()
      ])
      
      setModules(modulesData)
      setUserProgress(progressData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadData()
  }, [])
  
  const filteredAndSortedModules = modules
    .filter(module => {
      const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           module.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDifficulty = filterDifficulty === 'all' || 
                               module.difficulty.toLowerCase() === filterDifficulty.toLowerCase()
      return matchesSearch && matchesDifficulty
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'difficulty':
          const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 }
          return difficultyOrder[a.difficulty.toLowerCase()] - difficultyOrder[b.difficulty.toLowerCase()]
        case 'title':
          return a.title.localeCompare(b.title)
        case 'progress':
          const progressA = userProgress[a.Id] || 0
          const progressB = userProgress[b.Id] || 0
          return progressB - progressA
        default:
          return a.order - b.order
      }
    })
  
  if (loading) return <Loading type="modules" />
  if (error) return <Error message={error} onRetry={loadData} type="modules" />
  
  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Power BI Learning Modules
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master Power BI through hands-on practice with our comprehensive modules. 
            From data basics to advanced DAX formulas, we've got you covered.
          </p>
        </motion.div>
        
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <ApperIcon 
                  name="Search" 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                />
                <Input
                  placeholder="Search modules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors duration-200"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors duration-200"
              >
                <option value="order">Default Order</option>
                <option value="title">Title A-Z</option>
                <option value="difficulty">Difficulty</option>
                <option value="progress">Progress</option>
              </select>
            </div>
          </div>
          
          {(searchTerm || filterDifficulty !== 'all') && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Showing {filteredAndSortedModules.length} of {modules.length} modules
              </p>
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchTerm('')
                  setFilterDifficulty('all')
                  setSortBy('order')
                }}
              >
                <ApperIcon name="X" className="w-4 h-4 mr-1" />
                Clear Filters
              </Button>
            </div>
          )}
        </motion.div>
        
        {/* Modules Grid */}
        {filteredAndSortedModules.length === 0 ? (
          <Empty 
            type={searchTerm ? "search" : "modules"} 
            onAction={() => {
              setSearchTerm('')
              setFilterDifficulty('all')
            }}
            actionLabel={searchTerm ? "Clear Search" : "Refresh Modules"}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAndSortedModules.map((module, index) => (
              <motion.div
                key={module.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <ModuleCard
                  module={module}
                  progress={userProgress[module.Id] || 0}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Learning Path CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-accent to-info rounded-xl shadow-xl p-8 text-white text-center"
        >
          <ApperIcon name="Map" className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-4">Follow Our Learning Path</h2>
          <p className="text-white text-opacity-90 mb-6 max-w-2xl mx-auto">
            Not sure where to start? Follow our recommended learning path designed to take you 
            from Power BI beginner to advanced user step by step.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button variant="secondary">
              <ApperIcon name="Route" className="w-4 h-4 mr-2" />
              View Learning Path
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-accent">
              <ApperIcon name="Download" className="w-4 h-4 mr-2" />
              Download Study Guide
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ModulesPage