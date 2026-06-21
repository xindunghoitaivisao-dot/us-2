import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const SECTIONS = [
  {
    n: "01",
    title: "Please Read These Terms Before Using the Site",
    body: [
      `These Terms and Conditions of Use ("Terms and Conditions") apply to your use of and registration with mminnovationconsulting.com (the "Site"), operated by MM Innovation Consulting ("MM Innovation Consulting," "we," "us," or "our").`,
      "Your access to, browsing, review, and use of the Site is subject to these Terms and Conditions and all applicable laws. By accessing and using the Site, you accept these Terms and Conditions without limitation or qualification.",
      "If you do not agree to the Terms and Conditions, do not use the Site. If, at any time, any part of the Terms and Conditions is no longer acceptable to you, immediately terminate your use of the Site.",
    ],
  },
  {
    n: "02",
    title: "Right to Change or Modify the Terms",
    body: [
      "MM Innovation Consulting reserves the right to change, modify, add, or delete portions of the Terms and Conditions at any time, without prior notice. Please re-review the Terms and Conditions periodically for changes.",
      "Your continued use of the Site following any modifications will mean that you accept such changes or deletions.",
    ],
  },
  {
    n: "03",
    title: "Privacy",
    body: [
      "Please refer to MM Innovation Consulting's Privacy Policy for information regarding the Company's collection, use, and storage of users' personal information. By using the Site, you consent to the data practices described in our Privacy Policy.",
    ],
  },
  {
    n: "04",
    title: "Copyright and Use of Site Content",
    body: [
      `This Site and all the information it contains, or may in the future contain — including but not limited to articles, memoranda, bulletins, reports, press releases, opinions, text, directories, guides, photographs, illustrations, trademarks, trade names, service marks, and logos (collectively, the "Content") — is the property of MM Innovation Consulting and is protected from unauthorized copying and dissemination by U.S. Copyright law, trademark law, international conventions, and other intellectual property laws.`,
      "Certain trademarks and logos displayed on the Site may be owned by third parties. Nothing contained on this Site should be construed as granting, by implication, estoppel, or otherwise, any license or right to use the Site or any Content displayed on the Site without the prior written permission of MM Innovation Consulting or the applicable third-party owner.",
      "MM Innovation Consulting encourages and permits links to Content on the Site. However, MM Innovation Consulting does not grant any license or permission for links or other use of the Site or its Content if such use:",
    ],
    bullets: [
      "Suggests that MM Innovation Consulting promotes or endorses any third party's causes, ideas, political campaigns, websites, products, or services",
      "Copies, displays, disseminates, or otherwise uses the Content without MM Innovation Consulting's express written consent",
      "Uses the Content for commercial purposes without authorization",
    ],
    tail: [
      "Subject to your full compliance with these terms, MM Innovation Consulting authorizes you to view the Content, make a single copy, and print that copy for your own lawful, personal, noncommercial use only, provided that you maintain all copyright, trademark, and other intellectual property notices contained in such Content, and that the Content is not modified in any way.",
    ],
  },
  {
    n: "05",
    title: "Responses to Online Requests",
    body: [
      "From time to time, MM Innovation Consulting may offer to provide information or materials via email or otherwise to interested persons. MM Innovation Consulting reserves the right, in its absolute discretion, to reject any requests for such information or materials, or to discontinue the provision of such information or materials to any person, for any reason whatsoever.",
    ],
  },
  {
    n: "06",
    title: "Prohibited Conduct",
    body: ["You may use the Site for lawful purposes only. You may not upload to, distribute, or otherwise publish through the Site any content that:"],
    bullets: [
      "Is libelous, defamatory, obscene, pornographic, abusive, harassing, or threatening, or otherwise objectionable to MM Innovation Consulting in the Company's sole discretion",
      "Contains computer viruses, worms, or other contaminating or destructive elements",
      "Violates the rights of others, including content that infringes any copyright, trademark, patent, trade secret, or violates any right of privacy or publicity",
      "Contains any false or misleading statement of fact",
      "Contains unauthorized advertising or solicitation",
      "Otherwise violates any applicable criminal or civil law",
    ],
    tail: [
      "You may not use the Site for any commercial purpose, and may not distribute over the Site any solicitation of funds, goods, or services. You may not use the Site to solicit subscribers to join other online services that are competitive with the Site.",
    ],
  },
  {
    n: "07",
    title: "Content Management and Removal",
    body: [
      `MM Innovation Consulting does not and cannot review generally the content posted by users of the Site ("Users' Content") and is not responsible for such content. However, MM Innovation Consulting reserves the right to cancel your access and/or delete, move, or edit any Users' Content that it determines, in its sole discretion, violates these Terms of Use.`,
      "You shall remain solely responsible for all Users' Content posted by you or by any other person using your account. MM Innovation Consulting shall have the right, but not the obligation, to correct any errors or omissions in any Users' Content at its sole discretion.",
      "MM Innovation Consulting prohibits the posting of any information that infringes or violates the copyright rights and/or other intellectual property rights of any person or entity. If you believe your intellectual property right is infringed by any content on the Site, please contact us in writing at the address below with the following information:",
    ],
    bullets: [
      "An identification of the copyrighted work or intellectual property right claimed to have been infringed",
      "An identification of the allegedly infringing material on the Site",
      "Your name, address, daytime telephone number, and email address",
      "A statement of good faith belief that the use is not authorized by the owner, its agent, or the law",
      "A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner",
      "Your signature or that of an authorized representative",
    ],
    tail: [
      "Please send notices to: MM Innovation Consulting — General Counsel, Wyoming, United States. Email: info@mminnovationconsulting.com",
    ],
  },
  {
    n: "08",
    title: "Non-Endorsement",
    body: [
      "MM Innovation Consulting does not represent or endorse the accuracy or reliability of any Users' Content displayed, uploaded, or posted through the Site by any subscriber, information provider, or any other third party. MM Innovation Consulting expressly disclaims any liability related to Users' Content, and you acknowledge that any reliance upon such content shall be at your sole risk.",
      `The Site may contain links to websites owned and operated by third parties ("External Sites"). MM Innovation Consulting is not responsible for the availability of, or the content located on or through, any External Site. You should contact the administrator of those External Sites if you have any concerns regarding such links.`,
    ],
  },
  {
    n: "09",
    title: "Subscriber Qualifications",
    body: [
      "When registering with or applying to MM Innovation Consulting, you must provide accurate, complete, and current registration information and agree to provide MM Innovation Consulting with any updates to that information promptly after such changes occur.",
      "Individual access to the Site is available only to persons who are at least 18 years of age. Your right to use the Site is personal to you and cannot be transferred to any other person.",
      "You shall be responsible for obtaining communication services, computer equipment, and other products or services necessary to access and use the Site, including all associated charges.",
    ],
  },
  {
    n: "10",
    title: "Registrant Information",
    body: [
      "Unless you elect otherwise, MM Innovation Consulting shall have the right to disclose certain limited registrant information — including name, email, and mailing address — to affiliates, partners, and third-party vendors for the purpose of providing registrants with information about products and services.",
      "MM Innovation Consulting shall also have the right to disclose aggregate information about registrant usage and demographics in a manner that does not reveal the personal identity of any individual registrant. MM Innovation Consulting may send you electronic mail to inform you of changes or additions to the Site, or of any products and services offered by MM Innovation Consulting.",
    ],
  },
  {
    n: "11",
    title: "Third Parties",
    body: [
      "MM Innovation Consulting may provide you with links to third-party websites, and some of the content appearing to originate from the Site may be supplied by third-party content providers. MM Innovation Consulting has no responsibility for these third-party websites, which are governed by the terms of use and privacy policies of the applicable third-party content providers.",
    ],
  },
  {
    n: "12",
    title: "Access to and Availability of the Site",
    body: [
      "The Site may become unavailable as a result of maintenance, malfunction of computer hardware or software, or for other reasons, and may result in damages to your systems or operations. You shall be solely responsible for ensuring that any information or content obtained from the Site does not contain any virus, worm, or other computer software code designed to disable, erase, impair, or otherwise damage your systems, software, or data.",
    ],
  },
  {
    n: "13",
    title: "Restriction, Suspension, or Termination",
    body: [
      "MM Innovation Consulting reserves the right, in its sole discretion, to restrict, suspend, or terminate your access to all or any part of the Site at any time for any reason without prior notice or liability and without any obligation to refund any portion of fees paid for any product or service.",
      "MM Innovation Consulting may change, suspend, or discontinue all or any aspect of the Site at any time, including the availability of any Site feature, database, or content, without prior notice or liability.",
    ],
  },
  {
    n: "14",
    title: "Disclaimer of Warranties",
    body: [
      `THE SITE AND THE CONTENT ARE DISTRIBUTED ON AN "AS IS, AS AVAILABLE" BASIS WITHOUT ANY INDEPENDENT VERIFICATION. NEITHER MM INNOVATION CONSULTING, THIRD-PARTY CONTENT PROVIDERS, NOR THEIR RESPECTIVE AGENTS MAKE ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF TITLE, MERCHANTABILITY, OR FITNESS FOR A PARTICULAR PURPOSE, WITH RESPECT TO THE SITE, ANY CONTENT, OR ANY PRODUCTS OR SERVICES SOLD OR DISTRIBUTED THROUGH THE SITE. YOU EXPRESSLY AGREE THAT THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE SITE AND THE ACCURACY OR COMPLETENESS OF THE CONTENT IS ASSUMED SOLELY BY YOU. MM INNOVATION CONSULTING DOES NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED OR ERROR-FREE, NOR DOES IT MAKE ANY WARRANTY AS TO THE ACCURACY, RELIABILITY, COMPLETENESS, OR CURRENCY OF INFORMATION IN THE CONTENT. MM INNOVATION CONSULTING DOES NOT PROVIDE LEGAL, ACCOUNTING, OR TAX ADVICE. READERS ARE RESPONSIBLE FOR OBTAINING INDEPENDENT ADVICE CONCERNING THESE MATTERS.`,
    ],
  },
  {
    n: "15",
    title: "Limitation of Liability",
    body: [
      "UNDER NO CIRCUMSTANCES SHALL MM INNOVATION CONSULTING, NOR ANY THIRD-PARTY CONTENT PROVIDER, NOR THEIR RESPECTIVE PREDECESSORS, SUCCESSORS, PARENTS, SUBSIDIARIES, AFFILIATES, OFFICERS, DIRECTORS, SHAREHOLDERS, INVESTORS, EMPLOYEES, AGENTS, REPRESENTATIVES, ATTORNEYS, LICENSORS, OR INFORMATION PROVIDERS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE THE SITE, EVEN IF SUCH PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN STATES OR JURISDICTIONS THAT DO NOT ALLOW EXCLUSION OF IMPLIED WARRANTIES OR LIMITATION OF LIABILITY, THE LIABILITY OF MM INNOVATION CONSULTING SHALL BE LIMITED TO THE GREATEST EXTENT PERMITTED BY LAW.",
    ],
  },
  {
    n: "16",
    title: "Indemnification",
    body: [
      `You hereby agree to indemnify, defend, and hold MM Innovation Consulting, and all of its predecessors, successors, parents, subsidiaries, affiliates, and past and present officers, directors, shareholders, investors, employees, agents, attorneys, representatives, licensors, and information providers (collectively, the "MM Innovation Consulting Representatives") harmless from and against any and all liability, losses, costs, and expenses (including attorneys' fees) incurred by MM Innovation Consulting or any MM Innovation Consulting Representative in connection with any claim arising out of any use or alleged use by you of this Site, or arising out of or in relation to any breach by you of these Terms and Conditions.`,
      "MM Innovation Consulting reserves the right, at its own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, and in such case, you agree to cooperate reasonably with MM Innovation Consulting's defense of such claim.",
    ],
  },
  {
    n: "17",
    title: "Choice of Law & Entire Agreement",
    body: [
      "These Terms and Conditions shall be construed in accordance with the laws of the State of Wyoming, United States, without regard to conflict of laws principles.",
      "The Terms and Conditions constitute the entire agreement between the parties with respect to the subject matter hereof, and supersede all previous written or oral agreements between the parties with respect to such subject matter.",
      "The Terms and Conditions may not be amended except in writing signed by both parties, and no waiver by either party shall be deemed a waiver of any preceding or subsequent breach or default, unless such waiver is in writing and signed by an authorized representative of MM Innovation Consulting.",
    ],
  },
];

export default function TermsOfUse() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-body antialiased overflow-x-hidden">
      <Navbar />

      {/* Hero / header */}
      <header className="relative px-6 sm:px-8 lg:px-16 pt-40 pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block liquid-glass rounded-full px-3.5 py-1"
            data-testid="terms-badge"
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
            data-testid="terms-heading"
          >
            Terms of Use.
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
              data-testid={`terms-section-${s.n}`}
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
                    {s.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
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
                    {s.tail &&
                      s.tail.map((p, i) => <p key={`t-${i}`}>{p}</p>)}
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
            data-testid="terms-contact-card"
          >
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-heading italic text-white tracking-tight">
                Questions about these terms?
              </h3>
              <p className="mt-2 text-white/60 font-body font-light text-sm">
                Reach out — we usually reply within one business day.
              </p>
            </div>
            <a
              href="mailto:info@mminnovationconsulting.com"
              data-testid="terms-contact-link"
              className="relative z-10 inline-flex items-center justify-center gap-2 bg-white text-black rounded-full px-6 py-3 text-sm font-medium font-body hover:bg-white/90 transition self-start md:self-auto"
            >
              info@mminnovationconsulting.com
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Back to home */}
          <div className="pt-4">
            <Link
              to="/"
              data-testid="terms-back-home"
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
              className="text-white/40 hover:text-white text-xs font-body transition"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-white/80 hover:text-white text-xs font-body transition"
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
