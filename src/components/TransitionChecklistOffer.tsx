/**
 * TransitionChecklistOffer
 * Free direct download for the Officer Transition Checklist PDF.
 */
import { Download } from "lucide-react";

const B = {
  accent: "#0F6E56",
  navy: "#1E3A5F",
  navyLight: "#EEF2F7",
  white: "#FFFFFF",
  dark: "#111827",
};

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };
const sans = { fontFamily: "'DM Sans', system-ui, sans-serif" };

const PDF_URL = "/assets/officer-transition-checklist.pdf";

const PHASES = [
  { num: "1", label: "Pre-Transition", sub: "Elections, LLC enrollment, officer meetings" },
  { num: "2", label: "Records Handover", sub: "Secretary, Treasurer, President, Leo Advisor" },
  { num: "3", label: "Installation Day", sub: "Ceremony, platform handover, goal-setting" },
  { num: "4", label: "First 90 Days", sub: "Deadlines, district training, 30-day review" },
];

export default function TransitionChecklistOffer() {
  return (
    <>
      <style>{`
        .download-btn-teal {
          background: #0F6E56;
        }
        .download-btn-teal:hover {
          background: #0d5c48;
        }
      `}</style>
      <div style={sans} className="w-full px-4 py-16">
      <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 8px 40px rgba(0,63,135,0.18)" }}>

        {/* Teal accent bar top */}
        <div style={{ height: 5, background: B.accent }} />

        {/* Header */}
        <div className="relative overflow-hidden px-10 pt-9 pb-8" style={{ background: B.navy }}>
          <div className="absolute rounded-full pointer-events-none"
            style={{ top: "-50px", right: "-50px", width: "200px", height: "200px",
              background: "rgba(245,168,0,0.08)" }} />
          <div className="absolute rounded-full pointer-events-none"
            style={{ bottom: "-30px", left: "25%", width: "140px", height: "140px",
              background: "rgba(255,255,255,0.04)" }} />
          <div className="relative z-10">
            <span className="inline-block text-base font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 bg-white"
              style={{ color: B.accent, border: `1px solid ${B.accent}` }}>
              Free Download · No Login Required
            </span>
            <h2 className="text-3xl font-bold text-white leading-tight tracking-tight mb-2" style={serif}>
              Officer Transition<br />
              <em style={{ fontStyle: "italic", color: "#FFFFFF" }}>Checklist</em>
            </h2>
            <p className="text-base leading-normal max-w-sm text-white">
              A print-ready PDF covering every role, every step, formatted for your June handover meeting.
            </p>
          </div>
        </div>

        {/* Body: phases + download */}
        <div className="bg-white grid grid-cols-1 md:grid-cols-2">

          {/* Left: phase list */}
          <div className="px-8 py-7 border-b md:border-b-0 md:border-r border-gray-100">
            <p className="text-base font-bold tracking-widest uppercase mb-5 text-gray-900">
              What's inside
            </p>
            <div className="flex flex-col divide-y divide-gray-100">
              {PHASES.map((p, i) => (
                <div key={i} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base font-bold flex-shrink-0"
                    style={{ background: B.navyLight, color: B.navy }}>
                    {p.num}
                  </div>
                  <div>
                    <p className="text-base font-semibold mb-0.5 leading-normal text-gray-900">
                      {p.label}
                    </p>
                    <p className="text-base leading-normal text-gray-600">{p.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-base leading-normal text-gray-600">
                + HoursServed platform handover steps · LCI deadline reference · LLC course reminders
              </p>
            </div>
          </div>

          {/* Right: download */}
          <div className="px-8 py-7 flex flex-col justify-center bg-white">
            <h3 className="text-xl font-bold mb-1 leading-snug" style={{ ...serif, color: B.dark }}>
              Get the checklist. Free, no signup needed.
            </h3>
            <p className="text-base leading-normal mb-6 text-gray-900">
              Complete officer transition checklist, free to download and print.
            </p>
            <a
              href={PDF_URL}
              download="HoursServed-Officer-Transition-Checklist.pdf"
              className="download-btn-teal inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-base font-semibold transition-all text-white"
              aria-label="Download officer transition checklist PDF">
              <Download size={16} aria-hidden="true" />
              Download PDF
            </a>
          </div>
        </div>

        {/* Teal accent bar bottom */}
        <div style={{ height: 4, background: B.accent }} />
      </div>
    </div>
    </>
  );
}
