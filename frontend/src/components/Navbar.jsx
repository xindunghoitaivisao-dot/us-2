import React, { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import BookCallDialog from "@/components/BookCallDialog";
import Monogram from "@/components/Monogram";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "/#pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        data-testid="navbar"
        className="fixed top-4 left-0 right-0 z-50 px-6 sm:px-8 lg:px-16 py-3 flex items-center justify-between"
      >
        {/* Logo */}
        <a
          href="#home"
          data-testid="navbar-logo"
          className="flex items-center gap-2 select-none"
        >
          <span className="liquid-glass-strong h-11 w-11 rounded-full flex items-center justify-center">
            <Monogram size={28} className="relative z-10" />
          </span>
          <span className="hidden sm:inline font-heading italic text-xl text-white tracking-tight">
            MM Innovation
          </span>
        </a>

        {/* Center pill (desktop) */}
        <div
          data-testid="navbar-links"
          className="hidden md:flex items-center liquid-glass rounded-full px-1.5 py-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
              className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition relative z-10"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => setCallOpen(true)}
            data-testid="nav-get-started-btn"
            className="ml-1 inline-flex items-center gap-1 bg-white text-black rounded-full px-3.5 py-1.5 text-sm font-medium hover:bg-white/90 transition relative z-10"
          >
            Get Started <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          data-testid="navbar-mobile-toggle"
          onClick={() => setOpen((s) => !s)}
          className="md:hidden liquid-glass-strong rounded-full p-2.5 text-white relative z-10"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            data-testid="navbar-mobile-menu"
            className="md:hidden fixed top-20 left-4 right-4 z-40 liquid-glass rounded-3xl p-4"
          >
            <div className="flex flex-col gap-1 relative z-10">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-base font-body text-white/90 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  setCallOpen(true);
                }}
                className="mt-2 inline-flex items-center justify-center gap-1 bg-white text-black rounded-full px-4 py-2.5 text-sm font-medium"
              >
                Get Started <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookCallDialog open={callOpen} onOpenChange={setCallOpen} />
    </>
  );
}
