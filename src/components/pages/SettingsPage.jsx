import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: {
      dailyReminders: true,
      achievementAlerts: true,
      weeklyProgress: false,
      newContent: true
    },
    preferences: {
      theme: 'light',
      language: 'en',
      timezone: 'UTC',
      autoSave: true,
      compactMode: false
    },
    learning: {
      difficulty: 'adaptive',
      skipCompleted: true,
      showHints: true,
      practiceMode: false
    }
  })
  
  const handleNotificationChange = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }))
  }
  
  const handlePreferenceChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }))
  }
  
  const handleLearningChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      learning: {
        ...prev.learning,
        [key]: typeof value === 'boolean' ? value : value
      }
    }))
  }
  
  const handleSave = () => {
    toast.success('Settings saved successfully!')
  }
  
  const handleReset = () => {
    toast.info('Settings reset to defaults')
    // Reset logic would go here
  }
  
const ToggleSwitch = ({ checked, onChange, label, description }) => (
    <div className="flex items-start justify-between py-3 sm:py-4 min-touch">
      <div className="flex-1 pr-4">
        <h4 className="font-medium text-gray-900 text-sm-mobile sm:text-base">{label}</h4>
        {description && (
          <p className="text-xs-mobile sm:text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
<button
        onClick={onChange}
        className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex-shrink-0 min-touch ${
          checked ? 'bg-primary' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-4 sm:translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
  
return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-6 sm:space-y-8 pb-safe-bottom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600 text-sm-mobile sm:text-base">
            Customize your Power BI Academy experience to match your learning preferences.
          </p>
        </motion.div>
        
        {/* Notifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
        >
          <div className="flex items-center space-x-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Bell" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Notifications</h2>
              <p className="text-xs-mobile sm:text-sm text-gray-600">Manage how you receive updates and reminders</p>
            </div>
          </div>
          
          <div className="space-y-1 divide-y divide-gray-100">
            <ToggleSwitch
              checked={settings.notifications.dailyReminders}
              onChange={() => handleNotificationChange('dailyReminders')}
              label="Daily Learning Reminders"
              description="Get reminded to continue your learning streak"
            />
            <ToggleSwitch
              checked={settings.notifications.achievementAlerts}
              onChange={() => handleNotificationChange('achievementAlerts')}
              label="Achievement Notifications"
              description="Celebrate when you unlock new badges and milestones"
            />
            <ToggleSwitch
              checked={settings.notifications.weeklyProgress}
              onChange={() => handleNotificationChange('weeklyProgress')}
              label="Weekly Progress Summary"
              description="Receive a summary of your learning progress each week"
            />
            <ToggleSwitch
              checked={settings.notifications.newContent}
              onChange={() => handleNotificationChange('newContent')}
              label="New Content Alerts"
              description="Be notified when new modules and lessons are available"
            />
          </div>
        </motion.div>
        
        {/* Preferences Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
        >
          <div className="flex items-center space-x-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-info to-accent rounded-lg flex items-center justify-center">
              <ApperIcon name="Settings" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Preferences</h2>
              <p className="text-xs-mobile sm:text-sm text-gray-600">Customize your app appearance and behavior</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm-mobile sm:text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <select
                value={settings.preferences.theme}
                onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                className="w-full px-3 sm:px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors duration-200 text-base-mobile min-touch"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm-mobile sm:text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={settings.preferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
                className="w-full px-3 sm:px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors duration-200 text-base-mobile min-touch"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm-mobile sm:text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select
                value={settings.preferences.timezone}
                onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                className="w-full px-3 sm:px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors duration-200 text-base-mobile min-touch"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
                <option value="GMT">Greenwich Mean Time</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 space-y-1 divide-y divide-gray-100">
            <ToggleSwitch
              checked={settings.preferences.autoSave}
              onChange={() => handlePreferenceChange('autoSave', !settings.preferences.autoSave)}
              label="Auto-save Progress"
              description="Automatically save your progress as you learn"
            />
            <ToggleSwitch
              checked={settings.preferences.compactMode}
              onChange={() => handlePreferenceChange('compactMode', !settings.preferences.compactMode)}
              label="Compact Mode"
              description="Use a more compact layout to fit more content on screen"
            />
          </div>
        </motion.div>
        
        {/* Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
        >
          <div className="flex items-center space-x-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-success to-green-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="GraduationCap" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Learning Settings</h2>
              <p className="text-xs-mobile sm:text-sm text-gray-600">Adjust how lessons and exercises are presented</p>
            </div>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm-mobile sm:text-sm font-medium text-gray-700 mb-2">
                Difficulty Adjustment
              </label>
              <select
                value={settings.learning.difficulty}
                onChange={(e) => handleLearningChange('difficulty', e.target.value)}
                className="w-full px-3 sm:px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors duration-200 text-base-mobile min-touch"
              >
                <option value="adaptive">Adaptive (Recommended)</option>
                <option value="beginner">Always Beginner</option>
                <option value="intermediate">Always Intermediate</option>
                <option value="advanced">Always Advanced</option>
              </select>
              <p className="text-xs-mobile sm:text-sm text-gray-500 mt-1">
                Adaptive mode adjusts difficulty based on your performance
              </p>
            </div>
            
            <div className="space-y-1 divide-y divide-gray-100">
              <ToggleSwitch
                checked={settings.learning.skipCompleted}
                onChange={() => handleLearningChange('skipCompleted', !settings.learning.skipCompleted)}
                label="Skip Completed Lessons"
                description="Automatically skip lessons you've already completed"
              />
              <ToggleSwitch
                checked={settings.learning.showHints}
                onChange={() => handleLearningChange('showHints', !settings.learning.showHints)}
                label="Show Exercise Hints"
                description="Display helpful hints when you're stuck on exercises"
              />
              <ToggleSwitch
                checked={settings.learning.practiceMode}
                onChange={() => handleLearningChange('practiceMode', !settings.learning.practiceMode)}
                label="Practice Mode"
                description="Focus on hands-on exercises with minimal theory"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
        >
          <Button
            variant="primary"
            onClick={handleSave}
            className="flex-1 sm:flex-none min-touch"
          >
            <ApperIcon name="Save" className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1 sm:flex-none min-touch"
          >
            <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
        </motion.div>
        
        {/* Data & Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-50 rounded-xl p-4 sm:p-6"
        >
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Data & Privacy</h3>
          <div className="flex flex-col space-y-3 sm:space-y-2">
            <Button variant="outline" className="w-full sm:w-auto min-touch">
              <ApperIcon name="Download" className="w-4 h-4 mr-2" />
              Export Learning Data
            </Button>
            <Button variant="outline" className="w-full sm:w-auto min-touch">
              <ApperIcon name="Shield" className="w-4 h-4 mr-2" />
              Privacy Settings
            </Button>
            <Button variant="danger" className="w-full sm:w-auto min-touch">
              <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
              Clear All Progress
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SettingsPage