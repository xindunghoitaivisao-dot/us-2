import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import { AuthProvider } from "@/auth/AuthProvider";
import AdminPage from "@/pages/AdminPage";
import AuthCallback from "@/pages/AuthCallback";

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

function AppRouter() {
  const location = useLocation();
  // Synchronous detection of OAuth fragment to avoid race with /auth/me
  if (location.hash?.includes("session_id=")) {
    return <AuthCallback />;
  }
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
        <Toaster theme="dark" position="bottom-center" />
      </BrowserRouter>
    </AuthProvider>
  );
}
