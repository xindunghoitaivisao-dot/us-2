import React from "react";
import { Zap, Palette, BarChart3, Shield } from "lucide-react";
import { motion } from "motion/react";
import BlurText from "@/components/BlurText";

const CARDS = [
  {
    icon: Zap,
    title: "Days, Not Months",
    body: "Concept to launch at a pace that redefines fast. Because waiting isn't a strategy.",
  },
  {
    icon: Palette,
    title: "Obsessively Crafted",
    body: "Every detail considered. Every element refined. Design so precise, it feels inevitable.",
  },
  {
    icon: BarChart3,
    title: "Built to Convert",
    body: "Layouts informed by data. Decisions backed by performance. Results you can measure.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    body: "Enterprise-grade protection comes standard. SSL, DDoS mitigation, compliance. All included.",
  },
];

export default function FeaturesGrid() {
  return (
    <section
      id="work"
      data-testid="features-grid"
      className="relative w-full px-6 sm:px-8 lg:px-16 py-24 md:py-32 bg-black"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="inline-block liquid-glass rounded-full px-3.5 py-1"
          >
            <span className="text-xs font-medium text-white font-body relative z-10">
              Why Us
            </span>
          </motion.div>
          <BlurText
            text="The difference is everything."
            delay={100}
            direction="bottom"
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                data-testid={`feature-card-${i + 1}`}
                className="liquid-glass rounded-2xl p-6"
              >
                <div className="relative z-10">
                  <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-white relative z-10" />
                  </div>
                  <h3 className="mt-5 text-2xl font-heading italic text-white leading-tight">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-white/60 font-body font-light text-sm leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
