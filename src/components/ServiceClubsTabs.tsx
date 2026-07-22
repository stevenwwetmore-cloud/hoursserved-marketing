import { useState, useRef, useEffect } from 'react';
import { Calendar, Target, Clock, Users, CreditCard, BarChart3, Mail, Check, CircleCheck, CircleX, TriangleAlert } from 'lucide-react';

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

function Badge({ children, variant = 'green' }: { children: React.ReactNode; variant?: string }) {
  const styles: Record<string, string> = {
    green:  'bg-white border border-[#166534] text-[#166534]',
    amber:  'bg-white border border-[#b45309] text-[#92400e]',
    blue:   'bg-white border border-[#1E3A5F] text-[#1E3A5F]',
    violet: 'bg-white border border-[#5b21b6] text-[#5b21b6]',
    rose:   'bg-white border border-[#b91c1c] text-[#b91c1c]',
    slate:  'bg-white border border-[#9ca3af] text-[#374151]',
  };
  return (
    <span className={`text-base font-bold px-2 py-0.5 rounded-full ml-auto shrink-0 ${styles[variant] ?? styles.slate}`}>
      {children}
    </span>
  );
}

function PfItem({ dot, children }: { dot: { bg: string; color: string }; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 text-base text-gray-900 leading-normal">
      <div className="w-5 h-5 rounded-full shrink-0 mt-px flex items-center justify-center" style={{ background: dot.bg, color: dot.color }}>
        <Check size={16} aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}

function MockBrowser({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.09)] ${className}`}>
      <div className="bg-gray-900 px-4 py-2 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TAB PANELS
// ─────────────────────────────────────────────

function TabMeetings() {
  const dot = { bg: '#eff4ff', color: '#1E3A5F' };
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-2xl font-black text-gray-900 mb-3 leading-normal font-serif italic">Meeting sign-ups that run themselves</h3>
        <p className="text-base text-gray-900 leading-normal mb-3">One email goes out. Members tap <strong className="text-gray-900">Yes</strong> or <strong className="text-gray-900">No</strong>. Attendance is recorded automatically — no login required, no manual tallying, no phone calls.</p>
        <p className="text-base text-gray-900 leading-normal">Automated nudges go out to non-responders so nothing falls through the cracks before meeting night.</p>
        <div className="flex flex-col gap-2.5 mt-5">
          <PfItem dot={dot}>Single-email RSVP — two taps, done</PfItem>
          <PfItem dot={dot}>Automatic attendance recording on confirm</PfItem>
          <PfItem dot={dot}>Nudge emails for non-responders</PfItem>
          <PfItem dot={dot}>Google Calendar sync for members</PfItem>
          <PfItem dot={dot}>Month-lock prevents late edits after reporting</PfItem>
        </div>
      </div>
      <MockBrowser>
        <div className="bg-[#1E3A5F] rounded-lg px-4 py-2.5 text-white text-base font-bold mb-3 flex justify-between items-center">
          <span className="flex items-center gap-2"><Calendar size={16} aria-hidden="true" /> May Meeting — RSVP</span>
          <span style={{ color: '#E8EDF3' }} className="text-base">14 attending</span>
        </div>
        {[
          { icon: CircleCheck, color: '#166534', name: 'Margaret T.', badge: 'Attending', v: 'green' },
          { icon: CircleCheck, color: '#166534', name: 'David K.',    badge: 'Attending', v: 'green' },
          { icon: CircleX, color: '#b91c1c', name: 'Sandra L.',   badge: 'Regrets',   v: 'amber' },
          { icon: Clock, color: '#92400e', name: 'Bob M.',      badge: 'Nudge sent',  v: 'slate' },
          { icon: CircleCheck, color: '#166534', name: 'Carol P.',    badge: 'Attending', v: 'green' },
        ].map((r, i) => {
          const IconComponent = r.icon;
          return (
          <div key={r.name} className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md mb-1 text-base ${i % 2 === 0 ? 'bg-gray-50' : ''}`}>
            <IconComponent size={16} aria-hidden="true" style={{ color: r.color }} />
            <span className="flex-1 font-semibold text-gray-900">{r.name}</span>
            <Badge variant={r.v}>{r.badge}</Badge>
          </div>
        );
        })}
        <div className="mt-3 px-3 py-2.5 bg-white border border-[#1e3a8a] rounded-lg text-base text-[#1e3a8a] font-semibold text-center flex items-center justify-center gap-2">Attendance auto-recorded on confirmation <Check size={16} aria-hidden="true" /></div>
      </MockBrowser>
    </div>
  );
}

function TabEvents() {
  const dot = { bg: '#d1fae5', color: '#059669' };
  const shifts = [
    { time: 'Setup — 8:00 AM',    filled: '3/3', status: 'Full', v: 'green' },
    { time: 'Sorting — 10:00 AM', filled: '4/6', status: 'Gap',  v: 'amber' },
    { time: 'Delivery — 1:00 PM', filled: '5/5', status: 'Full', v: 'green' },
    { time: 'Cleanup — 4:00 PM',  filled: '2/4', status: 'Gap',  v: 'amber' },
  ];
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-2xl font-black text-gray-900 mb-3 leading-normal font-serif italic">Events that coordinate themselves</h3>
        <p className="text-base text-gray-900 leading-normal mb-3">Create an event, define shifts, and send invitations. Volunteers choose their slot, get their confirmation, and show up — no spreadsheet hand-off, no confusion about who signed up for what.</p>
        <p className="text-base text-gray-900 leading-normal">The <strong className="text-gray-900">Event Operations Board</strong> gives your committee real-time shift coverage at a glance, with gap alerts before the event starts.</p>
        <div className="flex flex-col gap-2.5 mt-5">
          <PfItem dot={dot}>Shift management with role-based slots</PfItem>
          <PfItem dot={dot}>Email-token shift signup — no logins</PfItem>
          <PfItem dot={dot}>Event Operations Board — live coverage view</PfItem>
          <PfItem dot={dot}>External volunteer tracking (non-members)</PfItem>
          <PfItem dot={dot}>Event nudge reminders before start time</PfItem>
        </div>
      </div>
      <MockBrowser className="w-full max-w-2xl mx-auto">
        <div className="bg-emerald-600 rounded-lg px-4 py-2.5 text-white text-base font-bold mb-3 flex justify-between items-center">
          <span className="flex items-center gap-2"><Target size={16} aria-hidden="true" /> Food Bank Drive — Shifts</span>
          <span style={{ color: '#E8EDF3' }} className="text-base">Event Ops Board</span>
        </div>
        <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md mb-1 bg-gray-50 text-base font-bold text-gray-900">
          <span className="flex-1">SHIFT</span><span className="mr-8">FILLED</span><span>STATUS</span>
        </div>
        {shifts.map((s, i) => (
          <div key={s.time} className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md mb-1 text-base ${i % 2 !== 0 ? 'bg-gray-50' : ''}`}>
            <span className="flex-1 text-gray-900">{s.time}</span>
            <span className="text-gray-600 mr-4">{s.filled}</span>
            <Badge variant={s.v}>{s.status}</Badge>
          </div>
        ))}
        <div className="mt-3 px-3 py-2 bg-white border border-[#b45309] rounded-lg text-base text-[#92400e] font-semibold flex items-center gap-2"><TriangleAlert size={16} aria-hidden="true" /> 2 shifts need volunteers — send reminder?</div>
      </MockBrowser>
    </div>
  );
}

function TabHours() {
  const dot = { bg: '#fef3c7', color: '#d97706' };
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-2xl font-black text-gray-900 mb-3 leading-normal font-serif italic">Service hours that track themselves — and stay correctable</h3>
        <p className="text-base text-gray-900 leading-normal mb-3">Attendance at events logs hours automatically. Officers can <strong className="text-gray-900">add, edit, or correct</strong> service hours for any member — even after the event — using the Corrections Queue.</p>
        <p className="text-base text-gray-900 leading-normal">Every change is attributed, dated, and visible to the officer on duty. Month-lock protects approved reports from accidental edits.</p>
        <div className="flex flex-col gap-2.5 mt-5">
          <PfItem dot={dot}>Auto-log hours from event attendance</PfItem>
          <PfItem dot={dot}>Post-event corrections with officer attribution</PfItem>
          <PfItem dot={dot}>Member dashboard — each member sees their own record</PfItem>
          <PfItem dot={dot}>Monthly report generation &amp; distribution</PfItem>
          <PfItem dot={dot}>LCI-format Lions Portal CSV export</PfItem>
        </div>
      </div>
      <MockBrowser className="w-full max-w-2xl mx-auto">
        <div className="rounded-lg px-4 py-2.5 text-white text-base font-bold mb-3 flex justify-between items-center" style={{ background: '#d97706' }}>
          <span className="flex items-center gap-2"><Clock size={16} aria-hidden="true" /> Hours — April Report</span><span style={{ color: '#E8EDF3' }} className="text-base">8 members</span>
        </div>
        {[
          { name: 'Ann W.',   hrs: '14 hrs', badge: 'Reported',    v: 'green', alt: true },
          { name: 'Brian F.', hrs: '9 hrs',  badge: 'Reported',    v: 'green', alt: false },
          { name: 'Carol G.', hrs: '0 hrs',  badge: 'Correction?', v: 'amber', alt: true },
          { name: 'Dan R.',   hrs: '7 hrs',  badge: 'Reported',    v: 'green', alt: false },
        ].map((r) => (
          <div key={r.name} className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md mb-1 text-base ${r.alt ? 'bg-gray-50' : ''}`}>
            <span className="flex-1 font-semibold text-gray-900">{r.name}</span>
            <span className="text-gray-600 mr-2">{r.hrs}</span>
            <Badge variant={r.v}>{r.badge}</Badge>
          </div>
        ))}
        <div className="mt-3 px-3 py-2 bg-white border border-[#166534] rounded-lg text-base text-[#166534] font-semibold flex items-center gap-2"><Check size={16} aria-hidden="true" /> Carol corrected +4 hrs — officer noted, month locked</div>
      </MockBrowser>
    </div>
  );
}

function TabMembers() {
  const dot = { bg: '#ede9fe', color: '#7c3aed' };
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-2xl font-black text-gray-900 mb-3 leading-normal font-serif italic">Members and volunteers — in one place</h3>
        <p className="text-base text-gray-900 leading-normal mb-3">Your member roster lives in HoursServed. Import from a spreadsheet, or invite directly. Each member gets a personal <strong className="text-gray-900">Member Dashboard</strong> to see their own attendance and hours.</p>
        <p className="text-base text-gray-900 leading-normal">Volunteers who aren't members — community helpers, Leo youth, guest participants — are tracked separately through the Volunteer module, keeping your member data clean.</p>
        <div className="flex flex-col gap-2.5 mt-5">
          <PfItem dot={dot}>Member roster with CSV import</PfItem>
          <PfItem dot={dot}>Personal member dashboard (no login)</PfItem>
          <PfItem dot={dot}>Separate volunteer tracking for non-members</PfItem>
          <PfItem dot={dot}>At-Risk member alerts — low attendance flagged</PfItem>
          <PfItem dot={dot}>Officer Work Queue — admin actions in one view</PfItem>
        </div>
      </div>
      <MockBrowser className="w-full max-w-2xl mx-auto">
        <div className="rounded-lg px-4 py-2.5 text-white text-base font-bold mb-3 flex justify-between items-center" style={{ background: '#7c3aed' }}>
          <span className="flex items-center gap-2"><Users size={16} aria-hidden="true" /> Members</span><span style={{ color: '#E8EDF3' }} className="text-base">32 active</span>
        </div>
        {[
          { name: 'Peter H.', detail: '3 events', badge: 'Active',  v: 'green', alt: true },
          { name: 'Susan T.', detail: '1 event',  badge: 'Watch',   v: 'amber', alt: false },
          { name: 'James R.', detail: '0 events', badge: 'At Risk', v: 'rose',  alt: true },
          { name: 'Linda K.', detail: '5 events', badge: 'Active',  v: 'green', alt: false },
        ].map((r) => (
          <div key={r.name} className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md mb-1 text-base ${r.alt ? 'bg-gray-50' : ''}`}>
            <span className="flex-1 font-semibold text-gray-900">{r.name}</span>
            <span className="text-gray-600 mr-2">{r.detail}</span>
            <Badge variant={r.v}>{r.badge}</Badge>
          </div>
        ))}
        <div className="mt-3 px-3 py-2 bg-white border border-[#5b21b6] rounded-lg text-base text-[#5b21b6] font-semibold flex items-center gap-2"><TriangleAlert size={16} aria-hidden="true" /> At-Risk alert: James R. — 0 events, 3 months</div>
      </MockBrowser>
    </div>
  );
}

function TabPayments() {
  const dot = { bg: '#ffe4e6', color: '#e11d48' };
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-2xl font-black text-gray-900 mb-3 leading-normal font-serif italic">Interclub payments — coordinated, not collected</h3>
        <p className="text-base text-gray-900 leading-normal mb-3">When clubs share costs — venue splits, joint event expenses, inter-district hosting — HoursServed tracks who owes what and sends dues requests by email. <strong className="text-gray-900">No money changes hands through the platform.</strong></p>
        <p className="text-base text-gray-900 leading-normal">Members pay their own way, your books stay clean, and the audit trail takes care of itself.</p>
        <div className="flex flex-col gap-2.5 mt-5">
          <PfItem dot={dot}>Dues requests sent by email — no portal login</PfItem>
          <PfItem dot={dot}>Payment acknowledgment tracking</PfItem>
          <PfItem dot={dot}>Interclub cost-splitting record keeping</PfItem>
          <PfItem dot={dot}>No payment processing — clubs handle payments directly</PfItem>
          <PfItem dot={dot}>Full audit trail for treasurer reports</PfItem>
        </div>
      </div>
      <MockBrowser className="w-full max-w-2xl mx-auto">
        <div className="rounded-lg px-4 py-2.5 text-white text-base font-bold mb-3 flex justify-between items-center" style={{ background: '#e11d48' }}>
          <span className="flex items-center gap-2"><CreditCard size={16} aria-hidden="true" /> Dues — Spring Gala</span><span className="text-base" style={{ color: '#E8EDF3' }}>3 clubs</span>
        </div>
        {[
          { name: 'Westside Lions',   amount: '$240', badge: 'Confirmed', v: 'green', alt: true },
          { name: 'Northview Rotary', amount: '$180', badge: 'Pending',   v: 'amber', alt: false },
          { name: 'Eastpark Kiwanis', amount: '$180', badge: 'Confirmed', v: 'green', alt: true },
        ].map((r) => (
          <div key={r.name} className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md mb-1 text-base ${r.alt ? 'bg-gray-50' : ''}`}>
            <span className="flex-1 font-semibold text-gray-800">{r.name}</span>
            <span className="text-gray-600 mr-2">{r.amount}</span>
            <Badge variant={r.v}>{r.badge}</Badge>
          </div>
        ))}
        <div className="mt-3 px-3 py-2 bg-white border border-[#b91c1c] rounded-lg text-base text-[#b91c1c] font-semibold flex items-center gap-2"><Mail size={16} aria-hidden="true" /> Reminder sent to Northview Rotary — 7 days outstanding</div>
      </MockBrowser>
    </div>
  );
}

function TabReports() {
  const dot = { bg: '#ccfbf1', color: '#0F6E56' };
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-2xl font-black text-gray-900 mb-3 leading-normal font-serif italic">Reports that generate and distribute themselves</h3>
        <p className="text-gray-900 leading-relaxed mb-3 text-base">Monthly reports are auto-generated at month-end and distributed to officers by email. Require approval before distribution — or let it run automatically. Everything exports cleanly.</p>
        <p className="text-gray-900 leading-relaxed text-base">Lions clubs get a dedicated <strong className="text-gray-800">LCI Portal CSV export</strong> formatted exactly for Lions International reporting requirements.</p>
        <div className="flex flex-col gap-2.5 mt-5">
          <PfItem dot={dot}>Auto-generated monthly reports</PfItem>
          <PfItem dot={dot}>Report approval workflow before distribution</PfItem>
          <PfItem dot={dot}>LCI Lions Portal CSV — properly formatted</PfItem>
          <PfItem dot={dot}>Export Center — CSV, PDF by date range</PfItem>
          <PfItem dot={dot}>Club Reporting Coverage dashboard</PfItem>
        </div>
      </div>
      <MockBrowser className="w-full max-w-2xl mx-auto">
        <div className="rounded-lg px-4 py-2.5 text-white text-base font-bold mb-3 flex justify-between items-center" style={{ background: '#0F6E56' }}>
          <span className="flex items-center gap-2"><BarChart3 size={16} aria-hidden="true" /> April Report — Ready</span><span className="text-base" style={{ color: '#E8EDF3' }}>Awaiting approval</span>
        </div>
        {[
          { label: 'Total members reported', value: '28' },
          { label: 'Total service hours',    value: '214 hrs' },
          { label: 'Meetings held',          value: '3' },
          { label: 'Events completed',       value: '4' },
        ].map((r, i) => (
          <div key={r.label} className={`flex items-center px-2.5 py-2 rounded-md mb-1 text-base ${i % 2 === 0 ? 'bg-gray-50' : ''}`}>
            <span className="flex-1 text-gray-600">{r.label}</span>
            <span className="font-bold text-gray-900">{r.value}</span>
          </div>
        ))}
        <div className="mt-3 flex gap-2">
          <div className="flex-1 bg-white border border-[#166534] rounded-lg py-2 text-base text-[#166534] font-bold text-center flex items-center justify-center gap-2"><Check size={16} aria-hidden="true" /> Approve &amp; Send</div>
          <div className="flex-1 bg-white border border-gray-600 rounded-lg py-2 text-base text-gray-900 font-semibold text-center flex items-center justify-center gap-2"><BarChart3 size={16} aria-hidden="true" /> LCI Export</div>
        </div>
      </MockBrowser>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

const TABS = [
  { id: 'meetings', label: 'Meetings & RSVP', icon: Calendar },
  { id: 'events',   label: 'Events & Shifts', icon: Target },
  { id: 'hours',    label: 'Service Hours', icon: Clock },
  { id: 'members',  label: 'Members & Volunteers', icon: Users },
  { id: 'payments', label: 'Interclub Payments', icon: CreditCard },
  { id: 'reports',  label: 'Reports & Export', icon: BarChart3 },
];

const TAB_PANELS: Record<string, JSX.Element> = {
  meetings: <TabMeetings />,
  events:   <TabEvents />,
  hours:    <TabHours />,
  members:  <TabMembers />,
  payments: <TabPayments />,
  reports:  <TabReports />,
};

export default function ServiceClubsTabs() {
  const [activeTab, setActiveTab] = useState('meetings');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent, currentIndex: number) => {
    let targetIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        targetIndex = (currentIndex + 1) % TABS.length;
        break;
      case 'ArrowLeft':
        event.preventDefault();
        targetIndex = (currentIndex - 1 + TABS.length) % TABS.length;
        break;
      case 'Home':
        event.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        targetIndex = TABS.length - 1;
        break;
      default:
        return;
    }

    const targetTab = TABS[targetIndex];
    setActiveTab(targetTab.id);
    tabRefs.current[targetIndex]?.focus();
  };

  return (
    <>
      <div className="flex gap-1.5 flex-wrap mt-10 justify-center" role="tablist">
        {TABS.map((tab, index) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[index] = el)}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`px-4 py-2 rounded-full text-base font-semibold border transition-all cursor-pointer flex items-center gap-2 focus:ring-2 focus:ring-[#0F6E56] focus:ring-offset-2 focus:outline-none ${isActive ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]' : 'bg-white text-gray-900 border-gray-200 hover:border-[#1E3A5F] hover:text-[#1E3A5F]'}`}
          >
            <IconComponent size={16} aria-hidden="true" />
            {tab.label}
          </button>
        );
        })}
      </div>
      {TABS.map((tab) => (
        <div
          key={tab.id}
          className="mt-8"
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          id={`panel-${tab.id}`}
          hidden={activeTab !== tab.id}
        >
          {TAB_PANELS[tab.id]}
        </div>
      ))}
    </>
  );
}
