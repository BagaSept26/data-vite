import React from 'react';
import FeatureCard from '../components/FeatureCard';
import { FaFileUpload, FaChartBar, FaChartLine, FaMagic, FaRobot } from 'react-icons/fa'; // react-icons
import {Link} from 'react-router-dom'

const Home = () => {
  const features = [
    {
      title: "Upload Data",
      description: "Upload your CSV, Excel, JSON, PDF, or TXT files.",
      icon: <FaFileUpload />,
      onClick: () => console.log("Upload clicked"),
      path: "/upload",
    },
    {
      title: "Quick Insights",
      description: "Get summary statistics and insights from your data.",
      icon: <FaChartBar />,
      onClick: () => console.log("Insights clicked"),
      path: "/insights",
    },
    {
      title: "Visualize Data",
      description: "Generate charts and graphs to visualize your data.",
      icon: <FaChartLine />,
      onClick: () => console.log("Visualize clicked"),
      path: "/visualize",
    },
    {
      title: "Clean & Transform",
      description: "Clean and transform your data without coding.",
      icon: <FaMagic />,
      onClick: () => console.log("Transform clicked"),
      path: "/transform",
    },
    {
      title: "AI Report & Prediction",
      description: "Generate reports and predictions using AI.",
      icon: <FaRobot />,
      onClick: () => console.log("AI clicked"),
      path: "/report",
    },
  ];

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <img
        src="/background.jpg"
        alt="Background"
        className="absolute h-full w-full object-cover top-0 left-0 -z-10"
      />
      <div className="absolute top-0 left-0 h-full w-full bg-black opacity-40 -z-10" />

      <div className="container mx-auto h-full flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
          {features.map((feature, index) => (
            <Link to={feature.path} key={index} className="block"> {/* Bungkus FeatureCard dengan Link */}
              <FeatureCard {...feature} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;