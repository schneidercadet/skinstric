"use client";

import React, { useState, useEffect } from "react";

interface AnimatedNotificationProps {
  title: string;
  items: Array<{
    text: string;
    complete?: boolean;
  }>;
  onClose?: () => void;
  show?: boolean;
  delay?: number;
}

export default function AnimatedNotification({
  title,
  items,
  onClose,
  show = true,
  delay = 0,
}: AnimatedNotificationProps) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [lineAnimating, setLineAnimating] = useState(false);

  useEffect(() => {
    if (!show) {
      setExpanded(false);
      setLineAnimating(false);

      setTimeout(() => {
        setVisible(false);
      }, 600);

      return;
    }

    const showTimer = setTimeout(() => {
      setVisible(true);

      setTimeout(() => {
        setLineAnimating(true);

        setTimeout(() => {
          setExpanded(true);
        }, 1000);
      }, 100);
    }, delay);

    return () => clearTimeout(showTimer);
  }, [show, delay]);

  const handleClose = () => {
    if (onClose) {
      setExpanded(false);

      setTimeout(() => {
        setLineAnimating(false);

        setTimeout(() => {
          setVisible(false);
          onClose();
        }, 1000);
      }, 500);
    }
  };

  if (!visible) return null;

  return (
    <div className="absolute left-[32px] top-[200px] bg-zinc-900 text-white overflow-hidden max-w-xs">
      <div className="h-[2px] w-full bg-neutral-50">
        <div
          className={`h-full bg-black origin-left transition-all duration-1000 ease-in-out`}
          style={{
            width: lineAnimating ? "100%" : "0%",
            transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        />
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          expanded ? "max-h-[300px]" : "max-h-0"
        }`}
      >
        <div className="p-6">
          <div className="uppercase text-sm mb-4">{title}</div>

          <div className="text-sm space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>{item.complete ? "◇" : "◆"}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {onClose && (
          <>
            <div className="h-[1px] w-full bg-white opacity-20" />
            <div
              className="text-right py-3 px-6 cursor-pointer"
              onClick={handleClose}
            >
              <span className="uppercase text-xs font-medium">OK</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
