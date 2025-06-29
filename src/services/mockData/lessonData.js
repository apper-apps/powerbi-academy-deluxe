export const lessons = [
  {
    Id: 1,
    moduleId: 1,
    title: 'Introduction to Power BI',
    content: 'Welcome to Power BI! This lesson covers the basics of what Power BI is and why it\'s a powerful tool for data analysis.',
    estimatedTime: 15,
    difficulty: 'Beginner',
    exercises: [
      {
        Id: 1,
        instructions: 'Create a simple measure to calculate total sales',
        startingCode: '// Create a measure to calculate Total Sales\nTotal Sales = ',
        solution: 'Total Sales = SUM(Sales[Amount])',
        hints: ['Use the SUM function', 'Reference the Sales table and Amount column'],
        validation: { type: 'dax', pattern: /SUM\s*\(\s*Sales\[Amount\]\s*\)/i }
      }
    ]
  },
  {
    Id: 2,
    moduleId: 1,
    title: 'Power BI Interface Tour',
    content: 'Get familiar with the Power BI Desktop interface and learn about the key areas you\'ll be working with.',
    estimatedTime: 20,
    difficulty: 'Beginner',
    exercises: []
  },
  {
    Id: 3,
    moduleId: 1,
    title: 'Your First Report',
    content: 'Create your first Power BI report by connecting to data and building a simple visualization.',
    estimatedTime: 25,
    difficulty: 'Beginner',
    exercises: []
  },
  {
    Id: 4,
    moduleId: 2,
    title: 'Connecting to Data Sources',
    content: 'Learn how to connect Power BI to various data sources including Excel, SQL Server, and cloud services.',
    estimatedTime: 25,
    difficulty: 'Beginner',
    exercises: []
  },
  {
    Id: 5,
    moduleId: 2,
    title: 'Data Transformation Basics',
    content: 'Use Power Query Editor to clean, transform, and shape your data for analysis.',
    estimatedTime: 30,
    difficulty: 'Beginner',
    exercises: []
  },
  {
    Id: 6,
    moduleId: 2,
    title: 'Data Modeling Essentials',
    content: 'Understand relationships, cardinality, and how to create an effective data model.',
    estimatedTime: 35,
    difficulty: 'Beginner',
    exercises: []
  },
  {
    Id: 7,
    moduleId: 3,
    title: 'Chart Types and When to Use Them',
    content: 'Explore different visualization types and learn when each one is most effective.',
    estimatedTime: 20,
    difficulty: 'Beginner',
    exercises: []
  },
  {
    Id: 8,
    moduleId: 3,
    title: 'Creating Your First Visual',
    content: 'Step-by-step guide to creating your first chart in Power BI.',
    estimatedTime: 25,
    difficulty: 'Beginner',
    exercises: []
  },
  {
    Id: 9,
    moduleId: 3,
    title: 'Formatting and Styling',
    content: 'Make your visuals look professional with proper formatting and styling techniques.',
    estimatedTime: 30,
    difficulty: 'Beginner',
    exercises: []
  },
  {
    Id: 10,
    moduleId: 4,
    title: 'Introduction to DAX',
    content: 'Learn the fundamentals of DAX (Data Analysis Expressions) and why it\'s essential for Power BI.',
    estimatedTime: 25,
    difficulty: 'Intermediate',
    exercises: []
  }
]