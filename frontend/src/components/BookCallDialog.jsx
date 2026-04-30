import React, { useRef, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArrowUpRight, Loader2 } from "lucide-react";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = process.env.REACT_APP_WEB3FORMS_KEY || "";

// Unique iframe name so multiple dialog instances don't collide.
const IFRAME_NAME = "mm-w3f-target";

export default function BookCallDialog({ open, onOpenChange }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const formRef = useRef(null);
  const timerRef = useRef(null);

  const update = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const handleSubmit = (e) => {
    // Let the native form submit to the hidden iframe (no fetch/XHR → no CORS).
    if (!form.name.trim() || !form.email.trim()) {
      e.preventDefault();
      toast.error("Please share your name and email.");
      return;
    }
    if (!WEB3FORMS_KEY) {
      e.preventDefault();
      toast.error("Form is not configured yet. Please try again later.");
      return;
    }
    setLoading(true);
    // Optimistically flip to success after the iframe load completes
    // (handled in onLoad). If load doesn't fire within 6s, treat as done anyway.
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => handleDone(), 6000);
  };

  const handleDone = () => {
    setLoading(false);
    setDone(true);
    toast.success("Got it. We'll be in touch within 24 hours.");
    setForm({ name: "", email: "", company: "", message: "" });
    clearTimeout(timerRef.current);
  };

  const handleIframeLoad = () => {
    // Iframe fires `load` on initial mount with blank src too — only treat
    // post-submit loads as success (when we're in the loading state).
    if (loading) {
      handleDone();
    }
  };

  const handleClose = (v) => {
    if (!v) {
      setDone(false);
      setLoading(false);
      clearTimeout(timerRef.current);
    }
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
                  ? "We've received your request. A specialist from MM Innovation Consulting will be in touch within one business day."
                  : "Tell us a little about your project. We'll get back within 24 hours with a tailored plan."}
              </DialogDescription>
            </DialogHeader>

            {!done && (
              <>
                <iframe
                  name={IFRAME_NAME}
                  title="form-sink"
                  onLoad={handleIframeLoad}
                  style={{ display: "none" }}
                />
                <form
                  ref={formRef}
                  action={WEB3FORMS_ENDPOINT}
                  method="POST"
                  target={IFRAME_NAME}
                  onSubmit={handleSubmit}
                  className="mt-6 flex flex-col gap-4"
                  data-testid="book-call-form"
                >
                  <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
                  <input type="hidden" name="from_name" value="MM Innovation Consulting" />
                  <input
                    type="hidden"
                    name="subject"
                    value={`New strategy call request — ${form.name}${form.company ? " (" + form.company + ")" : ""}`}
                  />
                  {/* Honeypot */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={update("name")}
                      data-testid="book-call-name"
                      className="bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/40 font-body focus:outline-none focus:border-white/40 transition"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={update("email")}
                      data-testid="book-call-email"
                      className="bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/40 font-body focus:outline-none focus:border-white/40 transition"
                    />
                  </div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company (optional)"
                    value={form.company}
                    onChange={update("company")}
                    data-testid="book-call-company"
                    className="bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/40 font-body focus:outline-none focus:border-white/40 transition"
                  />
                  <textarea
                    name="message"
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
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
