"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { DiamondButton } from "@/components/ui/button";

const EnterExperience = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const leftButtonRef = useRef<HTMLDivElement>(null);
  const rightButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="relative z-50">
        <Navbar />
      </div>
      
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(255, 255, 255)"
        gradientBackgroundEnd="rgb(240, 240, 240)"
        firstColor="221, 74, 255"  
        secondColor="255, 113, 206"
        thirdColor="255, 180, 220"
        fourthColor="180, 107, 180"
        fifthColor="120, 120, 250"
        interactive={true}
        containerClassName="absolute inset-0 z-10"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="text-center mb-10 px-6">
            <h1 
              className={`text-[#1A1B1C] text-center mb-4 ${isLoaded ? "animate-fadeIn" : "opacity-0"}`} 
              style={{ 
                fontFamily: "Roobert", 
                fontWeight: 400,
                fontSize: "clamp(48px, 7vw, 40px)",
                letterSpacing: "-0.05em",
              }}
            >
              Sophisticated<br />skincare
            </h1>
          </div>
          
          <div className={`flex flex-col gap-8 md:hidden ${isLoaded ? "animate-fadeInDelayed" : "opacity-0"}`}>
            <div className="flex flex-col items-center">
              <div className="relative">
                <DiamondButton
                  side="left"
                  isActive={false}
                  onHover={() => {}}
                  onHoverEnd={() => {}}
                  linkHref="/discover/ai"
                  buttonRef={leftButtonRef}
                  isLoaded={isLoaded}
                />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span
                    className="text-xs tracking-widest font-bold uppercase text-[#1A1B1C]"
                    style={{
                      textShadow: "0px 0px 5px rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    DISCOVER A.I.
                  </span>
                </div>
              </div>
              <p className="text-xs text-center mt-12 max-w-[200px] text-[#1A1B1C]">
              Discover your perfect skincare routine tailored specifically for your unique needs
              </p>
            </div>
            
            <div className="flex flex-col items-center mt-6">
              <div className="relative">
                <DiamondButton
                  side="right"
                  isActive={false}
                  onHover={() => {}}
                  onHoverEnd={() => {}}
                  linkHref="/take-test"
                  buttonRef={rightButtonRef}
                  isLoaded={isLoaded}
                />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span
                    className="text-xs tracking-widest font-bold uppercase text-[#1A1B1C]"
                    style={{
                      textShadow: "0px 0px 5px rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    TAKE TEST
                  </span>
                </div>
              </div>
              <p className="text-xs text-center mt-12 max-w-[200px] text-[#1A1B1C]">
                Take our comprehensive skin test to find your perfect routine
              </p>
            </div>
          </div>
        </div>
      </BackgroundGradientAnimation>
    </div>
  );
};

export default EnterExperience;
