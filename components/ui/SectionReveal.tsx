"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  y = 36,
  once = true,
}: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
