"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "Developer Tools",
  "AI Systems",
  "Software Engineering",
  "Automation",
  "Code Intelligence",
  "Knowledge Graphs",
  "Experimental Tech",
  "Open Source",
  "Developer Experience",
  "Repository Intelligence",
];

export function Marquee() {
  return (
    <section className="relative py-10 border-y border-white/[0.06] overflow-hidden bg-[#07070a]">
      <div className="flex whitespace-nowrap animate-marquee">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center shrink-0">
            {ITEMS.map((item, i) => (
              <div key={`${dup}-${i}`} className="flex items-center shrink-0">
                <span className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-lab-fg/80 px-8">
                  {item}
                </span>
                <span className="text-lab-accent text-2xl">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Edge fade */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#07070a] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#07070a] to-transparent pointer-events-none" />
    </section>
  );
}
