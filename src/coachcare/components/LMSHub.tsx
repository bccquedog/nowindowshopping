import React from 'react';

const sampleCourses = [
  {
    title: 'Goal Setting Mastery',
    description: 'Learn how to set, track, and achieve meaningful goals with proven frameworks.',
    modules: 5,
    progress: 0,
  },
  {
    title: 'Effective Communication',
    description: 'Build strong relationships and lead with confidence through better communication.',
    modules: 4,
    progress: 0,
  },
  {
    title: 'Financial Literacy Basics',
    description: 'Understand money management, budgeting, and investing for long-term success.',
    modules: 6,
    progress: 0,
  },
];

const LMSHub: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-100 to-yellow-100 dark:from-blue-900 dark:via-pink-900 dark:to-yellow-900 py-12 px-4">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-700 dark:text-blue-300 drop-shadow-lg">Learning Management System (LMS)</h1>
      <p className="text-lg text-center mb-8 text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
        Welcome to the CoachCare LMS Hub! Here you’ll find courses, modules, and resources to help you and your clients grow. Track your progress, unlock new skills, and level up your coaching journey.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        {sampleCourses.map((course) => (
          <div key={course.title} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 flex flex-col">
            <h2 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-300">{course.title}</h2>
            <p className="text-gray-700 dark:text-gray-200 mb-4">{course.description}</p>
            <div className="flex-1" />
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Modules: {course.modules}</span>
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded font-semibold transition-colors">View Course</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center text-gray-500 dark:text-gray-400">
        <em>More courses and features coming soon!</em>
      </div>
    </div>
  </div>
);

export default LMSHub; 