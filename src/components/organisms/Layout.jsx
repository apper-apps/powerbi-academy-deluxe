import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import NavigationItem from '@/components/molecules/NavigationItem'

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const navigationItems = [
    { to: '/dashboard', icon: 'LayoutDashboard', label: 'Dashboard' },
    { to: '/modules', icon: 'BookOpen', label: 'Modules', badge: '6' },
    { to: '/progress', icon: 'TrendingUp', label: 'My Progress' },
    { to: '/resources', icon: 'FileText', label: 'Resources' },
    { to: '/settings', icon: 'Settings', label: 'Settings' }
  ]
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        className="hidden lg:flex flex-col bg-white shadow-xl border-r border-gray-200"
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
              <ApperIcon name="Zap" className="w-6 h-6 text-white" />
            </div>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  PowerBI Academy
                </h1>
                <p className="text-xs text-gray-500">Learn Power BI Interactively</p>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.to}
              {...item}
              isCollapsed={sidebarCollapsed}
            />
          ))}
        </nav>
        
        {/* Collapse Toggle */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-50 transition-colors duration-200"
          >
            <ApperIcon 
              name={sidebarCollapsed ? 'ChevronRight' : 'ChevronLeft'} 
              className="w-5 h-5" 
            />
          </button>
        </div>
      </motion.div>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Mobile Header */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
                    <ApperIcon name="Zap" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      PowerBI Academy
                    </h1>
                    <p className="text-xs text-gray-500">Learn Power BI</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-50"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>
              
              {/* Mobile Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.to} onClick={() => setMobileMenuOpen(false)}>
                    <NavigationItem {...item} />
                  </div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
<div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-md border-b border-gray-200 p-3 sm:p-4 pt-safe-top">
          <div className="flex items-center justify-between min-touch">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-50 min-touch"
            >
              <ApperIcon name="Menu" className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                <span className="hidden xs:inline">PowerBI Academy</span>
                <span className="xs:hidden">PowerBI</span>
              </h1>
            </div>
            <div className="w-10"></div>
          </div>
        </div>
        
        {/* Page Content */}
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout