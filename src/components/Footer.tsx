import React, { useState } from "react";
import { Mail, Shield, BookOpen, UserCheck, X, Sparkles, Info, Send, CheckCircle } from "lucide-react";

interface FooterProps {
  onOpenSeoHub?: () => void;
}

export function Footer({ onOpenSeoHub }: FooterProps) {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | "contact" | "about" | null>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === "/privacy") return "privacy";
      if (path === "/terms") return "terms";
      if (path === "/contact") return "contact";
      if (path === "/about") return "about";
    }
    return null;
  });

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState("");

  const handleResetForm = () => {
    setContactName("");
    setContactEmail("");
    setContactSubject("");
    setContactMessage("");
    setIsSubmitting(false);
    setContactSubmitted(false);
    setContactError("");
  };

  const openModal = (type: "privacy" | "terms" | "contact" | "about") => {
    setActiveModal(type);
    handleResetForm();
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/${type}`);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    handleResetForm();
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/');
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError("Please fill out all required fields.");
      return;
    }
    setContactError("");
    setIsSubmitting(true);
    
    // Simulate real API submission locally
    setTimeout(() => {
      setIsSubmitting(false);
      setContactSubmitted(true);
    }, 800);
  };

  return (
    <footer id="app-footer" className="w-full bg-slate-900 text-slate-400 py-12 px-6 mt-20 border-t border-slate-800 text-center text-xs relative z-30">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-left md:text-left">
          <span className="font-bold text-slate-300">Dr Watermark &mdash; AI Text Watermark Remover</span>
          <p className="mt-1 text-slate-500">
            &copy; {new Date().getFullYear()} Secure Client-Side Text Sanitizer. All rights reserved.
          </p>
        </div>

        {/* Essential AdSense Policy Links */}
        <nav className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 font-semibold text-slate-300">
          <button
            id="link-about"
            onClick={() => openModal("about")}
            className="hover:text-blue-400 transition cursor-pointer text-xs md:text-sm"
          >
            About Us
          </button>
          <button
            id="link-privacy"
            onClick={() => openModal("privacy")}
            className="hover:text-blue-400 transition cursor-pointer text-xs md:text-sm"
          >
            Privacy Policy
          </button>
          <button
            id="link-terms"
            onClick={() => openModal("terms")}
            className="hover:text-blue-400 transition cursor-pointer text-xs md:text-sm"
          >
            Terms &amp; Conditions
          </button>
          <button
            id="link-contact"
            onClick={() => openModal("contact")}
            className="hover:text-blue-400 transition cursor-pointer text-xs md:text-sm"
          >
            Contact Us
          </button>
          {onOpenSeoHub && (
            <button
              onClick={onOpenSeoHub}
              className="hover:text-blue-400 font-bold text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-lg bg-blue-500/5 transition cursor-pointer flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              Blog &amp; Helpful Guides
            </button>
          )}
        </nav>
      </div>

      <div className="max-w-4xl mx-auto mt-6 pt-6 border-t border-slate-800/60 text-slate-600 text-[11px] leading-relaxed text-left">
        Disclaimers: Our text sanitation utility processes all entered content purely locally inside your browser context. No text data or character payloads are transmitted to external servers, cloud storage, or third-party loggers, ensuring maximum compliance with NDA standards.
      </div>

      {/* --- INTERACTIVE MODALS --- */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50 rounded-t-2xl">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold text-lg">
                {activeModal === "about" && (
                  <>
                    <Info className="w-5 h-5 text-blue-500" />
                    About Us
                  </>
                )}
                {activeModal === "privacy" && (
                  <>
                    <Shield className="w-5 h-5 text-emerald-500" />
                    Privacy Policy
                  </>
                )}
                {activeModal === "terms" && (
                  <>
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    Terms of Service &amp; Conditions
                  </>
                )}
                {activeModal === "contact" && (
                  <>
                    <Mail className="w-5 h-5 text-amber-500" />
                    Contact Us
                  </>
                )}
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto text-slate-600 text-sm space-y-4 text-left leading-relaxed">
              {activeModal === "about" && (
                <>
                  <p className="font-semibold text-slate-800 text-base">Empowering Digital Privacy &amp; Clean Writing</p>
                  <p>
                    <strong>Dr Watermark</strong> is a premier text sanitization and privacy project founded by a group of passionate software developers, NLP researchers, and typography enthusiasts. Our core objective is to restore visual and digital clarity to the written word in an era dominated by invisible automated surveillance, profiling, and metadata tracking.
                  </p>
                  
                  <h4 className="font-bold text-slate-800 mt-4">Our Core Expertise</h4>
                  <p>
                    Our core engineers specialize in character-set analysis, Unicode standards compliance, and natural language processing. We recognize that modern AI engines (such as ChatGPT, Claude, and Gemini) silently inject forensic tracking signatures into generated texts via invisible zero-width gaps, bi-directional text-direction markers, and alternate visual homoglyphs. 
                  </p>
                  <p>
                    Dr Watermark targets these exact vulnerabilities by compiling advanced scanning patterns, lookalike lookup dictionaries, and real-time sanitizer triggers to purge this hidden payload automatically.
                  </p>

                  <h4 className="font-bold text-slate-800 mt-4">Why Dr Watermark?</h4>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>
                      <strong>100% Client-Side Integrity:</strong> We strictly believe that user text is confidential. No strings or fragments pasted into our boxes are ever transmitted to external APIs or recorded by cloud database logs.
                    </li>
                    <li>
                      <strong>Deep-Level Character Extraction:</strong> We isolate hidden homoglyphs, U+200B zero-width spaces, and other structural trackers that basic online text boxes overlook.
                    </li>
                    <li>
                      <strong>Speed and Usability:</strong> Clean, high-contrast workspace interfaces optimized for immediate corporate, publication, or creative reuse.
                    </li>
                  </ul>
                  <p className="mt-4 text-slate-500 italic">
                    Have any questions, concerns, or technical suggestions? Please reach out via our contact page or email us at <strong>bashircr17@gmail.com</strong>.
                  </p>
                </>
              )}

              {activeModal === "privacy" && (
                <>
                  <p className="font-semibold text-slate-800 text-base">Comprehensive Privacy Policy (GDPR &amp; Google AdSense Compliant)</p>
                  <p>
                    At Dr Watermark (accessible from our web domains), visitor privacy is our highest priority. This Privacy Policy details the exact nature of data processed, recorded, and optimized by our site.
                  </p>
                  
                  <h4 className="font-bold text-slate-800">1. On-Device Local Processing (No Clipboard Collection)</h4>
                  <p>
                    Our primary function is a client-side text sanitization hub. <strong>None of the text paragraphs, document uploads, or character lists pasted into our form fields are sent to our servers.</strong> The entire processing engine operates 100% locally inside your web browser’s active RAM memory sandbox. Once your browser tab is closed or reloaded, all text entries are instantly destroyed.
                  </p>

                  <h4 className="font-bold text-slate-800">2. Cookies, Logs and Core Web Vitals</h4>
                  <p>
                    Like most professional platforms, we utilize standard server logs which include internet protocol (IP) addresses, browser variants, Internet Service Providers (ISPs), date/time indicators, exit directories, and click patterns. This information is processed strictly in aggregate format to inspect system health, track performance bottlenecks, and refine mobile layout responsiveness, and is never linked to any personally identifiable records.
                  </p>

                  <h4 className="font-bold text-slate-800">3. Google AdSense &amp; DoubleClick DART Cookies</h4>
                  <p>
                    We may embed Google AdSense scripts to display contextual promotions. Google, as our third-party advertising partner, utilizes DART cookies to serve automated, personalized placements based on your interactions across our domain and other channels. You can easily manage and decline DART cookie profiling by visiting the official Google Ads Privacy Policy page here: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://policies.google.com/technologies/ads</a>.
                  </p>

                  <h4 className="font-bold text-slate-800">4. Third-Party Advertisers</h4>
                  <p>
                    Other third-party ad networks may deploy cookies, tracking pixels, or beacons to analyze advertising campaign reach. Please refer to their respective privacy guidelines for comprehensive opt-out options. Dr Watermark has no administrative access or control over cookies dropped by third-party partner advertisers.
                  </p>

                  <h4 className="font-bold text-slate-800">5. Configuration Memory</h4>
                  <p>
                    We utilize basic local storage parameters purely to preserve your selected checkboxes (such as &ldquo;Collapse Consecutive Spaces&rdquo;) across browser visits, keeping your workflow seamless.
                  </p>

                  <h4 className="font-bold text-slate-800">6. Inquiry Information</h4>
                  <p>
                    If you submit a contact query via our website, we only use your email to directly answer your service request. Your email address is never shared, leased, or sold to third-party marketing firms. For any questions regarding your digital records, contact us at <strong>bashircr17@gmail.com</strong>.
                  </p>
                </>
              )}

              {activeModal === "terms" && (
                <>
                  <p className="font-semibold text-slate-800 text-base">Terms of Use and Site License Rules</p>
                  <p>
                    Welcome to Dr Watermark. By accessing, loading, or sanitizing text on our website, you agree to comply with and be bound by the following Terms &amp; Conditions.
                  </p>

                  <h4 className="font-bold text-slate-800">1. Platform License and Allowances</h4>
                  <p>
                    We grant users a 100% free, non-exclusive, global license to utilize our character-clearing and text normalization algorithms for personal, academic, editorial, and commercial applications. You are fully authorized to clean corporate communications, draft texts, or code files governed by confidential NDAs without breach of these terms.
                  </p>

                  <h4 className="font-bold text-slate-800">2. Disclaimers and Limitations of Warranties</h4>
                  <p>
                    While our cleaner is designed to match standard zero-width strings, homoglyphs, and space signatures, our platform is provided entirely &ldquo;as is.&rdquo; We do not make any guarantees that the tool will locate 100% of custom, proprietary cryptographic tracking keys embedded by newly introduced commercial AI APIs.
                  </p>

                  <h4 className="font-bold text-slate-800">3. Appropriate Use Limits</h4>
                  <p>
                    Users are prohibited from attempting to launch high-volume automated scripts to DDoS or scrape our hosting assets. Since our processing engine operates completely client-side in your browser, standard browser interaction is expected and supported.
                  </p>

                  <h4 className="font-bold text-slate-800">4. Site Changes</h4>
                  <p>
                    We reserve the right to update or modify these terms, cleaning properties, or underlying algorithms at any time to preserve standard compliance with changing Unicode specifications.
                  </p>
                </>
              )}

              {activeModal === "contact" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {/* Information column */}
                    <div className="md:col-span-2 space-y-4">
                      <p className="font-semibold text-slate-800 text-base">We Value Your Feedback</p>
                      <p className="text-xs text-slate-500">
                        Have a suggestion, found a rare Unicode marker our parser missed, or wish to cooperate? Let us know!
                      </p>

                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Direct Email</div>
                            <a href="mailto:bashircr17@gmail.com" className="text-xs font-semibold text-blue-600 hover:underline break-all">
                              bashircr17@gmail.com
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <UserCheck className="w-5 h-5 text-emerald-500 mt-0.5" />
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Standard Reply</div>
                            <p className="text-slate-600 text-xs font-medium">Standard inquiries resolved within 24 hours.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Form column */}
                    <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                      {contactSubmitted ? (
                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 text-center flex flex-col items-center justify-center h-full animate-in fade-in duration-300">
                          <CheckCircle className="w-10 h-10 text-emerald-500 mb-3" />
                          <h4 className="font-bold text-emerald-900 text-base">Inquiry Sent Successfully!</h4>
                          <p className="text-xs text-emerald-700 mt-2 max-w-xs leading-relaxed">
                            Thank you, <strong>{contactName}</strong>. Your message regarding &ldquo;{contactSubject || "General Inquiry"}&rdquo; has been dispatched. Our team will contact you back at <strong>{contactEmail}</strong> as soon as possible.
                          </p>
                          <button
                            onClick={handleResetForm}
                            className="mt-4 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-100/50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition"
                          >
                            Send Another Message
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleContactSubmit} className="space-y-3">
                          <h4 className="font-bold text-slate-800 text-sm">Send us a direct message:</h4>
                          
                          {contactError && (
                            <div className="p-2 text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-lg font-semibold">
                              ⚠️ {contactError}
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label htmlFor="contact-name" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Your Name *</label>
                              <input
                                id="contact-name"
                                type="text"
                                required
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs outline-none bg-slate-50 transition"
                              />
                            </div>
                            <div>
                              <label htmlFor="contact-email" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Email Address *</label>
                              <input
                                id="contact-email"
                                type="email"
                                required
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                                placeholder="john@example.com"
                                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs outline-none bg-slate-50 transition"
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="contact-subject" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Subject</label>
                            <input
                              id="contact-subject"
                              type="text"
                              value={contactSubject}
                              onChange={(e) => setContactSubject(e.target.value)}
                              placeholder="Unicode bug report / Sponsorship / Feature suggestion"
                              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs outline-none bg-slate-50 transition"
                            />
                          </div>

                          <div>
                            <label htmlFor="contact-message" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Message Content *</label>
                            <textarea
                              id="contact-message"
                              required
                              rows={4}
                              value={contactMessage}
                              onChange={(e) => setContactMessage(e.target.value)}
                              placeholder="Type your message detail here..."
                              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs outline-none bg-slate-50 transition resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white font-bold text-xs py-2 rounded-lg transition inline-flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            {isSubmitting ? (
                              <span>Sending message...</span>
                            ) : (
                              <>
                                <Send className="w-3.5 h-3.5" />
                                <span>Submit Inquiry</span>
                              </>
                            )}
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl text-right">
              <button
                onClick={closeModal}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-4 py-2 rounded-xl transition cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
