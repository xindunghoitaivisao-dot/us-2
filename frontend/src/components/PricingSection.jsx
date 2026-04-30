import React, { useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import BlurText from "@/components/BlurText";
import BookCallDialog from "@/components/BookCallDialog";

const TIERS = [
  {
    name: "Launch",
    price: "$4.9k",
    cadence: "one-time",
    description:
      "A polished single-page presence for founders ready to look credible from day one.",
    features: [
      "Up to 5 sections, fully responsive",
      "AI-assisted copy + design pass",
      "1 round of revisions",
      "Live in 5 days",
    ],
    cta: "Start with Launch",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$12k",
    cadence: "one-time",
    description:
      "The full marketing site. Built to convert. Backed by data, instrumented from day one.",
    features: [
      "Up to 8 pages + CMS",
      "Conversion-focused copy + design system",
      "2 rounds of revisions",
      "Analytics + A/B framework",
      "Live in 10 days",
    ],
    cta: "Choose Growth",
    highlight: true,
  },
  {
    name: "Studio",
    price: "Custom",
    cadence: "retainer",
    description:
      "An embedded design partner. Continuous iteration, experimentation, and growth-loop work.",
    features: [
      "Dedicated design + AI ops squad",
      "Weekly experiments + reviews",
      "Unlimited iteration",
      "SLA + priority support",
    ],
    cta: "Talk to founders",
    highlight: false,
  },
];

export default function PricingSection() {
  const [callOpen, setCallOpen] = useState(false);

  return (
    <section
      id="pricing"
      data-testid="pricing-section"
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
              Pricing
            </span>
          </motion.div>
          <BlurText
            text="Three ways to launch."
            delay={100}
            direction="bottom"
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]"
          />
          <p className="mt-5 max-w-xl mx-auto text-white/60 font-body font-light text-sm md:text-base">
            Transparent pricing. No surprises. Pick the tier that fits where you
            are — upgrade when you're ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              data-testid={`pricing-tier-${tier.name.toLowerCase()}`}
              className={`liquid-glass${tier.highlight ? "-strong" : ""} rounded-3xl p-8 flex flex-col`}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <span className="text-white font-body font-medium text-sm tracking-wide uppercase">
                    {tier.name}
                  </span>
                  {tier.highlight && (
                    <span className="bg-white text-black rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                      Popular
                    </span>
                  )}
                </div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-heading italic text-white leading-none">
                    {tier.price}
                  </span>
                  <span className="text-white/50 font-body font-light text-xs">
                    {tier.cadence}
                  </span>
                </div>
                <p className="mt-4 text-white/70 font-body font-light text-sm leading-relaxed">
                  {tier.description}
                </p>
                <ul className="mt-6 flex flex-col gap-3 flex-1">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-white/80 font-body font-light text-sm"
                    >
                      <Check className="h-4 w-4 mt-0.5 text-white shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setCallOpen(true)}
                  data-testid={`pricing-cta-${tier.name.toLowerCase()}`}
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium font-body transition ${
                    tier.highlight
                      ? "bg-white text-black hover:bg-white/90"
                      : "liquid-glass-strong text-white hover:scale-[1.02]"
                  }`}
                >
                  <span className="relative z-10">{tier.cta}</span>
                  <ArrowUpRight className="h-4 w-4 relative z-10" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BookCallDialog open={callOpen} onOpenChange={setCallOpen} />
    </section>
  );
}
