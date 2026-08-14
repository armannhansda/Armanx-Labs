"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Code2,
  Brain,
  GitBranch,
  Workflow,
  FlaskConical,
  ArrowUpRight,
} from "lucide-react";

const FOCUS_AREAS = [
  {
    id: "01",
    icon: Code2,
    title: "Developer Tools",
    tagline: "Make software development easier",
    items: [
      "Code analysis",
      "Repository visualization",
      "Debugging tools",
      "CLI tools",
      "IDE / VS Code extensions",
      "Code intelligence",
    ],
    accent: false,
  },
  {
    id: "02",
    icon: Brain,
    title: "Artificial Intelligence",
    tagline: "Practical AI, not AI for its own sake",
    items: [
      "AI developer tools",
      "Code intelligence",
      "Repository understanding",
      "AI agents",
      "Knowledge graphs",
      "AI-assisted workflows",
    ],
    accent: true,
  },
  {
    id: "03",
    icon: GitBranch,
    title: "Software Engineering",
    tagline: "How software is built and maintained",
    items: [
      "Software architecture",
      "Dependency analysis",
      "Developer experience",
      "Testing & code quality",
      "Infrastructure",
      "Engineering workflows",
    ],
    accent: false,
  },
  {
    id: "04",
    icon: Workflow,
    title: "Automation",
    tagline: "Reduce repetitive work",
    items: [
      "Developer automation",
      "Workflow automation",
      "CI/CD tooling",
      "AI-powered automation",
      "Repository automation",
    ],
    accent: false,
  },
  {
    id: "05",
    icon: FlaskConical,
    title: "Experimental Technology",
    tagline: "Not every idea needs to be a product",
    items: [
      "New frameworks",
      "Programming languages",
      "AI architectures",
      "Graph technologies",
      "Emerging tech",
    ],
    accent: false,
  },
];

function FocusCard({
  area,
  index,
}: {
  area: (typeof FOCUS_AREAS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-50, 50], [8, -8]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-8, 8]), {
    stiffness: 200,
    damping: 25,
  });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = area.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={
        area.id === "02"
          ? "sm:col-span-2 lg:col-span-2"
          : ""
      }
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
        className="group relative h-full p-8 border border-white/[0.08] hover:border-white/[0.2] bg-[#0e0e12] transition-colors duration-300 overflow-hidden"
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-8" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-center gap-3">
            <Icon
              className={`w-5 h-5 ${
                area.accent ? "text-lab-accent" : "text-lab-fg"
              }`}
              strokeWidth={1.5}
            />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-lab-muted">
              {area.id}
            </span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-lab-dim group-hover:text-lab-accent group-hover:rotate-0 transition-all -rotate-45" />
        </div>

        {/* Title */}
        <h3
          className="font-display text-2xl lg:text-3xl tracking-tight text-lab-fg mb-2"
          style={{ transform: "translateZ(30px)" }}
        >
          {area.title}
        </h3>
        <p
          className="text-sm text-lab-muted mb-8"
          style={{ transform: "translateZ(20px)" }}
        >
          {area.tagline}
        </p>

        {/* Items */}
        <ul
          className="space-y-2.5"
          style={{ transform: "translateZ(15px)" }}
        >
          {area.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-sm text-lab-muted group-hover:text-lab-fg/80 transition-colors"
            >
              <span
                className={`w-1 h-1 rounded-full ${
                  area.accent ? "bg-lab-accent" : "bg-lab-dim"
                }`}
              />
              {item}
            </li>
          ))}
        </ul>

        {/* Hover gradient */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: area.accent
              ? "radial-gradient(circle at 50% 50%, rgba(196,255,61,0.04), transparent 70%)"
              : "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03), transparent 70%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export function FocusAreas() {
  return (
    <section
      id="focus"
      className="relative py-32 lg:py-48 border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[11px] text-lab-accent">03</span>
              <span className="w-12 h-px bg-lab-accent/40" />
            </div>
            <h2 className="font-mono text-[11px] tracking-[0.25em] uppercase text-lab-muted">
              Core Focus Areas
            </h2>
          </div>
          <div className="lg:col-span-9">
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.05] tracking-[-0.03em] text-lab-fg text-balance">
              Five areas, one philosophy —{" "}
              <span className="text-lab-muted">
                build things that solve actual problems.
              </span>
            </h3>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FOCUS_AREAS.map((area, i) => (
            <FocusCard key={area.id} area={area} index={i} />
          ))}

          {/* Stat card filling the last slot */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative p-8 border border-lab-accent/30 bg-lab-accent-dim overflow-hidden flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-lab-accent">
                Current milestone
              </span>
            </div>
            <div>
              <div className="font-display text-7xl lg:text-8xl tracking-tighter text-lab-fg leading-none">
                6
              </div>
              <p className="text-sm text-lab-fg/80 mt-3">
                Active contributors on RepoMap — and counting.
              </p>
              <p className="font-mono text-[10px] text-lab-muted mt-4 uppercase tracking-wider">
                Next target: 10 → 20 → 50 → 100+
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
