import { useState } from "react";
import { Mail, Shield, BookOpen, UserCheck, X } from "lucide-react";

export function Footer() {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | "contact" | null>(null);

  const openModal = (type: "privacy" | "terms" | "contact") => {
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <footer id="app-footer" className="w-full bg-slate-900 text-slate-400 py-12 px-6 mt-20 border-t border-slate-800 text-center text-xs relative z-30">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-bold text-slate-300">Dr Wamark &mdash; AI Text Watermark Remover</span>
          <p className="mt-1 text-slate-500">
            &copy; {new Date().getFullYear()} Secure Client-Side Text Sanitizer. All rights reserved.
          </p>
        </div>

        {/* Essential AdSense Policy Links */}
        <nav className="flex items-center gap-6 font-semibold text-slate-300">
          <button
            id="link-privacy"
            onClick={() => openModal("privacy")}
            className="hover:text-blue-400 transition cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            id="link-terms"
            onClick={() => openModal("terms")}
            className="hover:text-blue-400 transition cursor-pointer"
          >
            Terms of Service
          </button>
          <button
            id="link-contact"
            onClick={() => openModal("contact")}
            className="hover:text-blue-400 transition cursor-pointer"
          >
            Contact Us
          </button>
        </nav>
      </div>

      <div className="max-w-4xl mx-auto mt-6 pt-6 border-t border-slate-800/60 text-slate-600 text-[11px] leading-relaxed">
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
                {activeModal === "privacy" && (
                  <>
                    <Shield className="w-5 h-5 text-emerald-500" />
                    Privacy Policy
                  </>
                )}
                {activeModal === "terms" && (
                  <>
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    Terms of Service
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
              {activeModal === "privacy" && (
                <>
                  <p className="font-semibold text-slate-800 text-base">100% On-Device Data Protection Commitment</p>
                  <p>
                    We appreciate your privacy and treat security as our highest priority. This Privacy Policy describes how we collect, handle, and store user credentials and text payloads within this application.
                  </p>
                  <h4 className="font-bold text-slate-800">1. Data Handling Policy</h4>
                  <p>
                    All text cleaning, parsing, and analysis occur entirely within your local browser sandbox via JavaScript. <strong>We do not transmit, send, or cache any pasted strings, document extracts, or character payloads to remote servers.</strong> All information remains inside your machine&apos;s active RAM session and disappears instantly upon closing or refreshing the browser tab.
                  </p>
                  <h4 className="font-bold text-slate-800">2. Cookies and Advertisements</h4>
                  <p>
                    We may partner with Google AdSense to serve contextual advertisements across this application. These advertising networks may deploy tracking cookies to deliver personalized ads based on your general browsing interests. You can choose to reject tracking cookies inside your web browser configuration.
                  </p>
                  <h4 className="font-bold text-slate-800">3. Local Storage Usage</h4>
                  <p>
                    This application utilizes basic local storage settings solely to remember your chosen cleaning configurations (e.g., toggles for whitespace normalizers) across sessions. No confidential user text is recorded here.
                  </p>
                </>
              )}

              {activeModal === "terms" && (
                <>
                  <p className="font-semibold text-slate-800 text-base">Standard Terms of Use and Licensing</p>
                  <p>
                    Welcome to the Dr Wamark platform. By accessing and using our tools, you agree to comply with the terms and conditions outlined below.
                  </p>
                  <h4 className="font-bold text-slate-800">1. Permitted Personal &amp; Professional Use</h4>
                  <p>
                    This application is provided completely free of charge for writers, designers, developers, journalists, and security researchers. You are welcome to utilize this tool to sanitize corporate communications, proprietary scripts, drafts, and data dumps under active non-disclosure agreements (NDAs) without breach.
                  </p>
                  <h4 className="font-bold text-slate-800">2. Accuracy and Disclaimer</h4>
                  <p>
                    While our cleaning engine matches a broad list of Unicode formats, we provide the platform &ldquo;as is&rdquo; without guarantees. We are not liable for formatting errors, line split glitches, or character interpretation failures arising from proprietary software parsing.
                  </p>
                  <h4 className="font-bold text-slate-800">3. Automated Bot Interactions</h4>
                  <p>
                    Abusing this free utility via continuous high-volume bot scraping scripts that strain bandwidth is strictly prohibited and may result in localized IP blocking.
                  </p>
                </>
              )}

              {activeModal === "contact" && (
                <>
                  <p className="font-semibold text-slate-800 text-base">Get in Touch with Our Development Team</p>
                  <p>
                    If you have suggestions for improvements, encountered a specific hidden Unicode character our engine missed, or are interested in partnerships, feel free to contact us.
                  </p>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3 mt-2">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Email Inquiries</div>
                        <a href="mailto:support@textcleaner.local" className="text-sm font-semibold text-blue-600 hover:underline">
                          support@textcleaner.local
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <UserCheck className="w-5 h-5 text-emerald-500" />
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Response Timelines</div>
                        <p className="text-slate-600 font-medium">Standard ticket updates within 24-48 business hours.</p>
                      </div>
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
