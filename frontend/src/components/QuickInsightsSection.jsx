import React, { useState, useEffect } from 'react';
import { getQuickInsights, askAi } from '../utils/api';
import { FaChartBar } from 'react-icons/fa';

const QuickInsightsSection = () => {
    const [insights, setInsights] = useState(null);
    const [insightsError, setInsightsError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [askAiPrompt, setAskAiPrompt] = useState('');
    const [askAiResponse, setAskAiResponse]= useState('');
    const [isAskingAi, setIsAskingAi] = useState(false);

    useEffect(() => {
        const fetchInsights = async () => {
            setIsLoading(true);
            setInsightsError(null);
            setInsights(null);

            try {
                const response = await getQuickInsights();
                setIsLoading(false);

                if (response.error) {
                    setInsightsError(response.error);
                } else {
                    setInsights(response);
                }
            } catch (error) {
                console.error("Quick Insights error:", error);
                setInsightsError('Failed to get quick insights.');
                setIsLoading(false);
            }
        };

        fetchInsights();
    }, []);

    const handleAskAi = async () =>{
        if(!askAiPrompt) return;
        setIsAskingAi(true);
        setAskAiResponse('');
        try{
            const response = await askAi(askAiPrompt);
            if(response.jawaban){
                setAskAiResponse(response.jawaban);
            }
            else{
                setAskAiResponse(response.error || 'Failed to get ask AI response.');
            }
        } catch (error){
            console.error("Ask AI error:", error);
            setAskAiResponse('Failed to get ask AI response.');
        } finally{
            setIsAskingAi(false)
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-3xl">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Quick Insights</h2>
            {isLoading && <p className="dark:text-white">Loading insights...</p>}
            {insightsError && <p className="text-red-500">{insightsError}</p>}
            {insights && (
                <div className="bg-glassWhite dark:bg-gray-800 bg-opacity-40 dark:bg-opacity-40 rounded-2xl shadow-lg p-6 backdrop-blur-md dark:backdrop-blur-md">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">Summary Statistics</h3>
                    <div dangerouslySetInnerHTML={{ __html: insights.summary }} className="overflow-x-auto" />

                    <h3 className="text-lg font-semibold mt-4 dark:text-white">Missing Values</h3>
                    <div dangerouslySetInnerHTML={{ __html: insights.missing_values }} className="overflow-x-auto" />

                    <h3 className="text-lg font-semibold mt-4 dark:text-white">Outliers</h3>
                    <div dangerouslySetInnerHTML={{ __html: insights.outliers }} className="overflow-x-auto" />

                    <h3 className="text-lg font-semibold mt-4 dark:text-white">Correlation</h3>
                    <div dangerouslySetInnerHTML={{ __html: insights.correlation }} className="overflow-x-auto" />

                    <div className="mt-6">
                        <label htmlFor="askAiPrompt" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Ask AI for More Insights:
                        </label>
                        <textarea
                            id="askAiPrompt"
                            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-500"
                            placeholder="Ask a specific question about your data..."
                            value={askAiPrompt}
                            onChange={(e) => setAskAiPrompt(e.target.value)}
                            rows="4"
                        />
                        <button
                            onClick={handleAskAi}
                            disabled={isAskingAi || !askAiPrompt}
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 ${isAskingAi || !askAiPrompt ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isAskingAi ? 'Asking...' : 'Ask AI'}
                        </button>
                        {askAiResponse && <p className="mt-4 text-gray-700 dark:text-gray-300">{askAiResponse}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuickInsightsSection;