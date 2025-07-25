import React from 'react';

const softwareProducts = [
  {
    name: 'EstimateFlow',
    icon: '📊',
    description: 'Streamline your project estimates and proposals with smart automation and beautiful templates.'
  },
  {
    name: 'BrightSteps',
    icon: '🌟',
    description: 'A personal growth and habit-tracking app to help you take small steps toward big goals.'
  },
  {
    name: 'BudgetMind',
    icon: '💸',
    description: 'Take control of your finances with intuitive budgeting, goal setting, and spending insights.'
  },
  {
    name: 'ShoutOut',
    icon: '📢',
    description: 'The ultimate live venue messaging platform for real-time audience engagement and celebration.'
  },
  {
    name: 'VelvetRope',
    icon: '🎟️',
    description: 'VIP access and event management made easy for exclusive experiences and seamless check-ins.'
  },
];

const Software: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 dark:from-blue-900 dark:via-pink-900 dark:to-yellow-900 py-16 px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-700 dark:text-blue-300 drop-shadow-lg">Our Software</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {softwareProducts.map((product) => (
          <div key={product.name} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 flex flex-col items-center">
            <div className="text-5xl mb-4">{product.icon}</div>
            <h2 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-300">{product.name}</h2>
            <p className="text-gray-700 dark:text-gray-200 text-center mb-4">{product.description}</p>
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-full font-semibold transition-colors mt-auto" disabled>
              Coming Soon
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Software; 