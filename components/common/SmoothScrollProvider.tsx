"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.2,
    });

    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    // Allow modals/overlays to pause Lenis scroll
    const handleStop = () => lenis.stop();
    const handleStart = () => lenis.start();
    window.addEventListener("lenis:stop", handleStop);
    window.addEventListener("lenis:start", handleStart);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("lenis:stop", handleStop);
      window.removeEventListener("lenis:start", handleStart);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
