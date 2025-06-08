import React from 'react';

const VisualizeSection = () => {
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Visualize Data</h2>
      <div className="bg-glassWhite dark:bg-gray-800 bg-opacity-40 dark:bg-opacity-40 rounded-2xl shadow-lg p-6 backdrop-blur-md dark:backdrop-blur-md">
        <p className="text-gray-700 dark:text-gray-300">Fitur ini sedang dalam pengembangan. :)</p>
        {/* Nantinya disini akan ada form untuk memilih jenis grafik dan kolom */}
      </div>
    </div>
  );
};

export default VisualizeSection;