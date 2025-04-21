"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface DiamondItem {
  title: string;
  href: string;
}

interface DiamondLayoutProps {
  items: {
    top: DiamondItem;
    right: DiamondItem;
    bottom: DiamondItem;
    left: DiamondItem;
  };
  gap: number;
  size: number;
}

export default function DiamondLayout({
  items,
  gap = 20,
  size = 200,
}: DiamondLayoutProps) {
  const containerSize = size * 2 + gap;
  const outerOffset = 0;
  const innerOffset = size + gap;
  
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  const handleClick = () => {
    setClicked(true);
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative"
      style={{
        width: `${containerSize}px`,
        height: `${containerSize}px`,
      }}
    >
      {/* Top Diamond */}
      <Link href={clicked ? '#' : items.top.href}>
        <div
          className={`absolute rotate-45 bg-zinc-100 border-[0.10px] border-neutral-50/0 hover:bg-purple-50 cursor-pointer flex items-center justify-center z-10
          transition-all duration-500 ease-out
          ${visible && !clicked ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: outerOffset,
            left: innerOffset / 2,
            transitionDelay: '100ms',
          }}
          onClick={handleClick}
        >
          <span className="text-zinc-900 text-sm font-semibold uppercase -rotate-45 text-center">
            {formatTitle(items.top.title)}
          </span>
        </div>
      </Link>

      {/* Bottom Diamond */}
      <Link href={clicked ? '#' : items.bottom.href}>
        <div
          className={`absolute rotate-45 bg-zinc-100 border-[0.10px] border-neutral-50/0 hover:bg-purple-50 cursor-pointer flex items-center justify-center z-10
          transition-all duration-500 ease-out
          ${visible && !clicked ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: innerOffset,
            left: innerOffset / 2,
            transitionDelay: '300ms',
          }}
          onClick={handleClick}
        >
          <span className="text-zinc-900 text-sm font-semibold uppercase -rotate-45 text-center">
            {formatTitle(items.bottom.title)}
          </span>
        </div>
      </Link>

      {/* Left Diamond */}
      <Link href={clicked ? '#' : items.left.href}>
        <div
          className={`absolute rotate-45 bg-zinc-100 border-[0.10px] border-neutral-50/0 hover:bg-purple-50 cursor-pointer flex items-center justify-center z-10
          transition-all duration-500 ease-out
          ${visible && !clicked ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: innerOffset / 2,
            left: outerOffset,
            transitionDelay: '200ms',
          }}
          onClick={handleClick}
        >
          <span className="text-zinc-900 text-sm font-semibold uppercase -rotate-45 text-center">
            {formatTitle(items.left.title)}
          </span>
        </div>
      </Link>

      {/* Right Diamond */}
      <Link href={clicked ? '#' : items.right.href}>
        <div
          className={`absolute rotate-45 bg-zinc-100 border-[0.10px] border-neutral-50/0 hover:bg-purple-50 cursor-pointer flex items-center justify-center z-10
          transition-all duration-500 ease-out
          ${visible && !clicked ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: innerOffset / 2,
            left: innerOffset,
            transitionDelay: '150ms',
          }}
          onClick={handleClick}
        >
          <span className="text-zinc-900 text-sm font-semibold uppercase -rotate-45 text-center">
            {formatTitle(items.right.title)}
          </span>
        </div>
      </Link>
    </div>
  );
}

function formatTitle(title: string) {
  if (title === "Skin Type Details") {
    return (
      <>
        Skin Type
        <br />
        Details
      </>
    );
  }

  if (title === "Cosmetic Concerns") {
    return (
      <>
        Cosmetic
        <br />
        Concerns
      </>
    );
  }

  if (!title.includes(" ")) {
    return title;
  }

  return (
    <>
      {title.split(" ").map((word, i, arr) => (
        <React.Fragment key={i}>
          {word}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
}
