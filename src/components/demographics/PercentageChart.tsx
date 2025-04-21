import React, { useEffect, useState } from "react";

interface PercentageChartProps {
  percentage: number;
}

const PercentageChart: React.FC<PercentageChartProps> = ({
  percentage = 96,
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const size = 300;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 300);

    return () => clearTimeout(timer);
  }, [percentage]);

  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset =
    circumference - (animatedPercentage / 100) * circumference;

  return (
    <div className="bg-[#EBEBEB] h-auto sm:h-[484px] w-full flex flex-col p-4 sm:p-8 border-t border-black transform transition-all duration-500 ease-in-out">
      <h2 className="text-xs sm:text-sm font-bold text-zinc-900 mb-4 sm:mb-8 transform transition-all duration-500 ease-in-out">
        A. I. CONFIDENCE
      </h2>

      <div className="flex-grow flex items-center justify-center sm:justify-end sm:pr-12">
        <div
          className={`relative transform transition-all duration-700 ease-in-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ width: size * 0.8, height: size * 0.8, maxWidth: "100%" }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${size} ${size}`}
            className="transform -rotate-90"
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#E0E0E0"
              strokeWidth={strokeWidth}
              className="transition-all duration-700 ease-in-out"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#1A1B1C"
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: "stroke-dashoffset 1.2s ease-in-out" }}
              className="transition-all duration-700 ease-in-out"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-zinc-900 transform transition-all duration-700 ease-in-out">
              <span className="text-5xl sm:text-7xl font-normal text-shadow">
                {animatedPercentage}
              </span>
              <span className="text-2xl sm:text-3xl align-top ml-1 font-normal text-shadow">
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentageChart;
