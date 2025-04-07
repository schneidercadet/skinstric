"use client";

import React, {
  forwardRef,
  RefObject,
  useEffect,
  useState,
} from "react";
import { DiamondButton } from "@/components/ui/button";

const ClientOnlyVideo = ({ src, className }: { src: string; className: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) return null;
  
  return (
    <video 
      src={src}
      className={className}
      autoPlay={true}
      playsInline={true}
      muted={true}
      loop={true}
      preload="metadata"
    />
  );
};

interface VideoPanelProps {
  side: "left" | "right";
  isActive: boolean;
  onHover: () => void;
  onHoverEnd: () => void;
  videoSrc: string;
  title: string;
  linkHref: string;
  buttonRef: RefObject<HTMLDivElement | null>;
  oppositeIsActive?: boolean;
  isLoaded?: boolean;
}

export const VideoPanel = forwardRef<HTMLDivElement | null, VideoPanelProps>(
  (
    {
      side,
      isActive,
      onHover,
      onHoverEnd,
      videoSrc,
      title,
      linkHref,
      buttonRef,
      oppositeIsActive = false,
      isLoaded = false,
    },
    ref
  ) => {
    const isLeft = side === "left";

    const handleHover = () => {
      onHover();
    };

    const handleHoverEnd = () => {
      onHoverEnd();
    };

    return (
      <div className="hidden md:block">
        <div
          ref={ref}
          className={`fixed top-0 ${isLeft ? "left-0" : "right-0"} h-full z-30 ${oppositeIsActive ? "pointer-events-none" : ""}`}
          style={{
            opacity: oppositeIsActive ? 0 : 1,
            transform: oppositeIsActive 
              ? `translateX(${isLeft ? '-100vw' : '100vw'})` 
              : 'translateX(0)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div className="relative h-full w-full">
            <div
              className={`absolute top-0 ${isLeft ? "left-0" : "right-0"} h-full overflow-hidden ${isActive ? "w-full opacity-100" : "w-0 opacity-0"}`}
            >
              <div className="h-full w-full relative overflow-hidden">
                <ClientOnlyVideo 
                  src={videoSrc}
                  className="absolute h-[150%] w-[55%] max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover -rotate-12"
                />
              </div>
            </div>

            <div
              className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? "left-6" : "right-6"} flex items-center whitespace-nowrap transition-opacity duration-500 ${oppositeIsActive ? "opacity-0" : "opacity-100"} ${isLoaded ? "animate-fadeIn" : "opacity-0"}`}
            >
              {!isLeft && (
                <span
                  className={`mr-6 hidden sm:inline-block font-bold uppercase text-sm tracking-wider text-[#1A1B1C] px-4 transition-opacity duration-300 ${isActive ? "opacity-0" : isLoaded ? "opacity-100" : "opacity-0"}`}
                >
                  {title}
                </span>
              )}

              <DiamondButton
                side={side}
                isActive={isActive}
                onHover={handleHover}
                onHoverEnd={handleHoverEnd}
                linkHref={linkHref}
                buttonRef={buttonRef}
                isLoaded={isLoaded}
              />

              {isLeft && (
                <span
                  className={`ml-6 hidden sm:inline-block font-bold uppercase text-sm tracking-wider text-[#1A1B1C] px-4 transition-opacity duration-300 ${isActive ? "opacity-0" : isLoaded ? "opacity-100" : "opacity-0"}`}
                >
                  {title}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

VideoPanel.displayName = "VideoPanel";
