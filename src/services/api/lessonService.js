import { lessons } from '@/services/mockData/lessonData'

export const getAllLessons = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return [...lessons]
}

export const getLessonById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  const lesson = lessons.find(l => l.Id === id)
  if (!lesson) {
    throw new Error('Lesson not found')
  }
  return { ...lesson }
}

export const getLessonsByModule = async (moduleId) => {
  await new Promise(resolve => setTimeout(resolve, 250))
  return lessons.filter(lesson => lesson.moduleId === moduleId)
}

export const validateExercise = async (lessonId, code) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Simple validation logic
  const isValid = code.trim().toLowerCase().includes('sum') || 
                  code.trim().toLowerCase().includes('calculate')
  
  return {
    success: isValid,
    message: isValid 
      ? 'Excellent! Your DAX formula is correct.' 
      : 'Not quite right. Try using SUM() or CALCULATE() functions.',
    hints: isValid ? [] : [
      'Use the SUM() function to aggregate data',
      'Reference columns using TableName[ColumnName] syntax',
      'Check your parentheses and syntax'
]
  }
}

export const getVideoChapters = async (lessonId) => {
  await new Promise(resolve => setTimeout(resolve, 100))
  const lesson = lessons.find(l => l.Id === lessonId)
  return lesson?.chapters || []
}