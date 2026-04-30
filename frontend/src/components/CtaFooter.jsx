import React, { useState } from "react";
import { motion } from "motion/react";
import HlsVideo from "@/components/HlsVideo";
import BlurText from "@/components/BlurText";
import BookCallDialog from "@/components/BookCallDialog";

const SRC = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

export default function CtaFooter() {
  const [callOpen, setCallOpen] = useState(false);

  return (
    <section
      data-testid="cta-footer"
      className="relative w-full overflow-hidden"
    >
      <HlsVideo
        src={SRC}
        className="absolute inset-0 w-full h-full object-cover z-0"
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
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 pt-32 pb-12 max-w-6xl mx-auto flex flex-col items-center text-center">
        <BlurText
          text="Your next website starts here."
          delay={100}
          direction="bottom"
          className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white leading-[0.85] max-w-3xl tracking-tight"
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-xl text-white/60 font-body font-light text-sm md:text-base"
        >
          Book a free strategy call. See what AI-powered design can do. No
          commitment, no pressure. Just possibilities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => setCallOpen(true)}
            data-testid="cta-book-call"
            className="liquid-glass-strong rounded-full px-6 py-3 inline-flex items-center gap-2 text-white text-sm font-medium font-body hover:scale-[1.02] transition"
          >
            <span className="relative z-10">Book a Call</span>
          </button>
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("pricing");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            data-testid="cta-view-pricing"
            className="bg-white text-black rounded-full px-6 py-3 text-sm font-medium font-body hover:bg-white/90 transition"
          >
            View Pricing
          </a>
        </motion.div>

        {/* Footer bar */}
        <div className="w-full mt-32 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="text-white/40 text-xs font-body"
            data-testid="footer-copyright"
          >
            © 2026 MM Innovation Consulting. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-white/40 hover:text-white text-xs font-body transition"
              data-testid="footer-link-privacy"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-white/40 hover:text-white text-xs font-body transition"
              data-testid="footer-link-terms"
            >
              Terms
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCallOpen(true);
              }}
              className="text-white/40 hover:text-white text-xs font-body transition"
              data-testid="footer-link-contact"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      <BookCallDialog open={callOpen} onOpenChange={setCallOpen} />
    </section>
  );
}
