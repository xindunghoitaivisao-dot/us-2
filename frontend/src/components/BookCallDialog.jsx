import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArrowUpRight, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;

export default function BookCallDialog({ open, onOpenChange }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please share your name and email.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/leads`, form);
      setDone(true);
      toast.success("Got it. We'll be in touch within 24 hours.");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (v) => {
    if (!v) setDone(false);
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        data-testid="book-call-dialog"
        className="bg-black/90 backdrop-blur-xl border border-white/10 text-white max-w-lg p-0 overflow-hidden rounded-3xl"
      >
        <div className="relative p-8">
          <div className="absolute inset-0 liquid-glass rounded-3xl pointer-events-none" />
          <div className="relative z-10">
            <DialogHeader>
              <DialogTitle className="font-heading italic text-3xl md:text-4xl text-white leading-tight tracking-tight">
                {done ? "Thanks for reaching out." : "Book a strategy call."}
              </DialogTitle>
              <DialogDescription className="text-white/60 font-body font-light text-sm mt-2">
                {done
                  ? "We've logged your request. A specialist from MM Innovation Consulting will be in touch within one business day."
                  : "Tell us a little about your project. We'll get back within 24 hours with a tailored plan."}
              </DialogDescription>
            </DialogHeader>

            {!done && (
              <form
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col gap-4"
                data-testid="book-call-form"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={update("name")}
                    data-testid="book-call-name"
                    className="bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/40 font-body focus:outline-none focus:border-white/40 transition"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={update("email")}
                    data-testid="book-call-email"
                    className="bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/40 font-body focus:outline-none focus:border-white/40 transition"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Company (optional)"
                  value={form.company}
                  onChange={update("company")}
                  data-testid="book-call-company"
                  className="bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/40 font-body focus:outline-none focus:border-white/40 transition"
                />
                <textarea
                  placeholder="Tell us about your project..."
                  rows={4}
                  value={form.message}
                  onChange={update("message")}
                  data-testid="book-call-message"
                  className="bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/40 font-body focus:outline-none focus:border-white/40 transition resize-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="book-call-submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 bg-white text-black rounded-full px-6 py-3 text-sm font-medium font-body hover:bg-white/90 transition disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Send request <ArrowUpRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
