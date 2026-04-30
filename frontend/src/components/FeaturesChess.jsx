import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import BlurText from "@/components/BlurText";

const ROWS = [
  {
    title: "Designed to convert. Built to perform.",
    body:
      "Every pixel is intentional. Our AI studies what works across thousands of top sites—then builds yours to outperform them all.",
    cta: "Learn more",
    gif: "https://motionsites.ai/assets/hero-finlytic-preview-CV9g0FHP.gif",
    reverse: false,
  },
  {
    title: "It gets smarter. Automatically.",
    body:
      "Your site evolves on its own. AI monitors every click, scroll, and conversion—then optimizes in real time. No manual updates. Ever.",
    cta: "See how it works",
    gif: "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
    reverse: true,
  },
];

export default function FeaturesChess() {
  return (
    <section
      id="services"
      data-testid="features-chess"
      className="relative w-full px-6 sm:px-8 lg:px-16 py-24 md:py-32"
    >
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="inline-block liquid-glass rounded-full px-3.5 py-1"
        >
          <span className="text-xs font-medium text-white font-body relative z-10">
            Capabilities
          </span>
        </motion.div>
        <BlurText
          text="Pro features. Zero complexity."
          delay={100}
          direction="bottom"
          className="mt-6 text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]"
        />
      </div>

      {/* Rows */}
      <div className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-24">
        {ROWS.map((row, i) => (
          <div
            key={i}
            data-testid={`features-chess-row-${i + 1}`}
            className={`flex flex-col ${row.reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-10 md:gap-16`}
          >
            <motion.div
              initial={{ opacity: 0, x: row.reverse ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 max-w-xl"
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading italic text-white tracking-tight leading-[0.95]">
                {row.title}
              </h3>
              <p className="mt-5 text-white/60 font-body font-light text-sm md:text-base leading-relaxed">
                {row.body}
              </p>
              <button
                data-testid={`features-chess-cta-${i + 1}`}
                className="mt-6 liquid-glass-strong rounded-full px-5 py-2.5 inline-flex items-center gap-2 text-white text-sm font-medium font-body hover:scale-[1.02] transition"
              >
                <span className="relative z-10">{row.cta}</span>
                <ArrowUpRight className="h-4 w-4 relative z-10" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 w-full"
            >
              <div className="liquid-glass rounded-2xl overflow-hidden aspect-[4/3] w-full">
                <img
                  src={row.gif}
                  alt={row.title}
                  className="w-full h-full object-cover relative z-10"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
