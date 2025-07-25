import React from 'react';

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="mgcu-theme min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-blue-100 bg-fixed text-gray-900"
    style={{ fontFamily: 'Poppins, Inter, Nunito, Arial, sans-serif', letterSpacing: '0.01em' }}
  >
    {children}
  </div>
);

export default ThemeWrapper; 