import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StartSection from "@/components/StartSection";
import FeaturesChess from "@/components/FeaturesChess";
import FeaturesGrid from "@/components/FeaturesGrid";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import CtaFooter from "@/components/CtaFooter";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen font-body antialiased overflow-x-hidden">
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <div className="bg-black">
          <StartSection />
          <FeaturesChess />
          <FeaturesGrid />
          <Stats />
          <Testimonials />
          <CtaFooter />
        </div>
      </div>
      <Toaster theme="dark" position="bottom-center" />
    </div>
  );
}
