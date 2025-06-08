import React from 'react'
import { BrowserRouter as Router, Routes,Route, Link } from 'react-router-dom';
import Home from './pages/Home'
import UploadSection from './components/UploadSection'
import QuickInsightsSection from './components/QuickInsightsSection';
import VisualizeSection from './components/VisualizeSection';
import CleanTransformSection from './components/CleanTransformSection';
import AIReportPredictionSection from './components/AIReportPredictionSection';

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-darkBg">
        <nav className="bg-glassWhite dark:bg-gray-800 backdrop-filter backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80 border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-xl font-semibold dark:text-white">Data Science Lab</Link>
            </div>
        </nav>
        <div className="container mx-auto px-4 py-16 mt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<UploadSection />} />
              <Route path="/insights" element = {<QuickInsightsSection/>}/>
              <Route path="/visualize" element = {<VisualizeSection/>}/>
              <Route path="/transform" element = {<CleanTransformSection/>}/>
              <Route path="/report" element = {<AIReportPredictionSection/>}/>            

            </Routes>
          </div>
        </div>
    </Router>
  );
}

export default App