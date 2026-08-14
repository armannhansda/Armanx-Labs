"use client";

import { motion } from "framer-motion";
import { Github, MessageCircle, Twitter, Linkedin, ArrowUpRight } from "lucide-react";

const CHANNELS = [
  { label: "GitHub", desc: "Discussions, issues, PRs", icon: Github, href: "https://github.com/ArmanX-Labs" },
  { label: "Telegram", desc: "Real-time chat", icon: MessageCircle, href: "#" },
  { label: "X / Twitter", desc: "Updates & news", icon: Twitter, href: "#" },
  { label: "LinkedIn", desc: "Long-form updates", icon: Linkedin, href: "#" },
];

const CONTRIBUTION_STEPS = [
  { step: "01", title: "Discover", desc: "Find a project that interests you." },
  { step: "02", title: "Explore", desc: "Read the README, run it locally, understand the architecture." },
  { step: "03", title: "Choose", desc: "Pick a `good first issue` or `help wanted` ticket." },
  { step: "04", title: "Build", desc: "Implement, test locally, ask questions in discussions." },
  { step: "05", title: "PR", desc: "Open a pull request. Reviews are conversations, not gates." },
  { step: "06", title: "Merge", desc: "Your contribution ships. You're now an ArmanX-Labs contributor." },
];

export function Community() {
  return (
    <section
      id="join"
      className="relative py-32 lg:py-48 border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[11px] text-lab-accent">07</span>
              <span className="w-12 h-px bg-lab-accent/40" />
            </div>
            <h2 className="font-mono text-[11px] tracking-[0.25em] uppercase text-lab-muted">
              Join the Lab
            </h2>
          </div>
          <div className="lg:col-span-9">
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.05] tracking-[-0.03em] text-lab-fg text-balance">
              Build, experiment, learn,{" "}
              <span className="text-lab-muted">and contribute.</span>
            </h3>
            <p className="mt-6 text-lg text-lab-muted max-w-2xl leading-relaxed">
              Whether you're a student opening your first PR or an experienced
              maintainer looking for a serious problem to sink into — there's
              room here.
            </p>
          </div>
        </div>

        {/* Contribution journey */}
        <div className="mb-24">
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-lab-dim mb-8">
            /contribution-journey
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
            {CONTRIBUTION_STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-[#07070a] p-6 hover:bg-[#0e0e12] transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-lab-accent">
                    {s.step}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-lab-dim opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="font-display text-xl text-lab-fg mb-2">
                  {s.title}
                </h4>
                <p className="text-sm text-lab-muted leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Channels */}
        <div className="mb-24">
          <h4 className="font-mono text-[11px] tracking-[0.25em] uppercase text-lab-muted mb-8">
            Community Channels
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CHANNELS.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.a
                  key={c.label}
                  href={c.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group p-6 border border-white/[0.08] hover:border-lab-accent/40 bg-[#0e0e12] hover:bg-[#11111a] transition-all flex flex-col gap-4"
                  {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <div className="flex items-center justify-between">
                    <Icon className="w-5 h-5 text-lab-fg group-hover:text-lab-accent transition-colors" strokeWidth={1.5} />
                    <ArrowUpRight className="w-4 h-4 text-lab-dim group-hover:text-lab-accent transition-all -rotate-45 group-hover:rotate-0" />
                  </div>
                  <div>
                    <div className="font-display text-base text-lab-fg">
                      {c.label}
                    </div>
                    <div className="font-mono text-[10px] text-lab-muted uppercase tracking-wider mt-1">
                      {c.desc}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative border border-lab-accent/30 bg-lab-accent-dim p-12 lg:p-20 overflow-hidden"
        >
          <div className="relative z-10 max-w-3xl">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-lab-accent mb-6">
              ── The positioning
            </div>
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-lab-fg text-balance">
              A place to experiment with technology and turn interesting ideas
              into open-source software.
            </h3>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#repomap"
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-lab-accent text-lab-bg font-mono text-[12px] tracking-[0.15em] uppercase hover:bg-lab-fg transition-colors"
              >
                Start with RepoMap
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#top"
                className="inline-flex items-center gap-3 px-7 py-3.5 border border-white/20 text-lab-fg font-mono text-[12px] tracking-[0.15em] uppercase hover:border-lab-accent hover:text-lab-accent transition-colors"
              >
                Back to top ↑
              </a>
            </div>
          </div>

          {/* Background grid */}
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
