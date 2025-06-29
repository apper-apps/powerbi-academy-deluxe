export const dashboardStats = {
  completedModules: 2,
  totalModules: 6,
  completedLessons: 8,
  totalLessons: 24,
  totalHours: 12,
  streak: 5,
  skillLevel: 'Beginner',
  overallProgress: 33
}

export const recentLessons = [
  {
    Id: 1,
    title: 'Introduction to Power BI',
    module: 'Getting Started',
    moduleId: 1,
    estimatedTime: 15,
    completed: true
  },
  {
    Id: 2,
    title: 'Connecting to Data Sources',
    module: 'Data Fundamentals',
    moduleId: 2,
    estimatedTime: 20,
    completed: true
  },
  {
    Id: 3,
    title: 'Data Transformation Basics',
    module: 'Data Fundamentals',
    moduleId: 2,
    estimatedTime: 25,
    completed: false
  },
  {
    Id: 4,
    title: 'Creating Your First Visual',
    module: 'Basic Visualizations',
    moduleId: 3,
    estimatedTime: 18,
    completed: false
  }
]

export const recommendedModules = [
  {
    Id: 3,
    title: 'Basic Visualizations',
    description: 'Learn to create compelling charts and graphs that tell your data story effectively.',
    difficulty: 'Beginner',
    lessons: [{ Id: 7 }, { Id: 8 }, { Id: 9 }]
  },
  {
    Id: 4,
    title: 'DAX Fundamentals',
    description: 'Master the basics of Data Analysis Expressions for powerful calculations.',
    difficulty: 'Intermediate',
    lessons: [{ Id: 10 }, { Id: 11 }, { Id: 12 }]
  },
  {
    Id: 5,
    title: 'Advanced DAX',
    description: 'Dive deep into complex DAX formulas and advanced calculation techniques.',
    difficulty: 'Advanced',
    lessons: [{ Id: 13 }, { Id: 14 }, { Id: 15 }]
  }
]