import React from 'react';

const FeatureCard = ({ title, description, icon, onClick }) => {
  return (
    <div
      className="bg-glassWhite dark:bg-gray-800 bg-opacity-40 dark:bg-opacity-40 rounded-2xl shadow-lg p-6 cursor-pointer hover:scale-105 transition-transform duration-300 backdrop-blur-md dark:backdrop-blur-md"
      onClick={onClick}
    >
      <div className="text-5xl mb-4 text-gray-800 dark:text-white">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default FeatureCard;