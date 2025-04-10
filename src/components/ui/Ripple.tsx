"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RippleProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  opacity?: number;
  count?: number;
  spacing?: number;
  breathingDelay?: number;
}

const Ripple: React.FC<RippleProps> = ({
  size = 600,
  opacity = 0.6,
  count = 5,
  spacing = 60,
  breathingDelay = 0.3,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden",
        className
      )}
      {...props}
    >
      <style jsx>{`
        @keyframes cosmicPulse {
          0% {
            transform: translate(-50%, -50%) rotate(45deg) scale(0.95);
          }
          50% {
            transform: translate(-50%, -50%) rotate(45deg) scale(1);
          }
          100% {
            transform: translate(-50%, -50%) rotate(45deg) scale(0.95);
          }
        }

        .ripple-circle {
          position: absolute;
          transform: translate(-50%, -50%) rotate(45deg) scale(0.95);
          top: 50%;
          left: 50%;
          border-style: solid;
          border-color: var(--border-color);
          background-color: var(--bg-color);
        }
      `}</style>

      {Array.from({ length: count }).map((_, i) => {
        const circleSize = size + i * (spacing * 2);
        const circleOpacity = Math.max(0.2, opacity - i * 0.06);
        const delay = i * breathingDelay;
        const borderColor = "#c4b5fd";
        const bgColor = "rgba(196, 181, 253, 0.15)";
        const startThickness = 4;
        const borderWidth = `${Math.max(1, startThickness - i)}px`;
        const borderStyle =
          i === 1 || i === 3 || i === 5
            ? "solid"
            : i % 2 === 0
              ? "solid"
              : "dashed";

        return (
          <div
            key={i}
            className="ripple-circle"
            style={
              {
                width: circleSize,
                height: circleSize,
                opacity: circleOpacity,
                borderWidth,
                borderStyle,
                animation: `cosmicPulse 4s ease-in-out ${delay}s infinite`,
                "--border-color": borderColor,
                "--bg-color": bgColor,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
};

export { Ripple };
