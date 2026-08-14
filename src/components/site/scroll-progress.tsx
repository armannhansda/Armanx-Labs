"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      suppressHydrationWarning
      className="fixed top-0 left-0 right-0 h-px bg-lab-accent origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}
