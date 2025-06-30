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
  
  const result = {
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
  
  // Add visualization data for successful validations
  if (isValid) {
    result.visualizationData = generateVisualizationData(code)
  }
  
  return result
}

const generateVisualizationData = (code) => {
  const codeUpper = code.toUpperCase()
  
  if (codeUpper.includes('SUM') && codeUpper.includes('SALES')) {
    return {
      type: 'bar',
      title: 'Total Sales Analysis',
      series: [{
        name: 'Sales Amount',
        data: [125000, 89000, 156000, 203000, 98000, 167000]
      }],
      categories: ['Electronics', 'Fashion', 'Home', 'Sports', 'Books', 'Toys'],
      colors: ['#3B82F6']
    }
  } else if (codeUpper.includes('COUNT')) {
    return {
      type: 'donut',
      title: 'Customer Distribution',
      series: [342, 289, 156, 98, 67],
      labels: ['Premium', 'Standard', 'Basic', 'Trial', 'Inactive'],
      colors: ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280']
    }
  } else if (codeUpper.includes('CALCULATE')) {
    return {
      type: 'line',
      title: 'Revenue Trend Analysis',
      series: [{
        name: 'Monthly Revenue',
        data: [45000, 52000, 48000, 61000, 55000, 67000, 73000, 69000]
      }],
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      colors: ['#8B5CF6']
    }
  } else {
    return {
      type: 'bar',
      title: 'Business Metrics Overview',
      series: [{
        name: 'Performance Score',
        data: [78, 85, 92, 88, 95, 82, 90]
      }],
      categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'],
      colors: ['#059669']
    }
  }
}

export const getVideoChapters = async (lessonId) => {
  await new Promise(resolve => setTimeout(resolve, 100))
  const lesson = lessons.find(l => l.Id === lessonId)
  return lesson?.chapters || []
}