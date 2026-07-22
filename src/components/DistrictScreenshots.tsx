import { LayoutDashboard, Users, FileText, Calendar, Pencil, Clock, Upload, FileOutput, TriangleAlert, ClipboardList, CircleCheck, Phone, MessageSquare } from 'lucide-react';

// Brand tokens
const T = {
  blue: "#1E3A5F",
  navy: "#1E3A5F",
  green: "#166534",
  greenL: "#f0fdf4",
  amber: "#92400e",
  amberL: "#fffbeb",
  red: "#b91c1c",
  redL: "#fef2f2",
  redText: "#b91c1c",
};

const sans = { fontFamily: "'DM Sans', system-ui, sans-serif" };

// Badge component
const BADGE_STYLES: Record<string, { bg: string; border: string; text: string }> = {
  green: { bg: "#FFFFFF", border: "#15803d", text: "#166534" },
  amber: { bg: "#FFFFFF", border: "#b45309", text: "#92400e" },
  red: { bg: "#FFFFFF", border: "#b91c1c", text: "#b91c1c" },
  blue: { bg: "#FFFFFF", border: "#1E3A5F", text: "#1E3A5F" },
  gray: { bg: "#FFFFFF", border: "#9ca3af", text: "#374151" },
};

function Badge({ variant = "gray", children }: { variant?: string; children: React.ReactNode }) {
  const s = BADGE_STYLES[variant] ?? BADGE_STYLES.gray;
  return (
    <span
      className="inline-flex items-center text-base font-semibold px-2 py-0.5 rounded-full"
      style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
    >
      {children}
    </span>
  );
}

// ProgressBar component
function ProgressBar({ pct, variant = "green" }: { pct: number; variant?: string }) {
  const color = variant === "green" ? "#16a34a" : variant === "amber" ? "#d97706" : "#dc2626";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-base text-gray-900 w-7 text-right">{pct}%</span>
    </div>
  );
}

// StatCard component
const SC_COLORS: Record<string, string> = {
  green: "#15803d",
  amber: "#b45309",
  red: "#b91c1c",
  blue: "#1E3A5F",
  gray: "#374151",
};

function StatCard({ label, value, sub, variant = "gray" }: { label: string; value: string; sub?: string; variant?: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3.5">
      <p className="text-base text-gray-900 font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold leading-none mb-0.5" style={{ color: SC_COLORS[variant] }}>{value}</p>
      {sub && <p className="text-base text-gray-600">{sub}</p>}
    </div>
  );
}

// ClubCell component
function ClubCell({ name, lastActivity, isOverdue }: { name: string; lastActivity: string; isOverdue?: boolean }) {
  return (
    <div>
      <p className="text-base font-medium text-gray-900 leading-normal">{name}</p>
      <p className={`text-base leading-normal ${isOverdue ? '' : 'text-gray-600'}`} style={isOverdue ? { color: T.redText } : undefined}>
        {lastActivity}
      </p>
    </div>
  );
}

// CardWrap component
function CardWrap({ title, count, children, className = "" }: { title?: string; count?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      {(title || count) && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
          {title && <span className="text-base font-semibold text-gray-900">{title}</span>}
          {count && <span className="text-base text-gray-600">{count}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

// DataTable component
function DataTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="text-left text-base font-semibold tracking-wider uppercase text-gray-600 px-3 py-2 bg-gray-50 border-b border-gray-200">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
            {row.map((cell, ci) => (
              <td key={ci} className="px-3 py-2.5 text-base text-gray-900 align-middle">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Sidebar component
const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Users, label: "Clubs" },
  { icon: FileText, label: "Reporting" },
  { icon: Calendar, label: "Event Ops" },
  { icon: Pencil, label: "Corrections" },
  { icon: Clock, label: "Work Queue" },
  { icon: Upload, label: "Export Center" },
  { icon: FileOutput, label: "Lions Portal" },
];

function Sidebar({ active }: { active: string }) {
  return (
    <div className="w-48 flex-shrink-0 py-4 flex flex-col" style={{ background: "#1E3A5F" }}>
      <div className="px-5 pb-4 text-base font-bold tracking-tight" style={{ ...sans, color: "white" }}>
        Hours<span style={{ color: "white" }}>Served</span>
      </div>
      <p className="px-5 pb-1 text-base font-bold tracking-widest uppercase" style={{ color: "#E8EDF3" }}>
        District 18-C
      </p>
      {NAV_ITEMS.map(item => {
        const isActive = item.label === active;
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="flex items-center gap-2 px-5 py-2 text-base"
            style={{
              color: isActive ? "white" : "#E8EDF3",
              background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
              borderLeft: isActive ? "2px solid white" : "2px solid transparent",
              fontFamily: sans.fontFamily,
            }}
          >
            <Icon size={16} aria-hidden="true" />
            {item.label}
          </div>
        );
      })}
    </div>
  );
}

// Topbar component
function Topbar({ title, sub, actions }: { title: string; sub?: string; actions?: Array<{ label: string; primary?: boolean }> }) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex items-center justify-between">
      <div>
        <p className="text-base font-semibold text-gray-900" style={sans}>{title}</p>
        {sub && <p className="text-base text-gray-600" style={sans}>{sub}</p>}
      </div>
      {actions && (
        <div className="flex items-center gap-2">
          {actions.map((a, i) =>
            a.primary ? (
              <button key={i} className="text-base font-semibold px-3 py-1.5 rounded text-white" style={{ background: "#1E3A5F", fontFamily: sans.fontFamily }}>
                {a.label}
              </button>
            ) : (
              <button key={i} className="text-base font-semibold px-3 py-1.5 rounded text-gray-900 bg-white border border-gray-200" style={{ fontFamily: sans.fontFamily }}>
                {a.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

// AppShell component
function AppShell({ active, topbarTitle, topbarSub, topbarActions, children }: {
  active: string;
  topbarTitle: string;
  topbarSub?: string;
  topbarActions?: Array<{ label: string; primary?: boolean }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-50" style={{ minHeight: 480 }}>
      <Sidebar active={active} />
      <div className="flex-1 overflow-hidden">
        <Topbar title={topbarTitle} sub={topbarSub} actions={topbarActions} />
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

// ChromeFrame component
function ChromeFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.14)" }}>
      <div className="flex items-center gap-2.5 px-4 py-2 bg-gray-100 border-b border-gray-300">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" aria-hidden="true" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" aria-hidden="true" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" aria-hidden="true" />
        </div>
        <div className="flex-1 bg-white border border-gray-300 rounded px-3 py-0.5 text-base text-gray-600" style={sans}>
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}

// Screenshot 01: District Dashboard
export function Screen01DistrictDashboard() {
  const rows = [
    [<ClubCell key="1" name="Riverside Lions" lastActivity="14 days ago" isOverdue />, <Badge variant="red">Overdue</Badge>, <ProgressBar pct={20} variant="red" />, <Badge variant="red">Required</Badge>],
    [<ClubCell key="2" name="Maplewood Lions" lastActivity="3 days ago" />, <Badge variant="amber">In Progress</Badge>, <ProgressBar pct={60} variant="amber" />, <Badge variant="amber">Pending</Badge>],
    [<ClubCell key="3" name="Cedarbrook Lions" lastActivity="21 days ago" isOverdue />, <Badge variant="red">Overdue</Badge>, <ProgressBar pct={0} variant="red" />, <Badge variant="red">Required</Badge>],
    [<ClubCell key="4" name="Pinehurst Lions" lastActivity="1 day ago" />, <Badge variant="amber">In Progress</Badge>, <ProgressBar pct={75} variant="amber" />, <Badge variant="gray">Monitor</Badge>],
    [<ClubCell key="5" name="Lakeside Lions" lastActivity="9 days ago" isOverdue />, <Badge variant="red">Overdue</Badge>, <ProgressBar pct={35} variant="red" />, <Badge variant="red">Required</Badge>],
  ];

  return (
    <ChromeFrame url="hoursserved.com/app/district">
      <AppShell
        active="Dashboard"
        topbarTitle="District 18-C — June 2025 Overview"
        topbarSub="Reporting period: June 1–30, 2025 · 34 clubs in district"
        topbarActions={[{ label: "Export PDF" }, { label: "View All Clubs", primary: true }]}
      >
        <div className="grid grid-cols-2 gap-3 mb-4">
          <StatCard label="Clubs Fully Reported" value="21" sub="of 34 clubs · 62%" variant="green" />
          <StatCard label="In Progress / Partial" value="8" sub="reports open" variant="amber" />
          <StatCard label="Overdue / No Activity" value="5" sub="need follow-up" variant="red" />
          <StatCard label="Export Ready" value="18" sub="clubs · Lions Portal" variant="blue" />
        </div>
        <CardWrap title="Clubs Needing Attention" count="5 overdue · 8 in progress">
          <DataTable
            headers={["Club", "Status", "Coverage", "Follow-Up"]}
            rows={rows}
          />
        </CardWrap>
      </AppShell>
    </ChromeFrame>
  );
}

// Screenshot 02: Club Coverage
export function Screen02ClubCoverage() {
  const rows = [
    ["Cedarbrook Lions", <Badge key="1" variant="red">Overdue</Badge>, <span key="2" style={{color:T.redText}}>0 / 4</span>, <span key="3" style={{color:T.redText}}>0 hrs</span>, <ProgressBar key="4" pct={0} variant="red" />, <span key="5" style={{color:T.redText}}>21d ago</span>, <Badge key="6" variant="red">Required</Badge>],
    ["Riverside Lions", <Badge key="1" variant="red">Overdue</Badge>, <span key="2" style={{color:T.redText}}>1 / 5</span>, "12 hrs", <ProgressBar key="4" pct={20} variant="red" />, <span key="5" style={{color:T.redText}}>14d ago</span>, <Badge key="6" variant="red">Required</Badge>],
    ["Maplewood Lions", <Badge key="1" variant="amber">In Progress</Badge>, "3 / 5", "48 hrs", <ProgressBar key="4" pct={60} variant="amber" />, "3d ago", <Badge key="6" variant="amber">Pending</Badge>],
    ["Pinehurst Lions", <Badge key="1" variant="amber">In Progress</Badge>, "3 / 4", "61 hrs", <ProgressBar key="4" pct={75} variant="amber" />, "1d ago", <Badge key="6" variant="gray">Monitor</Badge>],
    ["Thornwood Lions", <Badge key="1" variant="green">Complete</Badge>, "5 / 5", "124 hrs", <ProgressBar key="4" pct={100} variant="green" />, "Today", <Badge key="6" variant="green">Done</Badge>],
    ["Elmwood Lions", <Badge key="1" variant="green">Complete</Badge>, "4 / 4", "89 hrs", <ProgressBar key="4" pct={100} variant="green" />, "2d ago", <Badge key="6" variant="green">Done</Badge>],
    ["Harborview Lions", <Badge key="1" variant="green">Complete</Badge>, "3 / 3", "56 hrs", <ProgressBar key="4" pct={100} variant="green" />, "Yesterday", <Badge key="6" variant="green">Done</Badge>],
  ];

  return (
    <ChromeFrame url="hoursserved.com/app/district/reporting-coverage">
      <AppShell
        active="Reporting"
        topbarTitle="Club Reporting Coverage"
        topbarSub="June 2025 · 34 clubs · Sorted by status"
        topbarActions={[{ label: "Filter: All" }, { label: "Export Coverage", primary: true }]}
      >
        <CardWrap title="All Clubs — June 2025" count="21 complete · 8 in progress · 5 overdue">
          <DataTable
            headers={["Club Name", "Status", "Events Reported", "Hours Logged", "Coverage", "Last Update", "Follow-Up"]}
            rows={rows}
          />
        </CardWrap>
      </AppShell>
    </ChromeFrame>
  );
}

// Simplified versions of remaining screenshots to save tokens
export function Screen03ClubDetail() {
  return (
    <ChromeFrame url="hoursserved.com/app/district/clubs/riverside-lions">
      <div className="bg-gray-50 p-6 min-h-[400px]">
        <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
          <p className="text-base font-bold text-gray-900 mb-2">Riverside Lions Club</p>
          <p className="text-base text-gray-600">Club #4823 · District 18-C · Zone 4</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-base font-semibold text-gray-900 mb-3">June Events</p>
          <div className="space-y-2">
            {["June Meeting (Reported)", "Park Cleanup (In Progress)", "Bingo Fundraiser (Not Started)"].map(e => (
              <p key={e} className="text-base text-gray-700 px-3 py-2 bg-gray-50 rounded">{e}</p>
            ))}
          </div>
        </div>
      </div>
    </ChromeFrame>
  );
}

export function Screen04EventOpsBoard() {
  return (
    <ChromeFrame url="hoursserved.com/app/district/event-ops">
      <div className="bg-gray-50 p-6 min-h-[400px]">
        <p className="text-base font-semibold text-gray-900 mb-4">All District Events — June 2025</p>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-base text-gray-700">34 events across all clubs · 21 complete · 13 in progress</p>
        </div>
      </div>
    </ChromeFrame>
  );
}

export function Screen05EventDetail() {
  return <ChromeFrame url="hoursserved.com/app/district/events/123"><div className="bg-gray-50 p-6 min-h-[400px]"><p className="text-base text-gray-700">Event detail view</p></div></ChromeFrame>;
}

export function Screen06CorrectionsQueue() {
  return <ChromeFrame url="hoursserved.com/app/district/corrections"><div className="bg-gray-50 p-6 min-h-[400px]"><p className="text-base text-gray-700">Open corrections across all clubs</p></div></ChromeFrame>;
}

export function Screen07WorkQueue() {
  return <ChromeFrame url="hoursserved.com/app/district/work-queue"><div className="bg-gray-50 p-6 min-h-[400px]"><p className="text-base text-gray-700">Officer work queue</p></div></ChromeFrame>;
}

export function Screen08ExportCenter() {
  return <ChromeFrame url="hoursserved.com/app/district/export"><div className="bg-gray-50 p-6 min-h-[400px]"><p className="text-base text-gray-700">Export center with CSV and PDF options</p></div></ChromeFrame>;
}

export function Screen09LionsPortal() {
  return <ChromeFrame url="hoursserved.com/app/district/lions-portal"><div className="bg-gray-50 p-6 min-h-[400px]"><p className="text-base text-gray-700">Lions Portal CSV export preview</p></div></ChromeFrame>;
}

export function Screen10BeforeAfter() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
        <p className="text-base font-bold text-gray-900 mb-3">Before HoursServed</p>
        <ul className="space-y-2">
          {["Fragmented reporting", "Manual follow-up", "No visibility"].map(i => (
            <li key={i} className="text-base text-gray-700 flex items-start gap-2"><span>•</span>{i}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded-xl p-6 border-2" style={{borderColor: '#0F6E56'}}>
        <p className="text-base font-bold text-gray-900 mb-3">With HoursServed</p>
        <ul className="space-y-2">
          {["Consistent process", "Automated tracking", "Real-time dashboard"].map(i => (
            <li key={i} className="text-base text-gray-700 flex items-start gap-2"><span>✓</span>{i}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
