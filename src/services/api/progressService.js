import { userProgress, detailedProgress } from '@/services/mockData/progressData'

export const getUserProgress = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { ...userProgress }
}

export const getDetailedProgress = async () => {
  await new Promise(resolve => setTimeout(resolve, 250))
  return [...detailedProgress]
}

export const markLessonComplete = async (lessonId) => {
  await new Promise(resolve => setTimeout(resolve, 400))
  
  // Update progress in mock data
  if (!userProgress.completedLessons.includes(lessonId)) {
    userProgress.completedLessons.push(lessonId)
    userProgress.completedLessons.sort()
  }
  
  return { success: true }
}

export const updateProgress = async (progressData) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  Object.assign(userProgress, progressData)
  return { ...userProgress }
}

export const resetProgress = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  userProgress.completedLessons = []
  userProgress.badges = []
  userProgress.totalTime = 0
  return { success: true }
}