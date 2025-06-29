import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { getAllResources } from '@/services/api/resourceService'

const ResourcesPage = () => {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  
  const loadResources = async () => {
    try {
      setLoading(true)
      setError('')
      
      const resourcesData = await getAllResources()
      setResources(resourcesData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadResources()
  }, [])
  
  const handleDownload = (resource) => {
    toast.success(`Downloading ${resource.title}...`)
    // Simulate download
    setTimeout(() => {
      toast.info('Download completed!')
    }, 2000)
  }
  
  const categories = [
    { id: 'all', label: 'All Resources', icon: 'Grid' },
    { id: 'cheatsheet', label: 'Cheat Sheets', icon: 'FileText' },
    { id: 'dataset', label: 'Sample Data', icon: 'Database' },
    { id: 'template', label: 'Templates', icon: 'Layout' },
    { id: 'guide', label: 'Guides', icon: 'BookOpen' },
    { id: 'video', label: 'Videos', icon: 'Play' }
  ]
  
  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory)
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadResources} />
  
return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-6 sm:space-y-8 pb-safe-bottom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Learning Resources</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Download helpful resources, sample datasets, and reference materials to enhance 
            your Power BI learning experience.
          </p>
        </motion.div>
        
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
        >
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 min-touch text-sm-mobile sm:text-base ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ApperIcon name={category.icon} className="w-4 h-4" />
                <span className="hidden xs:inline">{category.label}</span>
                <span className="xs:hidden">{category.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <Empty type="resources" onAction={loadResources} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group touch:hover:shadow-lg"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0 ${
                        resource.category === 'cheatsheet' ? 'bg-gradient-to-r from-primary to-secondary' :
                        resource.category === 'dataset' ? 'bg-gradient-to-r from-success to-green-600' :
                        resource.category === 'template' ? 'bg-gradient-to-r from-info to-accent' :
                        resource.category === 'guide' ? 'bg-gradient-to-r from-warning to-yellow-600' :
                        'bg-gradient-to-r from-error to-red-600'
                      }`}>
                        <ApperIcon 
                          name={
                            resource.category === 'cheatsheet' ? 'FileText' :
                            resource.category === 'dataset' ? 'Database' :
                            resource.category === 'template' ? 'Layout' :
                            resource.category === 'guide' ? 'BookOpen' :
                            'Play'
                          } 
                          className="w-5 h-5 sm:w-6 sm:h-6 text-white" 
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200 text-sm-mobile sm:text-base truncate">
                          {resource.title}
                        </h3>
                        <Badge variant="outline" size="sm" className="mt-1">
                          {resource.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3 text-xs-mobile sm:text-sm">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <span className="flex items-center space-x-1">
                        <ApperIcon name="Download" className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{resource.downloads || 0}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <ApperIcon name="FileSize" className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{resource.size}</span>
                      </span>
                    </div>
                    <span className="text-xs">
                      {resource.format}
                    </span>
                  </div>
                  
                  <Button
                    variant="primary"
                    className="w-full min-touch"
                    onClick={() => handleDownload(resource)}
                  >
                    <ApperIcon name="Download" className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
                
                <div className="h-1 bg-gray-100">
                  <div className={`h-full ${
                    resource.category === 'cheatsheet' ? 'bg-gradient-to-r from-primary to-secondary' :
                    resource.category === 'dataset' ? 'bg-gradient-to-r from-success to-green-600' :
                    resource.category === 'template' ? 'bg-gradient-to-r from-info to-accent' :
                    resource.category === 'guide' ? 'bg-gradient-to-r from-warning to-yellow-600' :
                    'bg-gradient-to-r from-error to-red-600'
                  }`}></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-accent to-info rounded-xl shadow-xl p-6 sm:p-8 text-white"
        >
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Need Help Finding Something?</h2>
              <p className="text-white text-opacity-90 text-sm-mobile sm:text-base">
                Can't find the resource you're looking for? Check out our comprehensive 
                help center or contact our support team.
              </p>
            </div>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <Button variant="secondary" className="min-touch">
                <ApperIcon name="HelpCircle" className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Help Center</span>
                <span className="sm:hidden">Help</span>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-accent min-touch">
                <ApperIcon name="MessageCircle" className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Contact Support</span>
                <span className="sm:hidden">Contact</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ResourcesPage