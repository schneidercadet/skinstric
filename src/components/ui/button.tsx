"use client";

import React, { ButtonHTMLAttributes, forwardRef, RefObject } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Icon from "@mdi/react";
import {
  mdiArrowTopRightThick,
  mdiArrowBottomLeftThick,
  mdiRhombus,
} from "@mdi/js";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative overflow-hidden font-medium transition-all duration-200";

  const variants = {
    primary: "bg-black text-white hover:bg-black/90",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border-2 border-gray-200 text-gray-900 hover:bg-white/50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

interface DiamondButtonProps {
  side: "left" | "right";
  isActive: boolean;
  onHover: () => void;
  onHoverEnd: () => void;
  linkHref: string;
  buttonRef: RefObject<HTMLDivElement | null>;
  isLoaded?: boolean;
}

export const DiamondButton = forwardRef<
  HTMLDivElement | null,
  DiamondButtonProps
>(
  (
    {
      side,
      isActive,
      onHover,
      onHoverEnd,
      linkHref,
      buttonRef,
      isLoaded = false,
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref
  ) => {
    const isLeft = side === "left";

    return (
      <div
        ref={buttonRef}
        onMouseEnter={onHover}
        onMouseLeave={onHoverEnd}
        className={isLoaded ? "animate-fadeIn" : "opacity-0"}
      >
        <Link href={linkHref}>
          <div className="h-12 w-12 sm:h-16 sm:w-16 rotate-45 border border-gray-300 border-dashed flex items-center justify-center backdrop-blur-sm bg-white/20 hover:bg-white/40 transition-colors">
            <div className="-rotate-45 flex items-center justify-center">
              {isActive ? (
                <Icon path={mdiRhombus} size={1} className="text-gray-700" />
              ) : (
                <Icon
                  path={
                    isLeft ? mdiArrowTopRightThick : mdiArrowBottomLeftThick
                  }
                  size={0.8}
                  className="text-gray-700"
                />
              )}
            </div>
          </div>
        </Link>
      </div>
    );
  }
);

DiamondButton.displayName = "DiamondButton";

export interface ButtonLabelProps {
  className?: string;
  children: React.ReactNode;
}
