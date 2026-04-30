import React from "react";
import { motion } from "motion/react";
import HlsVideo from "@/components/HlsVideo";

const SRC = "https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8";

const STATS = [
  { value: "200+", label: "Sites launched" },
  { value: "98%", label: "Client satisfaction" },
  { value: "3.2x", label: "More conversions" },
  { value: "5 days", label: "Average delivery" },
];

export default function Stats() {
  return (
    <section
      data-testid="stats-section"
      className="relative w-full overflow-hidden py-20"
    >
      <HlsVideo
        src={SRC}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: "saturate(0)" }}
      />
      <div
        className="absolute top-0 left-0 right-0 z-0 pointer-events-none"
        style={{
          height: "200px",
          background: "linear-gradient(to bottom, rgb(0,0,0), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none"
        style={{
          height: "200px",
          background: "linear-gradient(to top, rgb(0,0,0), transparent)",
        }}
      />
      {/* Extra darken */}
      <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="liquid-glass rounded-3xl p-12 md:p-16"
          data-testid="stats-card"
        >
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center md:text-left"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white leading-none">
                  {s.value}
                </div>
                <div className="mt-3 text-white/60 font-body font-light text-sm">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
