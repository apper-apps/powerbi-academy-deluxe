export const lessons = [
  // MODUL 1 - Introduction & Course Overview
  {
    Id: 1,
    moduleId: 1,
    title: 'Introduction & Course Overview',
    content: 'Welcome to the comprehensive Microsoft Power Platform training program. This course will take you from beginner to advanced level, covering all aspects of Power Platform with focus on Power BI, data modeling, and DAX. You\'ll prepare for both PL-900 and PL-300 certifications.',
    estimatedTime: 20,
    difficulty: 'Beginner',
    exercises: []
  },
  {
    Id: 2,
    moduleId: 1,
    title: 'What is Microsoft Power Platform',
    content: 'Microsoft Power Platform is a suite of business applications that helps you analyze data, build applications, automate processes, and create virtual agents. Learn about the platform\'s role in digital transformation and business process automation.',
    estimatedTime: 25,
    difficulty: 'Beginner',
    exercises: []
  },
  {
    Id: 3,
    moduleId: 1,
    title: 'Components: Power Apps, Power Automate, Power BI, Power Virtual Agents, Dataverse',
    content: 'Deep dive into each component of the Power Platform: Power Apps for custom applications, Power Automate for workflow automation, Power BI for data analytics, Power Virtual Agents for chatbots, and Dataverse as the underlying data platform.',
    estimatedTime: 30,
    difficulty: 'Beginner',
    exercises: []
  },
  {
    Id: 4,
    moduleId: 1,
    title: 'Business Value & Use Cases',
    content: 'Explore real-world business scenarios and use cases where Power Platform delivers significant value. Learn about ROI, productivity gains, and digital transformation success stories across various industries.',
    estimatedTime: 15,
    difficulty: 'Beginner',
    exercises: []
  },

  // MODUL 2 - Power BI Desktop & Service Fundamentals
  {
    Id: 5,
    moduleId: 2,
    title: 'Hands-on Lab: Creating your first Power BI report',
    content: 'Step-by-step hands-on laboratory session where you\'ll create your first Power BI report from scratch. Connect to sample data, create visualizations, and publish your report to the Power BI Service.',
    estimatedTime: 45,
    difficulty: 'Beginner',
    exercises: [
      {
        Id: 1,
        instructions: 'Create a simple bar chart showing sales by category',
        startingCode: '// Connect to sample data source and create visualization',
        solution: 'Bar Chart: X-axis = Category, Y-axis = SUM(Sales)',
        hints: ['Use the visualizations pane', 'Drag fields to appropriate wells', 'Format your chart'],
        validation: { type: 'visual', pattern: /bar.*chart.*category.*sales/i }
      }
    ]
  },
  {
    Id: 6,
    moduleId: 2,
    title: 'Intro to Power BI Desktop & Power BI Service',
    content: 'Understand the difference between Power BI Desktop (authoring tool) and Power BI Service (cloud platform). Learn about the development and deployment lifecycle.',
    estimatedTime: 25,
    difficulty: 'Beginner',
    exercises: []
  },
  {
    Id: 7,
    moduleId: 2,
    title: 'Connecting to Data Sources',
    content: 'Learn to connect Power BI to various data sources including Excel files, SQL databases, cloud services, web APIs, and more. Understand authentication methods and connection best practices.',
    estimatedTime: 25,
    difficulty: 'Beginner',
    exercises: []
  },
  {
    Id: 8,
    moduleId: 2,
    title: 'Visualizations and basic report building',
    content: 'Master the fundamentals of creating effective visualizations. Learn about different chart types, when to use each, and basic formatting techniques to create professional-looking reports.',
    estimatedTime: 25,
    difficulty: 'Beginner',
    exercises: []
  },

  // MODUL 3 - Power BI Licensing & Review
  {
    Id: 9,
    moduleId: 3,
    title: 'Power BI Licensing and Ecosystem',
    content: 'Comprehensive overview of Power BI licensing options including Free, Pro, Premium Per User, and Premium capacities. Understand workspace concepts, sharing capabilities, and governance features.',
    estimatedTime: 35,
    difficulty: 'Beginner',
    exercises: []
  },
  {
    Id: 10,
    moduleId: 3,
    title: 'Quiz/Review: PL-900 Module 1–2',
    content: 'Interactive quiz and review session covering topics from modules 1 and 2. Test your understanding of Power Platform components and basic Power BI concepts with PL-900 style questions.',
    estimatedTime: 40,
    difficulty: 'Beginner',
    exercises: []
  },
  {
    Id: 11,
    moduleId: 3,
    title: 'Discussion: Power Platform adoption in businesses',
    content: 'Group discussion and case study analysis of Power Platform adoption strategies in different business contexts. Learn about change management, governance, and success factors.',
    estimatedTime: 30,
    difficulty: 'Beginner',
    exercises: []
  },

  // MODUL 4 - Data Preparation in Power BI
  {
    Id: 12,
    moduleId: 4,
    title: 'Connect to multiple data sources',
    content: 'Advanced techniques for connecting to and combining data from multiple sources. Learn about data source credentials, gateway configuration, and security considerations.',
    estimatedTime: 30,
    difficulty: 'Intermediate',
    exercises: []
  },
  {
    Id: 13,
    moduleId: 4,
    title: 'Data cleaning in Power Query',
    content: 'Master Power Query Editor for data cleaning and preparation. Learn to handle missing values, remove duplicates, split columns, and apply data quality rules.',
    estimatedTime: 40,
    difficulty: 'Intermediate',
    exercises: []
  },
  {
    Id: 14,
    moduleId: 4,
    title: 'Transformations & Data types',
    content: 'Deep dive into data transformations and type conversions in Power Query. Understand data type implications for performance and accuracy in your reports.',
    estimatedTime: 35,
    difficulty: 'Intermediate',
    exercises: []
  },
  {
    Id: 15,
    moduleId: 4,
    title: 'Hands-on Lab: Load & clean sample dataset',
    content: 'Practical laboratory session working with a real-world messy dataset. Apply all learned techniques to clean, transform, and prepare data for analysis.',
    estimatedTime: 45,
    difficulty: 'Intermediate',
    exercises: [
      {
        Id: 2,
        instructions: 'Clean the customer data by removing duplicates and standardizing formats',
        startingCode: '// Use Power Query to clean customer dataset',
        solution: 'Remove Duplicates -> Trim Spaces -> Proper Case -> Split Names',
        hints: ['Use Transform tab options', 'Check data quality indicators', 'Preview transformations'],
        validation: { type: 'query', pattern: /remove.*duplicates.*trim.*proper/i }
      }
    ]
  },

  // MODUL 5 - Data Modeling Basics
  {
    Id: 16,
    moduleId: 5,
    title: 'Relationships, cardinality, normalization',
    content: 'Fundamental concepts of data modeling including table relationships, cardinality types (one-to-one, one-to-many, many-to-many), and database normalization principles.',
    estimatedTime: 35,
    difficulty: 'Intermediate',
    exercises: []
  },
  {
    Id: 17,
    moduleId: 5,
    title: 'Star Schema vs Snowflake',
    content: 'Compare and contrast star schema and snowflake schema designs. Learn when to use each approach and understand the performance implications in Power BI.',
    estimatedTime: 30,
    difficulty: 'Intermediate',
    exercises: []
  },
  {
    Id: 18,
    moduleId: 5,
    title: 'DAX Introduction (Measures vs Calculated Columns)',
    content: 'Introduction to Data Analysis Expressions (DAX). Understand the fundamental difference between measures and calculated columns, when to use each, and basic DAX syntax.',
    estimatedTime: 75,
    difficulty: 'Intermediate',
    exercises: [
      {
        Id: 3,
        instructions: 'Create a measure to calculate Total Revenue',
        startingCode: '// Create a measure using SUM function\nTotal Revenue = ',
        solution: 'Total Revenue = SUM(Sales[Revenue])',
        hints: ['Use SUM function', 'Reference table and column names with brackets'],
        validation: { type: 'dax', pattern: /SUM\s*\(\s*\w+\[Revenue\]\s*\)/i }
      }
    ]
  },

  // MODUL 6 - DAX Basic Practice & Assessment
  {
    Id: 19,
    moduleId: 6,
    title: 'DAX Basics Practice: SUM, COUNT, CALCULATE, FILTER',
    content: 'Hands-on practice with essential DAX functions. Master SUM, COUNT, CALCULATE, and FILTER functions through practical exercises and real-world scenarios.',
    estimatedTime: 75,
    difficulty: 'Intermediate',
    exercises: [
      {
        Id: 4,
        instructions: 'Create a measure that counts orders with revenue > 1000',
        startingCode: '// Use CALCULATE and COUNT functions\nHigh Value Orders = ',
        solution: 'High Value Orders = CALCULATE(COUNT(Orders[OrderID]), Orders[Revenue] > 1000)',
        hints: ['Use CALCULATE to modify filter context', 'COUNT function counts non-blank values'],
        validation: { type: 'dax', pattern: /CALCULATE\s*\(\s*COUNT.*>\s*1000/i }
      }
    ]
  },
  {
    Id: 20,
    moduleId: 6,
    title: 'Mini Assessment: Create model from raw data',
    content: 'Comprehensive assessment where you build a complete data model from raw data sources. Apply all learned concepts including data preparation, modeling, and basic DAX.',
    estimatedTime: 60,
    difficulty: 'Intermediate',
    exercises: []
  },

  // MODUL 7 - Advanced DAX & Performance
  {
    Id: 21,
    moduleId: 7,
    title: 'Advanced DAX: Time Intelligence, IF, SWITCH, RANKX',
    content: 'Master advanced DAX functions including time intelligence functions, conditional logic with IF and SWITCH, and ranking functions like RANKX. Learn pattern-based DAX development.',
    estimatedTime: 90,
    difficulty: 'Advanced',
    exercises: [
      {
        Id: 5,
        instructions: 'Create a measure for Year-over-Year growth percentage',
        startingCode: '// Use time intelligence functions\nYoY Growth % = ',
        solution: 'YoY Growth % = DIVIDE([Current Year Sales] - [Previous Year Sales], [Previous Year Sales], 0)',
        hints: ['Use SAMEPERIODLASTYEAR or similar time intelligence', 'Handle division by zero with DIVIDE'],
        validation: { type: 'dax', pattern: /DIVIDE.*SAMEPERIOD|PREVIOUSYEAR/i }
      }
    ]
  },
  {
    Id: 22,
    moduleId: 7,
    title: 'Optimizing data models for performance',
    content: 'Learn performance optimization techniques for Power BI data models. Understand columnstore compression, cardinality, bidirectional filtering, and query performance best practices.',
    estimatedTime: 75,
    difficulty: 'Advanced',
    exercises: []
  },

  // MODUL 8 - Interactive Reports & Exam Prep
  {
    Id: 23,
    moduleId: 8,
    title: 'Creating Interactive Reports',
    content: 'Design interactive and user-friendly reports with slicers, filters, drill-through, and bookmarks. Learn UX best practices for business intelligence reporting.',
    estimatedTime: 45,
    difficulty: 'Advanced',
    exercises: []
  },
  {
    Id: 24,
    moduleId: 8,
    title: 'Publishing to Power BI Service',
    content: 'Master the deployment process from Power BI Desktop to Power BI Service. Learn about workspaces, apps, sharing permissions, and gateway configuration.',
    estimatedTime: 30,
    difficulty: 'Advanced',
    exercises: []
  },
  {
    Id: 25,
    moduleId: 8,
    title: 'Recap: Power Platform Overview (PL-900)',
    content: 'Comprehensive review of Power Platform concepts for PL-900 certification preparation. Review key topics, common scenarios, and exam strategies.',
    estimatedTime: 35,
    difficulty: 'Advanced',
    exercises: []
  },
  {
    Id: 26,
    moduleId: 8,
    title: 'Recap: Power BI Data Lifecycle (PL-300)',
    content: 'Complete review of Power BI data lifecycle for PL-300 certification. Cover data acquisition, transformation, modeling, visualization, and deployment.',
    estimatedTime: 35,
    difficulty: 'Advanced',
    exercises: []
  },
  {
    Id: 27,
    moduleId: 8,
    title: 'Practice Questions – PL-900 & PL-300',
    content: 'Practice session with real certification-style questions for both PL-900 and PL-300 exams. Review answers and understand key concepts tested.',
    estimatedTime: 35,
    difficulty: 'Advanced',
    exercises: []
  },

  // MODUL 9 - Exam Session 1
  {
    Id: 28,
    moduleId: 9,
    title: 'Exam Session 1 - Power Platform Fundamentals',
    content: 'First comprehensive exam simulation focusing on Power Platform fundamentals. Practice with PL-900 style questions covering all Power Platform components.',
    estimatedTime: 60,
    difficulty: 'Advanced',
    exercises: []
  },
  {
    Id: 29,
    moduleId: 9,
    title: 'Exam Session 1 - Power BI Essentials',
    content: 'Exam simulation covering Power BI essentials including data connections, basic transformations, and fundamental visualizations.',
    estimatedTime: 60,
    difficulty: 'Advanced',
    exercises: []
  },

  // MODUL 10 - Exam Session 2
  {
    Id: 30,
    moduleId: 10,
    title: 'Exam Session 2 - Advanced Power BI',
    content: 'Advanced Power BI exam simulation covering complex scenarios, advanced visualizations, and Power BI Service administration topics.',
    estimatedTime: 60,
    difficulty: 'Advanced',
    exercises: []
  },
  {
    Id: 31,
    moduleId: 10,
    title: 'Exam Session 2 - DAX & Data Modeling',
    content: 'Comprehensive exam focused on DAX formulas and data modeling concepts. Practice with PL-300 style questions on advanced DAX and optimization.',
    estimatedTime: 60,
    difficulty: 'Advanced',
    exercises: []
  },

  // MODUL 11 - TOT and Portfolio
  {
    Id: 32,
    moduleId: 11,
    title: 'Training of Trainers (TOT) Session',
    content: 'Training of Trainers session focusing on how to effectively teach Power Platform and Power BI concepts. Learn presentation techniques, adult learning principles, and training best practices.',
    estimatedTime: 75,
    difficulty: 'Advanced',
    exercises: []
  },
  {
    Id: 33,
    moduleId: 11,
    title: 'Portfolio Development and Review',
    content: 'Capstone project where you develop a comprehensive portfolio showcasing your Power Platform and Power BI skills. Create real-world solutions and present your work.',
    estimatedTime: 75,
    difficulty: 'Advanced',
    exercises: []
  }
]