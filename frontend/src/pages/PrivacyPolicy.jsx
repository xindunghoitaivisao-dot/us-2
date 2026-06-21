import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const SECTIONS = [
  {
    n: "01",
    title: "Introduction",
    body: [
      `This is the Privacy Policy ("Privacy Policy") for MM Innovation Consulting ("MM Innovation Consulting," "we," "us," or "our"), a company registered in Wyoming, United States.`,
      "MM Innovation Consulting understands that your privacy is important. We are committed to protecting your privacy and personal information in accordance with applicable law.",
      `This Privacy Policy applies to the personal information you provide, or that we collect, as you access and use materials on mminnovationconsulting.com and any other MM Innovation Consulting websites, pages, or applications that link to this Privacy Policy (collectively, the "Site"), as well as personal information you submit to MM Innovation Consulting in response to a request for information or other outreach from us.`,
      "By using our Site, you agree to the collection and use of your personal information as described in this Privacy Policy. If you do not agree, please discontinue use of the Site.",
    ],
  },
  {
    n: "02",
    title: "Changes to This Privacy Policy",
    body: [
      `MM Innovation Consulting may, in its discretion, amend this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. Any changes will be reflected on this page with an updated "Last Updated" date at the top.`,
      "We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of the Site after any changes constitutes your acceptance of the updated Privacy Policy.",
    ],
  },
  {
    n: "03",
    title: "Information We Collect",
    subsections: [
      {
        title: "Account, Registration & Contact Inquiries",
        body: [
          "MM Innovation Consulting collects information from you when you contact us through our inquiry or contract form, create an account, subscribe to our newsletter, or request information about our services. Personal information we collect includes:",
        ],
        bullets: [
          "Full name",
          "Email address",
          "Phone number",
          "Company name and job title",
          "Service or project type of interest",
          "Project description and preferred start date",
          "Budget range (if provided)",
          "IP address and approximate geographic location",
        ],
        tail: [
          "If you do not provide such information, you may not be able to submit an inquiry, receive responses from us, or access certain features of the Site.",
        ],
      },
      {
        title: "Cookies and Tracking Technologies",
        body: [
          `MM Innovation Consulting may use cookies and other tracking technologies as described in the "Cookies and Tracking Technologies" section of this Privacy Policy below.`,
        ],
      },
      {
        title: "Communications",
        body: [
          "When you contact us by email or through our Site forms, we retain the content of your messages and our responses in order to provide you with services and to maintain records of our communications.",
        ],
      },
    ],
  },
  {
    n: "04",
    title: "How We Use Your Information",
    body: [
      "The purposes and uses of your personal information depend on how you use the Site and what information you provide. We process your personal information for the following purposes:",
    ],
    bullets: [
      "Communicating with you and managing your inquiries, contract requests, and subscriptions",
      "Responding to your questions and providing consulting services",
      "Tailoring your experience on the Site with relevant content and service information",
      "Understanding our Site's user base and identifying areas of service interest",
      "Measuring and improving the effectiveness of our marketing programs and website content",
      "Sending you updates about our services, publications, or events that may be of interest to you (where you have consented or where permitted by law)",
      "Managing access to and maintaining the security of our Site and infrastructure",
      "Promoting the safety and security of individuals and our business",
      "Complying with legal obligations, including anti-fraud measures",
      "Aggregating, anonymizing, or de-identifying data for internal business analysis",
    ],
    tail: [
      "Where required by applicable law, we will only process your personal information on the basis of your consent, a legitimate business interest, or another lawful basis. You may withdraw your consent at any time where consent is the basis for processing.",
    ],
  },
  {
    n: "05",
    title: "How We Share Your Information",
    body: [
      "MM Innovation Consulting does not sell your personal information. We may disclose your personal information only in the following circumstances:",
    ],
    bullets: [
      "To our affiliates and business partners who assist in providing our services",
      "To trusted third-party service providers who process information on our behalf (such as email delivery, IT services, website security, and marketing tools) — these providers are bound by confidentiality obligations",
      "To law enforcement or governmental authorities in order to comply with any legal obligation, court order, or applicable law",
      "To bona-fide rights owners in connection with allegations of copyright or intellectual property infringement arising from content you have submitted",
      "To a third party in the event of any reorganization, merger, sale, acquisition, joint venture, or other disposition of all or any portion of our business or assets",
    ],
    tail: [
      "Any third parties with whom we share your personal information are required to maintain the confidentiality and security of your data and are prohibited from using it for any purpose other than those specified by MM Innovation Consulting.",
    ],
  },
  {
    n: "06",
    title: "Data Retention",
    body: [
      "MM Innovation Consulting retains your personal information for as long as necessary to fulfil the purpose for which it was collected. The criteria we use to determine retention periods include:",
    ],
    bullets: [
      "The length of time we have an ongoing relationship with you and provide services to you, and for a reasonable period thereafter",
      "Whether there is a legal obligation to which we are subject that requires us to retain records for a specified period",
      "Whether retention is advisable in light of our legal position, such as applicable statutes of limitations or ongoing regulatory matters",
    ],
    tail: [
      "When your personal information is no longer required, we will securely delete or anonymize it in accordance with our internal data retention procedures.",
    ],
  },
  {
    n: "07",
    title: "Marketing Communications",
    body: [
      "If you have opted in to receive marketing communications from MM Innovation Consulting, we may contact you with information about our services, insights, and events that may be of interest to you.",
      "You may opt out of receiving marketing communications from us at any time by clicking the unsubscribe link included in every marketing email we send, or by contacting us directly at info@mminnovationconsulting.com.",
      "Please note that even if you opt out of marketing communications, we may still send you transactional or administrative messages related to your inquiries or services.",
    ],
  },
  {
    n: "08",
    title: "Cookies & Tracking Technologies",
    body: [
      `MM Innovation Consulting may use cookies and other tracking technologies on the Site and in our communications with you. A "cookie" is a small data file sent from a web server to your browser and stored on your device.`,
      "We use cookies and tracking technologies to:",
    ],
    bullets: [
      "Operate the Site and keep it functioning correctly",
      "Remember your preferences and settings",
      "Collect information about how you interact with our Site",
      "Deliver content and information that may be relevant to your interests",
      "Analyze Site traffic and usage patterns to improve our services",
    ],
    tail: [
      "With most internet browsers, you can erase cookies from your device, block all cookies, or receive a warning before a cookie is stored. Please refer to your browser's instructions or visit aboutcookies.org for guidance. Please note that certain features of the Site may not function correctly if cookies are disabled.",
      `We do not currently respond to browser "Do Not Track" signals.`,
    ],
  },
  {
    n: "09",
    title: "Security",
    body: [
      "MM Innovation Consulting has implemented appropriate technological and operational security measures designed to protect your personal information from unauthorized access, disclosure, alteration, or destruction.",
      "Access to your personal information is restricted to authorized personnel and contractors who require it to perform their responsibilities, and each such person is obligated to maintain confidentiality.",
      "While we take steps that are generally accepted as industry standard to protect your personal information, no method of transmission over the internet or electronic storage is completely secure. MM Innovation Consulting cannot guarantee absolute security and cannot be held responsible for unauthorized access resulting from circumstances beyond our reasonable control.",
    ],
  },
  {
    n: "10",
    title: "Third-Party Links",
    body: [
      "The Site may contain links to websites operated by third parties that are not affiliated with MM Innovation Consulting. We are not responsible for the privacy practices, content, or security of any third-party websites.",
      "We are not responsible for the protection of any information you provide while visiting third-party websites not governed by this Privacy Policy. No links on our Site should be construed as an endorsement of any kind of those external websites or their content.",
      "We encourage you to review the privacy policies of any third-party websites you visit.",
    ],
  },
  {
    n: "11",
    title: "Compliance with Law",
    body: [
      "MM Innovation Consulting may be required to disclose your personal information to legal or governmental authorities if presented with a court subpoena, legal order, or as required or permitted by the laws of any applicable jurisdiction, including the State of Wyoming and the United States.",
      "In the event of a violation of our Terms of Use or any applicable restrictions, we may also disclose personal information to our affected business partners or relevant legal authorities.",
    ],
  },
  {
    n: "12",
    title: "Your Rights",
    body: [
      "Depending on where you reside, you may have the following rights with respect to your personal information under applicable data privacy laws:",
    ],
    rights: [
      { label: "Access", text: "Request a copy of the personal information we hold about you and how we use it." },
      { label: "Rectification", text: "Request correction of any inaccurate or outdated personal information." },
      { label: "Erasure", text: "Request that we delete your personal information, subject to legal obligations." },
      { label: "Restriction", text: "Request that we limit or stop processing your personal information." },
      { label: "Portability", text: "Request your personal information in a portable, machine-readable format." },
      { label: "Withdrawal of Consent", text: "Where processing is based on consent, withdraw it at any time." },
    ],
    tail: [
      `To exercise any of your data protection rights, please contact us using the details in the "Contact Us" section below. We may need to verify your identity before acting on your request. You may also have the right to lodge a complaint with a relevant supervisory or data protection authority in your jurisdiction.`,
    ],
  },
  {
    n: "13",
    title: "Children",
    body: [
      "MM Innovation Consulting understands the importance of protecting children's privacy, particularly in their online interactions. The Site is not designed for, and does not intentionally target or solicit, individuals 18 years of age or younger.",
      "We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child under 18, please contact us immediately at info@mminnovationconsulting.com so we can take appropriate action.",
    ],
  },
  {
    n: "14",
    title: "Contact Us",
    body: [
      "If you have any questions about this Privacy Policy, wish to exercise any of your data protection rights, or have concerns about how your personal information is handled, please contact us:",
    ],
    contact: {
      heading: "Data Protection Contact",
      lines: [
        "MM Innovation Consulting",
        "Wyoming, United States",
        "Email: info@mminnovationconsulting.com",
        "Website: www.mminnovationconsulting.com",
      ],
    },
    tail: [
      "We will endeavor to respond to all legitimate requests within a reasonable timeframe. In some cases, we may need to request additional information from you to verify your identity before we can fulfill your request.",
    ],
  },
];

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-body antialiased overflow-x-hidden">
      <Navbar />

      {/* Header */}
      <header className="relative px-6 sm:px-8 lg:px-16 pt-40 pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block liquid-glass rounded-full px-3.5 py-1"
            data-testid="privacy-badge"
          >
            <span className="text-xs font-medium text-white font-body relative z-10">
              Legal
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.9]"
            data-testid="privacy-heading"
          >
            Privacy Policy.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <Meta label="Last Updated" value="June 21, 2026" />
            <Meta label="Governing Law" value="Wyoming, United States" />
            <Meta label="Website" value="mminnovationconsulting.com" />
          </motion.div>
        </div>
      </header>

      {/* Sections */}
      <main className="relative px-6 sm:px-8 lg:px-16 pb-24">
        <div className="max-w-5xl mx-auto flex flex-col gap-10 md:gap-12">
          {SECTIONS.map((s, idx) => (
            <motion.section
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: Math.min(idx * 0.03, 0.2) }}
              data-testid={`privacy-section-${s.n}`}
              className="liquid-glass rounded-3xl p-7 md:p-10"
            >
              <div className="relative z-10 grid md:grid-cols-[120px_1fr] gap-6 md:gap-10">
                <div className="text-white/40 font-heading italic text-3xl md:text-4xl leading-none">
                  {s.n}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-heading italic text-white leading-tight tracking-tight">
                    {s.title}
                  </h2>

                  <div className="mt-5 flex flex-col gap-4 text-white/70 font-body font-light text-sm md:text-base leading-relaxed">
                    {s.body && s.body.map((p, i) => <p key={i}>{p}</p>)}

                    {s.bullets && (
                      <ul className="flex flex-col gap-2.5 mt-1">
                        {s.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {s.subsections && (
                      <div className="flex flex-col gap-6 mt-2">
                        {s.subsections.map((sub, i) => (
                          <div key={i}>
                            <h3 className="text-white text-base md:text-lg font-body font-medium tracking-tight">
                              {sub.title}
                            </h3>
                            <div className="mt-3 flex flex-col gap-3 text-white/70 font-body font-light text-sm md:text-base leading-relaxed">
                              {sub.body && sub.body.map((p, j) => <p key={j}>{p}</p>)}
                              {sub.bullets && (
                                <ul className="flex flex-col gap-2 mt-1">
                                  {sub.bullets.map((b, j) => (
                                    <li key={j} className="flex items-start gap-3">
                                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40 shrink-0" />
                                      <span>{b}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {sub.tail && sub.tail.map((p, j) => <p key={`st-${j}`}>{p}</p>)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {s.rights && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        {s.rights.map((r, i) => (
                          <div
                            key={i}
                            className="liquid-glass rounded-2xl p-5"
                          >
                            <div className="relative z-10">
                              <div className="text-white font-body font-medium text-sm">
                                {r.label}
                              </div>
                              <p className="mt-1.5 text-white/60 text-sm font-light leading-relaxed">
                                {r.text}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {s.contact && (
                      <div className="liquid-glass-strong rounded-2xl p-5 mt-2">
                        <div className="relative z-10">
                          <div className="text-white/50 text-[10px] uppercase tracking-[0.15em]">
                            {s.contact.heading}
                          </div>
                          <div className="mt-3 flex flex-col gap-1 text-white text-sm">
                            {s.contact.lines.map((line, i) => (
                              <div key={i}>{line}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {s.tail && s.tail.map((p, i) => <p key={`t-${i}`}>{p}</p>)}
                  </div>
                </div>
              </div>
            </motion.section>
          ))}

          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="liquid-glass-strong rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            data-testid="privacy-contact-card"
          >
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-heading italic text-white tracking-tight">
                Privacy questions?
              </h3>
              <p className="mt-2 text-white/60 font-body font-light text-sm">
                Reach us directly — we usually reply within one business day.
              </p>
            </div>
            <a
              href="mailto:info@mminnovationconsulting.com"
              data-testid="privacy-contact-link"
              className="relative z-10 inline-flex items-center justify-center gap-2 bg-white text-black rounded-full px-6 py-3 text-sm font-medium font-body hover:bg-white/90 transition self-start md:self-auto"
            >
              info@mminnovationconsulting.com
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>

          <div className="pt-4">
            <Link
              to="/"
              data-testid="privacy-back-home"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-body transition"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer bar */}
      <footer className="border-t border-white/10 px-6 sm:px-8 lg:px-16 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-white/40 text-xs font-body">
            © 2026 MM Innovation Consulting. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-white/80 hover:text-white text-xs font-body transition"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-white/40 hover:text-white text-xs font-body transition"
            >
              Terms
            </Link>
            <a
              href="mailto:info@mminnovationconsulting.com"
              className="text-white/40 hover:text-white text-xs font-body transition"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div className="liquid-glass rounded-2xl p-4">
      <div className="relative z-10">
        <div className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-body">
          {label}
        </div>
        <div className="mt-1 text-white font-body font-medium text-sm">
          {value}
        </div>
      </div>
    </div>
  );
}
