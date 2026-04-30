import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import HlsVideo from "@/components/HlsVideo";
import BlurText from "@/components/BlurText";
import BookCallDialog from "@/components/BookCallDialog";

const SRC = "https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8";

export default function StartSection() {
  const [callOpen, setCallOpen] = useState(false);
  return (
    <section
      id="process"
      data-testid="start-section"
      className="relative w-full overflow-hidden"
    >
      <HlsVideo
        src={SRC}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 z-0 pointer-events-none"
        style={{
          height: "200px",
          background: "linear-gradient(to bottom, rgb(0,0,0), transparent)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none"
        style={{
          height: "200px",
          background: "linear-gradient(to top, rgb(0,0,0), transparent)",
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 sm:px-8 lg:px-16 py-24"
        style={{ minHeight: "500px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="liquid-glass rounded-full px-3.5 py-1"
        >
          <span className="text-xs font-medium text-white font-body relative z-10">
            How It Works
          </span>
        </motion.div>

        <BlurText
          text="You dream it. We ship it."
          delay={120}
          direction="bottom"
          className="mt-6 text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] max-w-3xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-xl text-white/60 font-body font-light text-sm md:text-base"
        >
          Share your vision. Our AI handles the rest—wireframes, design,
          code, launch. All in days, not quarters.
        </motion.p>

        <motion.button
          onClick={() => setCallOpen(true)}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          data-testid="start-cta"
          className="mt-8 liquid-glass-strong rounded-full px-6 py-3 inline-flex items-center gap-2 text-white text-sm font-medium font-body hover:scale-[1.02] transition"
        >
          <span className="relative z-10">Get Started</span>
          <ArrowUpRight className="h-4 w-4 relative z-10" />
        </motion.button>
      </div>

      <BookCallDialog open={callOpen} onOpenChange={setCallOpen} />
    </section>
  );
}
