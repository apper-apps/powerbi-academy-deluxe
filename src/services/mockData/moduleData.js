export const modules = [
  {
    Id: 1,
    title: 'MODUL 1 - Introduction & Course Overview',
    description: 'Introduction to Microsoft Power Platform and its components. Learn about Power Apps, Power Automate, Power BI, Power Virtual Agents, and Dataverse. Understand the business value and real-world use cases.',
    difficulty: 'Beginner',
    order: 1,
    estimatedTime: 90,
    lessons: [
      { Id: 1, title: 'Introduction & Course Overview', estimatedTime: 20 },
      { Id: 2, title: 'What is Microsoft Power Platform', estimatedTime: 25 },
      { Id: 3, title: 'Components: Power Apps, Power Automate, Power BI, Power Virtual Agents, Dataverse', estimatedTime: 30 },
      { Id: 4, title: 'Business Value & Use Cases', estimatedTime: 15 }
    ]
  },
  {
    Id: 2,
    title: 'MODUL 2 - Power BI Desktop & Service Fundamentals',
    description: 'Hands-on introduction to Power BI Desktop and Power BI Service. Learn to connect to data sources, create visualizations, and build your first report.',
    difficulty: 'Beginner',
    order: 2,
    estimatedTime: 120,
    lessons: [
      { Id: 5, title: 'Hands-on Lab: Creating your first Power BI report', estimatedTime: 45 },
      { Id: 6, title: 'Intro to Power BI Desktop & Power BI Service', estimatedTime: 25 },
      { Id: 7, title: 'Connecting to Data Sources', estimatedTime: 25 },
      { Id: 8, title: 'Visualizations and basic report building', estimatedTime: 25 }
    ]
  },
  {
    Id: 3,
    title: 'MODUL 3 - Power BI Licensing & Review',
    description: 'Understand Power BI licensing models and ecosystem. Review PL-900 modules 1-2 with quiz and discuss Power Platform adoption strategies in business environments.',
    difficulty: 'Beginner',
    order: 3,
    estimatedTime: 105,
    lessons: [
      { Id: 9, title: 'Power BI Licensing and Ecosystem', estimatedTime: 35 },
      { Id: 10, title: 'Quiz/Review: PL-900 Module 1–2', estimatedTime: 40 },
      { Id: 11, title: 'Discussion: Power Platform adoption in businesses', estimatedTime: 30 }
    ]
  },
  {
    Id: 4,
    title: 'MODUL 4 - Data Preparation in Power BI',
    description: 'Master data preparation techniques in Power BI. Connect to multiple data sources, clean data using Power Query, apply transformations, and understand data types.',
    difficulty: 'Intermediate',
    order: 4,
    estimatedTime: 150,
    lessons: [
      { Id: 12, title: 'Connect to multiple data sources', estimatedTime: 30 },
      { Id: 13, title: 'Data cleaning in Power Query', estimatedTime: 40 },
      { Id: 14, title: 'Transformations & Data types', estimatedTime: 35 },
      { Id: 15, title: 'Hands-on Lab: Load & clean sample dataset', estimatedTime: 45 }
    ]
  },
  {
    Id: 5,
    title: 'MODUL 5 - Data Modeling Basics',
    description: 'Learn essential data modeling concepts including relationships, cardinality, and normalization. Understand Star Schema vs Snowflake and get introduced to DAX with measures vs calculated columns.',
    difficulty: 'Intermediate',
    order: 5,
    estimatedTime: 140,
    lessons: [
      { Id: 16, title: 'Relationships, cardinality, normalization', estimatedTime: 35 },
      { Id: 17, title: 'Star Schema vs Snowflake', estimatedTime: 30 },
      { Id: 18, title: 'DAX Introduction (Measures vs Calculated Columns)', estimatedTime: 75 }
    ]
  },
  {
    Id: 6,
    title: 'MODUL 6 - DAX Basic Practice & Assessment',
    description: 'Practice basic DAX functions including SUM, COUNT, CALCULATE, and FILTER. Complete a mini assessment by creating a data model from raw data.',
    difficulty: 'Intermediate',
    order: 6,
    estimatedTime: 135,
    lessons: [
      { Id: 19, title: 'DAX Basics Practice: SUM, COUNT, CALCULATE, FILTER', estimatedTime: 75 },
      { Id: 20, title: 'Mini Assessment: Create model from raw data', estimatedTime: 60 }
    ]
  },
  {
    Id: 7,
    title: 'MODUL 7 - Advanced DAX & Performance',
    description: 'Master advanced DAX functions including Time Intelligence, IF, SWITCH, and RANKX. Learn optimization techniques for data models to improve performance.',
    difficulty: 'Advanced',
    order: 7,
    estimatedTime: 165,
    lessons: [
      { Id: 21, title: 'Advanced DAX: Time Intelligence, IF, SWITCH, RANKX', estimatedTime: 90 },
      { Id: 22, title: 'Optimizing data models for performance', estimatedTime: 75 }
    ]
  },
  {
    Id: 8,
    title: 'MODUL 8 - Interactive Reports & Exam Prep',
    description: 'Create interactive reports and publish to Power BI Service. Comprehensive recap of Power Platform Overview (PL-900) and Power BI Data Lifecycle (PL-300) with practice questions.',
    difficulty: 'Advanced',
    order: 8,
    estimatedTime: 180,
    lessons: [
      { Id: 23, title: 'Creating Interactive Reports', estimatedTime: 45 },
      { Id: 24, title: 'Publishing to Power BI Service', estimatedTime: 30 },
      { Id: 25, title: 'Recap: Power Platform Overview (PL-900)', estimatedTime: 35 },
      { Id: 26, title: 'Recap: Power BI Data Lifecycle (PL-300)', estimatedTime: 35 },
      { Id: 27, title: 'Practice Questions – PL-900 & PL-300', estimatedTime: 35 }
    ]
  },
  {
    Id: 9,
    title: 'MODUL 9 - Exam Session 1',
    description: 'First comprehensive exam session covering Power Platform fundamentals and Power BI concepts. Test your knowledge with real exam scenarios.',
    difficulty: 'Advanced',
    order: 9,
    estimatedTime: 120,
    lessons: [
      { Id: 28, title: 'Exam Session 1 - Power Platform Fundamentals', estimatedTime: 60 },
      { Id: 29, title: 'Exam Session 1 - Power BI Essentials', estimatedTime: 60 }
    ]
  },
  {
    Id: 10,
    title: 'MODUL 10 - Exam Session 2',
    description: 'Second comprehensive exam session focusing on advanced Power BI concepts, DAX formulas, and data modeling scenarios.',
    difficulty: 'Advanced',
    order: 10,
    estimatedTime: 120,
    lessons: [
      { Id: 30, title: 'Exam Session 2 - Advanced Power BI', estimatedTime: 60 },
      { Id: 31, title: 'Exam Session 2 - DAX & Data Modeling', estimatedTime: 60 }
    ]
  },
  {
    Id: 11,
    title: 'MODUL 11 - TOT and Portfolio',
    description: 'Training of Trainers (TOT) session and portfolio development. Apply your knowledge in real-world scenarios and build a comprehensive project portfolio.',
    difficulty: 'Advanced',
    order: 11,
    estimatedTime: 150,
    lessons: [
      { Id: 32, title: 'Training of Trainers (TOT) Session', estimatedTime: 75 },
      { Id: 33, title: 'Portfolio Development and Review', estimatedTime: 75 }
    ]
  }
]