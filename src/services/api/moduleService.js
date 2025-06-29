import { modules } from '@/services/mockData/moduleData'

export const getAllModules = async () => {
  await new Promise(resolve => setTimeout(resolve, 400))
  return [...modules]
}

export const getModuleById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  const module = modules.find(m => m.Id === id)
  if (!module) {
    throw new Error('Module not found')
  }
  return { ...module }
}

export const getModuleProgress = async (moduleId) => {
  await new Promise(resolve => setTimeout(resolve, 150))
  // Calculate progress based on completed lessons
  const module = modules.find(m => m.Id === moduleId)
  if (!module) return 0
  
  // Mock progress calculation
  return Math.floor(Math.random() * 100)
}