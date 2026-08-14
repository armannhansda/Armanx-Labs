"use client";

import { motion } from "framer-motion";

const PRINCIPLES = [
  {
    id: "01",
    title: "Build in Public",
    description:
      "Development doesn't happen behind closed doors. Roadmaps, decisions, and rough edges are visible from day one — because the journey is part of the product.",
  },
  {
    id: "02",
    title: "Open by Default",
    description:
      "Source code, documentation, discussions, and development decisions should be accessible whenever practical. Closed is the exception, not the rule.",
  },
  {
    id: "03",
    title: "Community First",
    description:
      "Projects improve through different perspectives and contributions. A merged PR from an external contributor is worth more than a hundred stars.",
  },
  {
    id: "04",
    title: "Learn by Building",
    description:
      "People shouldn't need to be experts before contributing. You become an expert by shipping — failing, iterating, and shipping again in the open.",
  },
  {
    id: "05",
    title: "Experiment",
    description:
      "Failed experiments are still valuable if they produce knowledge. Some projects will become products. Others will remain experiments. Both are fine.",
  },
];

const CONTRIBUTION_TYPES = [
  "Code",
  "UI/UX",
  "Documentation",
  "Testing",
  "Issues",
  "Architecture",
  "Research",
  "Ideas",
  "Reviews",
];

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative py-32 lg:py-48 border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[11px] text-lab-accent">05</span>
              <span className="w-12 h-px bg-lab-accent/40" />
            </div>
            <h2 className="font-mono text-[11px] tracking-[0.25em] uppercase text-lab-muted">
              Open-Source Philosophy
            </h2>
          </div>
          <div className="lg:col-span-9">
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.05] tracking-[-0.03em] text-lab-fg text-balance">
              Open isn't a license choice —{" "}
              <span className="text-lab-muted">
                it's how the lab operates.
              </span>
            </h3>
          </div>
        </div>

        {/* Principles list - frame-by-frame reveal */}
        <div className="space-y-0">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 border-t border-white/[0.06] hover:bg-white/[0.015] transition-colors"
            >
              <div className="lg:col-span-2">
                <span className="font-mono text-2xl text-lab-dim group-hover:text-lab-accent transition-colors">
                  {p.id}
                </span>
              </div>
              <div className="lg:col-span-4">
                <h4 className="font-display text-2xl sm:text-3xl tracking-tight text-lab-fg group-hover:translate-x-1 transition-transform">
                  {p.title}
                </h4>
              </div>
              <div className="lg:col-span-6">
                <p className="text-lab-muted leading-relaxed text-base sm:text-lg">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/[0.06]" />
        </div>

        {/* Contribution types */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          <div className="lg:col-span-5">
            <h4 className="font-mono text-[11px] tracking-[0.25em] uppercase text-lab-muted mb-4">
              Contributions aren't only code
            </h4>
            <p className="font-display text-2xl sm:text-3xl tracking-tight text-lab-fg leading-tight text-balance">
              Designers, writers, researchers, DevOps, students and first-time
              contributors — all welcome.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="flex flex-wrap gap-2">
              {CONTRIBUTION_TYPES.map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="px-4 py-2 border border-white/10 font-mono text-xs text-lab-fg/80 hover:border-lab-accent hover:text-lab-accent transition-colors cursor-default"
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
