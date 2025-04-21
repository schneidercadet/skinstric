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
  variant?: "primary" | "secondary" | "outline" | "animated" | "dark-animated" | "action";
  size?: "sm" | "md" | "lg" | "custom";
  className?: string;
  children: React.ReactNode;
  href?: string;
  customHeight?: string;
  customWidth?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  customHeight,
  customWidth,
  ...props
}: ButtonProps) {
  const baseStyles = "relative overflow-hidden font-medium transition-all duration-300 box-border";

  const variants = {
    primary: "bg-black text-white hover:bg-black/90 border border-black",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-black",
    outline: "border border-black text-zinc-900 hover:bg-gray-100",
    animated: "bg-black box-border border border-black",
    "dark-animated": "bg-white border border-black box-border",
    action: "text-zinc-900 border border-black hover:bg-gray-100"
  };

  const sizes = {
    sm: "px-3 py-[5px] text-[9px] sm:text-[10px] uppercase",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    custom: ""
  };

  const getCustomSizeStyles = () => {
    if (size !== 'custom') return '';
    
    return `${customHeight ? `h-[${customHeight}]` : ''} ${customWidth ? `w-[${customWidth}]` : ''}`;
  };

  const buttonContent = () => {
    if (variant === "animated") {
      return (
        <>
          <span className="text-white text-sm font-bold transition-transform duration-300 group-hover:-translate-y-full block">
            {children}
          </span>
          <span className="text-black text-sm font-bold absolute inset-0 flex items-center justify-center bg-white translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            {children}
          </span>
        </>
      );
    } else if (variant === "dark-animated") {
      return (
        <>
          <span className="text-black text-sm font-bold transition-transform duration-300 group-hover:-translate-y-full block">
            {children}
          </span>
          <span className="text-white text-sm font-bold absolute inset-0 flex items-center justify-center bg-black translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            {children}
          </span>
        </>
      );
    } else {
      return children;
    }
  };

  const buttonElement = (
    <button
      className={cn(
        baseStyles, 
        variants[variant], 
        sizes[size], 
        getCustomSizeStyles(), 
        variant.includes('animated') ? 'group' : '',
        className
      )}
      {...props}
    >
      {buttonContent()}
    </button>
  );

  if (href) {
    return <Link href={href}>{buttonElement}</Link>;
  }

  return buttonElement;
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
