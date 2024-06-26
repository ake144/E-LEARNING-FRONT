// data/coursesData.ts
const data = {
    categories: [
      { name: 'Accounting & Finance', slug: 'accounting' },
      { name: 'Arts & Crafts', slug: 'arts' },
      { name: 'Beauty & Makeup', slug: 'beauty' },
      { name: 'Business & Marketing', slug: 'business' },
      { name: 'Creatives & Design', slug: 'creatives' },
      { name: 'Food & Beverage', slug: 'food' },
      { name: 'Health & Fitness', slug: 'health' },
      { name: 'IT & Development', slug: 'it' },
      { name: 'Language & Literature', slug: 'language' },
      { name: 'Music & Theatre', slug: 'music' },
      { name: 'Office Productivity', slug: 'office' },
      { name: 'Personal Development', slug: 'personal' },
      { name: 'Photography & Videography', slug: 'photography' },
    ],
    courses: [
      {
        id: 1,
        category: 'accounting',
        title: 'Learn English: Upgrade Your Speaking',
        instructor: 'Nabil Emil',
        description: 'Are you struggling to communicate in English?',
        level: 'Intermediate',
        duration: '13:00 h',
        lessons: 36,
        image: '/images/english.jpg',
      },
      {
        id: 2,
        category: 'business',
        title: 'Starting and Running Business in Ethiopia',
        instructor: 'Haireya Ahmed',
        description: 'Welcome to this practical course on doing business in Ethiopia!',
        level: 'Intermediate',
        duration: '3:00 h',
        lessons: 33,
        image: '/images/business.jpg',
      },
      {
        id: 3,
        category: 'it',
        title: 'Turn Your Ideas into a Startup',
        instructor: 'Tigabu Haile',
        description: 'As the founder and CEO of Eshi Express...',
        level: 'Intermediate',
        duration: '3:00 h',
        lessons: 27,
        image: '/images/startup.jpg',
      },
      {
        id: 4,
        category: 'it',
        title: 'Turn Your Ideas into a Startup',
        instructor: 'Tigabu Haile',
        description: 'As the founder and CEO of Eshi Express...',
        level: 'Intermediate',
        duration: '3:00 h',
        lessons: 27,
        image: '/images/startup.jpg',
      },
      // Add more course data as needed
    ],
  };
  
  export default data;
  