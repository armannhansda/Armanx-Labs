"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * About / Manifesto section.
 * Uses scroll-driven frame-by-frame text reveal.
 */
export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 lg:py-48 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[11px] text-lab-accent">01</span>
              <span className="w-12 h-px bg-lab-accent/40" />
            </div>
            <h2 className="font-mono text-[11px] tracking-[0.25em] uppercase text-lab-muted">
              What is ArmanX-Labs
            </h2>
          </div>

          <div className="lg:col-span-9">
            <motion.h3
              suppressHydrationWarning
              style={{ y }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.05] tracking-[-0.03em] text-lab-fg text-balance"
            >
              An open-source technology lab where developers explore ideas,
              build practical software, and collaborate across{" "}
              <span className="text-lab-muted">developer tools, AI, software
              engineering, automation, and emerging technologies.</span>
            </motion.h3>
          </div>
        </div>

        {/* Philosophy line - large display */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="my-24 lg:my-32 border-y border-white/[0.06] py-16 lg:py-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-lab-dim">
                Philosophy
              </span>
            </div>
            <div className="lg:col-span-10">
              <p className="font-display text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight text-lab-fg">
                Explore ideas{" "}
                <span className="text-lab-accent">→</span> Build solutions{" "}
                <span className="text-lab-accent">→</span> Open the source{" "}
                <span className="text-lab-accent">→</span> Grow with the community
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mission grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[11px] text-lab-accent">02</span>
              <span className="w-12 h-px bg-lab-accent/40" />
            </div>
            <h2 className="font-mono text-[11px] tracking-[0.25em] uppercase text-lab-muted">
              Mission
            </h2>
          </div>

          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              {MISSION_ITEMS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="group"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-[10px] text-lab-dim mt-1.5 group-hover:text-lab-accent transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="font-display text-lg text-lab-fg mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-lab-muted leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background dot pattern */}
      <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none" />
    </section>
  );
}

const MISSION_ITEMS = [
  {
    title: "Build practical open-source software",
    desc: "We focus on tools and systems that solve real developer problems — not abstract experiments with no clear use case.",
  },
  {
    title: "Explore emerging technologies",
    desc: "From AI agents to graph databases to new programming paradigms, we experiment with what's next.",
  },
  {
    title: "Solve real developer problems",
    desc: "Every project starts with a question: what makes a developer's life harder than it needs to be?",
  },
  {
    title: "Make projects accessible to contributors",
    desc: "Clear documentation, good first issues, and architecture that welcomes newcomers — not gatekeeps them.",
  },
  {
    title: "Encourage learning through building",
    desc: "You don't need to be an expert to contribute. You become one by contributing.",
  },
  {
    title: "Grow a strong contributor community",
    desc: "Stars are vanity. Merged PRs from external contributors are the real metric of a healthy open-source project.",
  },
];
