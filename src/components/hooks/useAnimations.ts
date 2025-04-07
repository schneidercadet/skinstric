import { useEffect, RefObject } from 'react';
import { gsap } from 'gsap';

export type HoverState = 'none' | 'left' | 'right';

export interface AnimationRefs {
  leftPanelRef: RefObject<HTMLDivElement | null>;
  rightPanelRef: RefObject<HTMLDivElement | null>;
  leftButtonRef: RefObject<HTMLDivElement | null>;
  rightButtonRef: RefObject<HTMLDivElement | null>;
  textContainerRef: RefObject<HTMLDivElement | null>;
  sophisticatedRef: RefObject<HTMLSpanElement | null>;
  skincareRef: RefObject<HTMLSpanElement | null>;
}

export const useAnimations = (hoverState: HoverState, refs: AnimationRefs) => {
  useEffect(() => {
    const {
      leftPanelRef,
      rightPanelRef,
      leftButtonRef,
      rightButtonRef,
    } = refs;

    const ctx = gsap.context(() => {
      if (hoverState === "left") {
        gsap.to(leftPanelRef.current, {
          width: "50%",
          duration: 0.8,
          ease: "power2.out"
        });
        
        gsap.to(leftButtonRef.current, {
          x: "calc(50vw + 32px)",
          rotate: 180,
          duration: 0.8,
          ease: "power2.out"
        });
        
      } else if (hoverState === "right") {
        gsap.to(rightPanelRef.current, {
          width: "50%",
          duration: 0.8,
          ease: "power2.out"
        });
        
        gsap.to(rightButtonRef.current, {
          x: "calc(-50vw - 32px)",
          rotate: 180,
          duration: 0.8,
          ease: "power2.out"
        });
      } else {
        gsap.to([leftPanelRef.current, rightPanelRef.current], {
          width: "auto",
          duration: 0.8,
          ease: "power2.out"
        });

        gsap.to([leftButtonRef.current, rightButtonRef.current], {
          x: 0,
          rotate: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    });

    return () => ctx.revert();
  }, [hoverState, refs]);
};