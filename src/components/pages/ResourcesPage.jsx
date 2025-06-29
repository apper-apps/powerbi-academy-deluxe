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
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download helpful resources, sample datasets, and reference materials to enhance 
            your Power BI learning experience.
          </p>
        </motion.div>
        
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ApperIcon name={category.icon} className="w-4 h-4" />
                <span>{category.label}</span>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-lg ${
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
                          className="w-6 h-6 text-white" 
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200">
                          {resource.title}
                        </h3>
                        <Badge variant="outline" size="sm">
                          {resource.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <ApperIcon name="Download" className="w-4 h-4" />
                        <span>{resource.downloads || 0}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <ApperIcon name="FileSize" className="w-4 h-4" />
                        <span>{resource.size}</span>
                      </span>
                    </div>
                    <span className="text-xs">
                      {resource.format}
                    </span>
                  </div>
                  
                  <Button
                    variant="primary"
                    className="w-full"
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
          className="bg-gradient-to-r from-accent to-info rounded-xl shadow-xl p-8 text-white"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">Need Help Finding Something?</h2>
              <p className="text-white text-opacity-90">
                Can't find the resource you're looking for? Check out our comprehensive 
                help center or contact our support team.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button variant="secondary">
                <ApperIcon name="HelpCircle" className="w-4 h-4 mr-2" />
                Help Center
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-accent">
                <ApperIcon name="MessageCircle" className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ResourcesPage