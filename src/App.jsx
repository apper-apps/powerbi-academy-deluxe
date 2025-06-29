import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import Dashboard from '@/components/pages/Dashboard'
import ModulesPage from '@/components/pages/ModulesPage'
import LessonPage from '@/components/pages/LessonPage'
import ProgressPage from '@/components/pages/ProgressPage'
import ResourcesPage from '@/components/pages/ResourcesPage'
import SettingsPage from '@/components/pages/SettingsPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="modules" element={<ModulesPage />} />
            <Route path="lesson/:moduleId/:lessonId" element={<LessonPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  )
}

export default App