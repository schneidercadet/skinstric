"use client";

import React, { useState, useRef, useEffect } from "react";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import { useAnimations } from "@/components/hooks/useAnimations";
import { VideoPanel } from "@/components/VideoPanel";
import { DiamondButton } from "@/components/ui/button";

const Landing = () => {
  const [hoverState, setHoverState] = useState<"none" | "left" | "right">(
    "none"
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [debugClicked, setDebugClicked] = useState(false);

  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const leftButtonRef = useRef<HTMLDivElement>(null);
  const rightButtonRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const sophisticatedRef = useRef<HTMLSpanElement>(null);
  const skincareRef = useRef<HTMLSpanElement>(null);
  const enterExperienceButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  useAnimations(hoverState, {
    leftPanelRef,
    rightPanelRef,
    leftButtonRef,
    rightButtonRef,
    textContainerRef,
    sophisticatedRef,
    skincareRef,
  });

  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(255, 255, 255)"
      gradientBackgroundEnd="rgb(240, 240, 240)"
      firstColor="18, 113, 255"
      secondColor="221, 74, 255"
      thirdColor="100, 220, 255"
      fourthColor="180, 107, 180"
      fifthColor="120, 120, 250"
      interactive={true}
      containerClassName="absolute inset-0"
    >
      <VideoPanel
        ref={leftPanelRef}
        side="left"
        isActive={hoverState === "left"}
        onHover={() => setHoverState("left")}
        onHoverEnd={() => setHoverState("none")}
        videoSrc="/assets/videos/video10.webm"
        title="DISCOVER A.I."
        linkHref="/discover"
        buttonRef={leftButtonRef}
        oppositeIsActive={hoverState === "right"}
        isLoaded={isLoaded}
      />

      <VideoPanel
        ref={rightPanelRef}
        side="right"
        isActive={hoverState === "right"}
        onHover={() => setHoverState("right")}
        onHoverEnd={() => setHoverState("none")}
        videoSrc="/assets/videos/video20.webm"
        title="TAKE TEST"
        linkHref="/take-test"
        buttonRef={rightButtonRef}
        oppositeIsActive={hoverState === "left"}
        isLoaded={isLoaded}
      />

      <div
        ref={textContainerRef}
        className="absolute inset-0 flex items-center justify-center z-10"
        style={{
          padding: "0 4vw sm:0 8vw",
          transition: "transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)",
          transform:
            hoverState === "left"
              ? "translateX(20%)"
              : hoverState === "right"
                ? "translateX(-20%)"
                : "translateX(0)",
          pointerEvents: "none",
        }}
      >
        <h1
          className="font-light text-[#1A1B1C] relative z-10 flex flex-col"
          style={{
            fontFamily: "Roobert",
            fontWeight: 300,
            fontSize: "clamp(58px, 10vw, 128px)",
            lineHeight: "1.05",
            letterSpacing: "-0.07em",
            width: "100%",
            maxWidth: "680px",
            textAlign: "center",
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 1.5s cubic-bezier(0.22, 1, 0.36, 1), transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        >
          <span ref={sophisticatedRef} className="block">
            Sophisticated
          </span>
          <span
            ref={skincareRef}
            className="block"
            style={{
              transition: "transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)",
              transform:
                hoverState === "left"
                  ? "translateX(20%)"
                  : hoverState === "right"
                    ? "translateX(-20%)"
                    : "translateX(0)",
            }}
          >
            skincare
          </span>

          <div
            className="md:hidden mt-12 text-center w-full max-w-xs mx-auto"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, transform 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.3s'
            }}
          >
            <p
              className="text-[#1A1B1C] text-sm sm:text-base uppercase mb-10 px-4 leading-[1.8]"
              style={{
                fontFamily: "Roobert",
                fontWeight: 400,
                letterSpacing: "0.05em",
                textShadow: "0px 0px 5px rgba(255, 255, 255, 0.7)",
              }}
            >
              SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED
              ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.
            </p>

            <div className="mt-8 flex flex-col items-center">
              <div
                className="relative"
                style={{ 
                  zIndex: 9999, 
                  pointerEvents: "auto",
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.5s, transform 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.5s'
                }}
                onClick={() => {
                  console.log("Container div clicked");
                  window.location.href = "/enter-experience";
                  setDebugClicked(true);
                }}
              >
                <DiamondButton
                  side="right"
                  isActive={false}
                  onHover={() => {}}
                  onHoverEnd={() => {}}
                  linkHref="/enter-experience"
                  buttonRef={enterExperienceButtonRef}
                  isLoaded={isLoaded}
                />
                {debugClicked && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white p-1 text-xs">
                    Clicked!
                  </div>
                )}
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span
                    className="text-xs tracking-widest font-bold uppercase text-[#1A1B1C]"
                    style={{
                      textShadow: "0px 0px 5px rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    ENTER EXPERIENCE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </h1>
      </div>

      <div
        className="absolute bottom-10 left-5 max-w-md z-10 hidden md:block"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.5s, transform 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.5s'
        }}
      >
        <p
          className="text-[#1A1B1C] text-sm md:text-lg leading-relaxed uppercase"
          style={{
            fontFamily: "Roobert",
            fontWeight: 400,
            letterSpacing: "0.05em",
            textShadow: "0px 0px 5px rgba(255, 255, 255, 0.7)",
          }}
        >
          SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED ROUTINE
          TAILORED TO WHAT YOUR SKIN NEEDS.
        </p>
      </div>
    </BackgroundGradientAnimation>
  );
};

export default Landing;
