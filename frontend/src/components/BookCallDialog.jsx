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

const SERVICE_OPTIONS = [
  "Brand & Marketing Site",
  "Product / SaaS Web App",
  "Landing Page Sprint",
  "Site Redesign",
  "Ongoing Design Retainer",
  "Something else",
];

const BUDGET_OPTIONS = [
  "Under $5k",
  "$5k – $15k",
  "$15k – $40k",
  "$40k – $100k",
  "$100k+",
  "Not sure yet",
];

const FIELD_BASE =
  "bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/40 font-body focus:outline-none focus:border-white/40 transition";

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service_type: "",
  message: "",
  preferred_start_date: "",
  budget_range: "",
  website: "", // honeypot
};

export default function BookCallDialog({ open, onOpenChange }) {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (k) => (e) => {
    setForm((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k]) setErrors((s) => ({ ...s, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.service_type) e.service_type = "Pick one";
    if (!form.message.trim()) e.message = "Tell us a little about the project";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/leads`, form);
      setDone(true);
      toast.success("Thank you! We'll be in touch within 24 hours.");
      setForm(EMPTY);
    } catch (err) {
      console.error(err);
      const detail = err?.response?.data?.detail;
      if (err?.response?.status === 429) {
        toast.error("Too many submissions. Please try again in a minute.");
      } else if (typeof detail === "string") {
        toast.error(detail);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (v) => {
    if (!v) {
      setDone(false);
      setErrors({});
    }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        data-testid="book-call-dialog"
        className="bg-zinc-950 border border-white/20 text-white max-w-3xl w-[94vw] p-0 rounded-3xl max-h-[92vh] overflow-y-auto !shadow-none"
      >
        <div className="relative p-6 sm:p-10">
          <div className="relative z-10">
            <DialogHeader>
              <DialogTitle className="font-heading italic text-3xl md:text-4xl text-white leading-tight tracking-tight">
                {done ? "Thank you!" : "Contract inquiry."}
              </DialogTitle>
              <DialogDescription className="text-white/60 font-body font-light text-sm mt-2">
                {done
                  ? "We've received your request. We'll be in touch within 24 hours with next steps."
                  : "Tell us about your project. The more detail, the more tailored our response."}
              </DialogDescription>
            </DialogHeader>

            {!done && (
              <form
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col gap-4"
                data-testid="book-call-form"
                noValidate
              >
                {/* Honeypot — hidden from real users */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={update("website")}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-10000px",
                    width: 1,
                    height: 1,
                    opacity: 0,
                  }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Full name *"
                    error={errors.name}
                    testId="book-call-name"
                  >
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={update("name")}
                      data-testid="book-call-name"
                      className={FIELD_BASE}
                    />
                  </Field>
                  <Field
                    label="Email *"
                    error={errors.email}
                    testId="book-call-email"
                  >
                    <input
                      type="email"
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={update("email")}
                      data-testid="book-call-email"
                      className={FIELD_BASE}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Phone" testId="book-call-phone">
                    <input
                      type="tel"
                      placeholder="+1 415 555 0100"
                      value={form.phone}
                      onChange={update("phone")}
                      data-testid="book-call-phone"
                      className={FIELD_BASE}
                    />
                  </Field>
                  <Field label="Company" testId="book-call-company">
                    <input
                      type="text"
                      placeholder="Acme Inc."
                      value={form.company}
                      onChange={update("company")}
                      data-testid="book-call-company"
                      className={FIELD_BASE}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Service / project type *"
                    error={errors.service_type}
                    testId="book-call-service"
                  >
                    <select
                      value={form.service_type}
                      onChange={update("service_type")}
                      data-testid="book-call-service"
                      className={FIELD_BASE + " cursor-pointer"}
                    >
                      <option value="" className="bg-black text-white">
                        Select a service…
                      </option>
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-black text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Budget range" testId="book-call-budget">
                    <select
                      value={form.budget_range}
                      onChange={update("budget_range")}
                      data-testid="book-call-budget"
                      className={FIELD_BASE + " cursor-pointer"}
                    >
                      <option value="" className="bg-black text-white">
                        Optional…
                      </option>
                      {BUDGET_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-black text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Preferred start date" testId="book-call-start">
                  <input
                    type="date"
                    value={form.preferred_start_date}
                    onChange={update("preferred_start_date")}
                    data-testid="book-call-start"
                    className={FIELD_BASE + " cursor-pointer"}
                  />
                </Field>

                <Field
                  label="Project description *"
                  error={errors.message}
                  testId="book-call-message"
                >
                  <textarea
                    placeholder="A few sentences about goals, audience, timeline, anything we should know…"
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    data-testid="book-call-message"
                    className={FIELD_BASE + " resize-none"}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={loading}
                  data-testid="book-call-submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 bg-white text-black rounded-full px-6 py-3 text-sm font-medium font-body hover:bg-white/90 transition disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send inquiry <ArrowUpRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <p className="text-white/40 text-xs font-body mt-2 text-center">
                  We respond within one business day. No commitment.
                </p>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-white/60 text-xs uppercase tracking-[0.12em] font-body">
        {label}
      </span>
      {children}
      {error && (
        <span className="text-red-300/80 text-xs font-body mt-0.5">{error}</span>
      )}
    </label>
  );
}
