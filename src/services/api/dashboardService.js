import { dashboardStats, recentLessons, recommendedModules } from '@/services/mockData/dashboardData'

export const getDashboardStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { ...dashboardStats }
}

export const getRecentLessons = async () => {
  await new Promise(resolve => setTimeout(resolve, 200))
  return [...recentLessons]
}

export const getRecommendedModules = async () => {
  await new Promise(resolve => setTimeout(resolve, 250))
  return [...recommendedModules]
}