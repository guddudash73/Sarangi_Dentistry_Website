"use client";

import { ReactNode, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

export function ScrollVelocityContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      {children}
    </div>
  );
}

export function ScrollVelocityRow({
  children,
  baseVelocity = 10,
  className = "",
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 260,
    mass: 0.8,
  });

  const velocityFactor = useTransform(
    smoothVelocity,
    [-1200, 0, 1200],
    [-0.7, 0, 0.7],
    { clamp: false },
  );

  const directionFactor = useRef(baseVelocity >= 0 ? 1 : -1);

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return;

    const velocity = velocityFactor.get();

    if (velocity < 0) directionFactor.current = -1;
    if (velocity > 0) directionFactor.current = 1;

    let moveBy =
      directionFactor.current * Math.abs(baseVelocity) * (delta / 1000);

    moveBy += directionFactor.current * Math.abs(moveBy) * Math.abs(velocity);
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <motion.div style={{ x }} className="flex shrink-0 whitespace-nowrap">
        <span className="mx-4">{children}</span>
        <span className="mx-4">{children}</span>
        <span className="mx-4">{children}</span>
        <span className="mx-4">{children}</span>
      </motion.div>
    </div>
  );
}
