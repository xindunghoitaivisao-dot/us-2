import React, { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { motion } from "motion/react";
import BlurText from "@/components/BlurText";
import BookCallDialog from "@/components/BookCallDialog";
import WatchFilmDialog from "@/components/WatchFilmDialog";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";

const PARTNERS = ["Stripe", "Vercel", "Linear", "Notion", "Figma"];

export default function Hero() {
  const [callOpen, setCallOpen] = useState(false);
  const [filmOpen, setFilmOpen] = useState(false);

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative overflow-visible w-full"
      style={{ height: "1000px" }}
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero_bg.svg"
        className="absolute left-0 w-full h-auto object-contain z-0"
        style={{ top: "20%" }}
        data-testid="hero-bg-video"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/5 z-0 pointer-events-none" />

      {/* Bottom gradient fade to black */}
      <div
        className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none"
        style={{
          height: "300px",
          background:
            "linear-gradient(to bottom, transparent, rgb(0,0,0))",
        }}
      />

      {/* Top fade so navbar reads */}
      <div
        className="absolute top-0 left-0 right-0 z-0 pointer-events-none"
        style={{
          height: "180px",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6 sm:px-8 lg:px-16 h-full"
        style={{ paddingTop: "150px" }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="liquid-glass rounded-full px-1 py-1 inline-flex items-center gap-2"
          data-testid="hero-badge"
        >
          <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold relative z-10">
            New
          </span>
          <span className="px-3 text-xs sm:text-sm text-white/90 font-body relative z-10">
            Introducing AI-powered web design.
          </span>
        </motion.div>

        {/* Heading */}
        <BlurText
          text="The Website Your Brand Deserves"
          delay={100}
          direction="bottom"
          animateBy="words"
          className="mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.85] max-w-3xl tracking-[-2px] md:tracking-[-4px]"
        />

        {/* Subtext */}
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          data-testid="hero-subtext"
          className="mt-6 max-w-xl text-sm md:text-base text-white font-body font-light leading-tight"
        >
          Stunning design. Blazing performance. Built by AI, refined by
          experts. This is web design, wildly reimagined.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => setCallOpen(true)}
            data-testid="hero-cta-get-started"
            className="liquid-glass-strong rounded-full px-5 py-2.5 inline-flex items-center gap-2 text-white text-sm font-medium font-body hover:scale-[1.02] transition"
          >
            <span className="relative z-10">Get Started</span>
            <ArrowUpRight className="h-4 w-4 relative z-10" />
          </button>
          <button
            onClick={() => setFilmOpen(true)}
            data-testid="hero-cta-watch-film"
            className="inline-flex items-center gap-2 text-white text-sm font-medium font-body hover:opacity-80 transition"
          >
            <Play className="h-4 w-4 fill-white" />
            Watch the Film
          </button>
        </motion.div>

        {/* Partners bar */}
        <div className="mt-auto pb-8 pt-16 w-full flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="liquid-glass rounded-full px-3.5 py-1"
            data-testid="hero-partners-badge"
          >
            <span className="text-xs font-medium text-white/90 font-body relative z-10">
              Trusted by the teams behind
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16"
            data-testid="hero-partners"
          >
            {PARTNERS.map((p) => (
              <span
                key={p}
                className="text-2xl md:text-3xl font-heading italic text-white"
              >
                {p}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <BookCallDialog open={callOpen} onOpenChange={setCallOpen} />
      <WatchFilmDialog open={filmOpen} onOpenChange={setFilmOpen} />
    </section>
  );
}
