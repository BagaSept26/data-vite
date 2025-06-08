// src/components/VisualizeSection.jsx
import React, { useState } from 'react';
import { visualizeData, askAi } from '../utils/api'; // Import fungsi API
import { 
    FaChartBar, 
    FaChartLine, 
    FaChartPie, 
    FaChartSimple, 
    FaEquals } 
from 'react-icons/fa6';

const VisualizeSection = () => {
    const [chartType, setChartType] = useState('bar');
    const [columnX, setColumnX] = useState('');
    const [columnY, setKolomY] = useState('');
    const [chartTitle, setChartTitle] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [visualizeError, setVisualizeError] = useState(null);
    const [askAiPrompt, setAskAiPrompt] = useState('');
    const [askAiResponse, setAskAiResponse] = useState('');
    const [isAskingAi, setIsAskingAi] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    

    const handleAskAi = async () => {
        if (!askAiPrompt) return;
        
        setIsAskingAi(true);
        setAskAiResponse('');
        try {
            const response = await askAi(askAiPrompt);
            if (response.jawaban) {
                setAskAiResponse(response.jawaban);
            } else {
                setAskAiResponse(response.error || 'Failed to get Ask AI response.');
            }
        } catch (error) {
            console.error("Ask AI error:", error);
            setAskAiResponse('Failed to get Ask AI response.');
        } finally {
            setIsAskingAi(false);
        }
    };

  const handleVisualize = async () => {
    setIsLoading(true);
    setVisualizeError(null);
    setImageUrl(null);
    setAskAiResponse('');
    try {
      const response = await visualizeData(chartType, columnX, columnY, chartTitle);
      setIsLoading(false);

      if (response.error) {
        setVisualizeError(response.error);
      } else {
        setImageUrl(response.imageUrl);
        setAskAiResponse(response.ask_ai);
      }
    } catch (error) {
      console.error("Visualize error:", error);
      setVisualizeError("An error occurred while visualizing data.");
      setIsLoading(false);
    }
  };

  const chartOptions = [
    { value: 'bar', label: 'Bar Chart', icon: <FaChartBar /> },
    { value: 'line', label: 'Line Chart', icon: <FaChartLine /> },
    { value: 'pie', label: 'Pie Chart', icon: <FaChartPie /> },
    { value: 'scatter', label: 'Scatter Plot', icon: <FaChartSimple /> },
    { value: 'heatmap', label: 'Heatmap', icon: <FaEquals /> },
  ];

  return (
        <div className="container mx-auto p-6 max-w-3xl">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Visualize Data</h2>
            <div className="bg-glassWhite dark:bg-gray-800 bg-opacity-40 dark:bg-opacity-40 rounded-2xl shadow-lg p-6 backdrop-blur-md dark:backdrop-blur-md">
                <div className="mb-4">
                    <label htmlFor="chartType" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        Chart Type:
                    </label>
                    <select
                        id="chartType"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-500"
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value)}
                    >
                        {chartOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="columnX" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        Column X:
                    </label>
                    <input
                        type="text"
                        id="columnX"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-500"
                        value={columnX}
                        onChange={(e) => setColumnX(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="columnY" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        Column Y:
                    </label>
                    <input
                        type="text"
                        id="columnY"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-500"
                        value={columnY}
                        onChange={(e) => setKolomY(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="chartTitle" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        Chart Title:
                    </label>
                    <input
                        type="text"
                        id="chartTitle"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-500"
                        value={chartTitle}
                        onChange={(e) => setChartTitle(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleVisualize}
                    disabled={isLoading}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Visualizing...' : 'Visualize'}
                </button>

                {visualizeError && <p className="text-red-500 mt-4">{visualizeError}</p>}

                {imageUrl && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2 dark:text-white">Visualization:</h3>
                        <img src={imageUrl} alt="Chart" className="max-w-full rounded-lg shadow-md" />
                    </div>
                )}

                <div className="mt-6">
                    <label htmlFor="askAiPrompt" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        Ask AI about this Chart:
                    </label>
                    <textarea
                        id="askAiPrompt"
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-500"
                        placeholder="Ask AI for insights about the chart..."
                        value={askAiPrompt}
                        onChange={(e) => setAskAiPrompt(e.target.value)}
                        rows="4"
                    />
                    <button
                        onClick={handleAskAi}
                        disabled={isAskingAi || !askAiPrompt}
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline mt-4 ${isAskingAi || !askAiPrompt ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isAskingAi ? 'Asking...' : 'Ask AI'}
                    </button>
                     {askAiResponse && <p className="mt-4 text-gray-700 dark:text-gray-300">{askAiResponse}</p>}
                </div>
            </div>
        </div>
    );
};

export default VisualizeSection;