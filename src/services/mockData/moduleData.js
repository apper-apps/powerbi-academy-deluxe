export const modules = [
  {
    Id: 1,
    title: 'Getting Started with Power BI',
    description: 'Learn the fundamentals of Power BI and get familiar with the interface. Perfect for absolute beginners.',
    difficulty: 'Beginner',
    order: 1,
    estimatedTime: 90,
    lessons: [
      { Id: 1, title: 'Introduction to Power BI', estimatedTime: 15 },
      { Id: 2, title: 'Power BI Interface Tour', estimatedTime: 20 },
      { Id: 3, title: 'Your First Report', estimatedTime: 25 }
    ]
  },
  {
    Id: 2,
    title: 'Data Fundamentals',
    description: 'Master data connection, transformation, and modeling techniques to build a solid foundation.',
    difficulty: 'Beginner',
    order: 2,
    estimatedTime: 120,
    lessons: [
      { Id: 4, title: 'Connecting to Data Sources', estimatedTime: 25 },
      { Id: 5, title: 'Data Transformation Basics', estimatedTime: 30 },
      { Id: 6, title: 'Data Modeling Essentials', estimatedTime: 35 }
    ]
  },
  {
    Id: 3,
    title: 'Basic Visualizations',
    description: 'Create compelling charts, graphs, and visuals that effectively communicate your data insights.',
    difficulty: 'Beginner',
    order: 3,
    estimatedTime: 105,
    lessons: [
      { Id: 7, title: 'Chart Types and When to Use Them', estimatedTime: 20 },
      { Id: 8, title: 'Creating Your First Visual', estimatedTime: 25 },
      { Id: 9, title: 'Formatting and Styling', estimatedTime: 30 }
    ]
  },
  {
    Id: 4,
    title: 'DAX Fundamentals',
    description: 'Learn Data Analysis Expressions (DAX) to create powerful calculated columns and measures.',
    difficulty: 'Intermediate',
    order: 4,
    estimatedTime: 150,
    lessons: [
      { Id: 10, title: 'Introduction to DAX', estimatedTime: 25 },
      { Id: 11, title: 'Basic DAX Functions', estimatedTime: 35 },
      { Id: 12, title: 'Creating Calculated Columns', estimatedTime: 40 }
    ]
  },
  {
    Id: 5,
    title: 'Advanced DAX',
    description: 'Master complex DAX formulas, time intelligence, and advanced calculation techniques.',
    difficulty: 'Advanced',
    order: 5,
    estimatedTime: 180,
    lessons: [
      { Id: 13, title: 'Time Intelligence Functions', estimatedTime: 45 },
      { Id: 14, title: 'Advanced Filter Context', estimatedTime: 50 },
      { Id: 15, title: 'Complex DAX Patterns', estimatedTime: 55 }
    ]
  },
  {
    Id: 6,
    title: 'Dashboard Design',
    description: 'Design professional dashboards and reports that drive business decisions.',
    difficulty: 'Intermediate',
    order: 6,
    estimatedTime: 135,
    lessons: [
      { Id: 16, title: 'Dashboard Design Principles', estimatedTime: 30 },
      { Id: 17, title: 'Interactive Elements', estimatedTime: 35 },
      { Id: 18, title: 'Publishing and Sharing', estimatedTime: 40 }
    ]
  }
]