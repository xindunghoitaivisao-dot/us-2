import React from "react";
import { motion } from "motion/react";
import BlurText from "@/components/BlurText";

const QUOTES = [
  {
    quote:
      "A complete rebuild in five days. The result outperformed everything we'd spent months building before.",
    name: "Sarah Chen",
    role: "CEO, Luminary",
  },
  {
    quote:
      "Conversions up 4x. That's not a typo. The design just works differently when it's built on real data.",
    name: "Marcus Webb",
    role: "Head of Growth, Arcline",
  },
  {
    quote:
      "They didn't just design our site. They defined our brand. World-class doesn't begin to cover it.",
    name: "Elena Voss",
    role: "Brand Director, Helix",
  },
];

export default function Testimonials() {
  return (
    <section
      data-testid="testimonials"
      className="relative w-full px-6 sm:px-8 lg:px-16 py-24 md:py-32 bg-black"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="inline-block liquid-glass rounded-full px-3.5 py-1"
          >
            <span className="text-xs font-medium text-white font-body relative z-10">
              What They Say
            </span>
          </motion.div>
          <BlurText
            text="Don't take our word for it."
            delay={100}
            direction="bottom"
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {QUOTES.map((q, i) => (
            <motion.div
              key={q.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              data-testid={`testimonial-${i + 1}`}
              className="liquid-glass rounded-2xl p-8"
            >
              <div className="relative z-10 flex flex-col h-full">
                <p className="text-white/80 font-body font-light text-sm italic leading-relaxed flex-1">
                  “{q.quote}”
                </p>
                <div className="mt-8">
                  <div className="text-white font-body font-medium text-sm">
                    {q.name}
                  </div>
                  <div className="text-white/50 font-body font-light text-xs mt-0.5">
                    {q.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
