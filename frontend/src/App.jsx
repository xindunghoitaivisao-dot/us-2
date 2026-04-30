import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StartSection from "@/components/StartSection";
import FeaturesChess from "@/components/FeaturesChess";
import FeaturesGrid from "@/components/FeaturesGrid";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import CtaFooter from "@/components/CtaFooter";
import { Toaster } from "@/components/ui/sonner";

function Landing() {
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
          <PricingSection />
          <CtaFooter />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<Landing />} />
      </Routes>
      <Toaster theme="dark" position="bottom-center" />
    </BrowserRouter>
  );
}
