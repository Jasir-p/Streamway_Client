import { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }) => {
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ['text-blue-600', 'text-purple-600', 'text-indigo-600', 'text-cyan-600'];
  
  // Update color every 800ms
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 800);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        {/* Simple loading text with changing color */}
        <div className={`text-2xl font-medium transition-colors duration-500 ${colors[colorIndex]}`}>
          Loading...
        </div>
        
        {/* Simple dot animation below */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};


export default LoadingScreen;
