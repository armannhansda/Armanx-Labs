"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

/**
 * Loader with frame-by-frame logo construction.
 * Draws the "AX" mark progressively using SVG path animation,
 * then fades out to reveal the site.
 */
export function Loader() {
  const [done, setDone] = useState(false);
  const progress = useMotionValue(0);
  const roundedProgress = useTransform(progress, (latest) =>
    Math.round(latest).toString().padStart(3, "0") + "%"
  );
  const progressWidth = useTransform(progress, (p) => `${p}%`);

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 1.8,
      ease: [0.33, 1, 0.68, 1], // ease-out cubic
    });

    const timer = setTimeout(() => setDone(true), 2150);

    return () => {
      controls.stop();
      clearTimeout(timer);
    };
  }, [progress]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#07070a] flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Frame-by-frame SVG logo construction — matches actual AX mark */}
          <div className="relative w-40 h-32 text-lab-fg">
            <svg
              viewBox="0 0 160 110"
              className="w-full h-full"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              {/* Frame 1: A — left diagonal stroke (bottom-left → top apex) */}
              <motion.path
                d="M 20 95 L 45 20"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, delay: 0.3, ease: "easeOut" }}
              />
              {/* Frame 2: A — right diagonal stroke (apex → bottom-right) */}
              <motion.path
                d="M 45 20 L 65 95"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, delay: 0.55, ease: "easeOut" }}
              />
              {/* Frame 3: A — crossbar */}
              <motion.path
                d="M 30 70 L 55 70"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.18, delay: 0.8, ease: "easeOut" }}
              />

              {/* Frame 4: X — left diagonal (top-left → bottom-right) */}
              <motion.path
                d="M 75 20 L 115 95"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, delay: 0.95, ease: "easeOut" }}
              />
              {/* Frame 5: X — right diagonal (bottom-left → top-right, ends short to leave room for pixels) */}
              <motion.path
                d="M 75 95 L 108 32"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, delay: 1.2, ease: "easeOut" }}
              />

              {/* Frame 6: pixel dissolve trail (5 cubes scattering off top-right of X) */}
              {[
                { x: 110, y: 28, s: 4 },
                { x: 116, y: 22, s: 3.5 },
                { x: 122, y: 16, s: 3 },
                { x: 128, y: 22, s: 2.5 },
                { x: 134, y: 12, s: 2.5 },
                { x: 124, y: 8, s: 2 },
                { x: 132, y: 26, s: 2 },
              ].map((px, i) => (
                <motion.rect
                  key={i}
                  x={px.x}
                  y={px.y}
                  width={px.s}
                  height={px.s}
                  fill={i % 3 === 0 ? "var(--color-lab-accent)" : "currentColor"}
                  stroke="none"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.25,
                    delay: 1.55 + i * 0.08,
                    ease: "backOut",
                  }}
                  style={{ transformOrigin: `${px.x}px ${px.y}px` }}
                />
              ))}
            </svg>
          </div>

          {/* Brand name reveal */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <div className="font-display text-xl tracking-[0.2em] text-lab-fg">
              ARMANX-LABS
            </div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-lab-muted mt-1">
              OPEN SOURCE TECHNOLOGY LAB
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48">
            <div className="flex justify-between font-mono text-[10px] text-lab-muted mb-2">
              <span>INITIALIZING</span>
              <motion.span className="text-lab-accent">{roundedProgress}</motion.span>
            </div>
            <div className="h-px w-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-lab-accent"
                style={{ width: progressWidth }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
