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

// QueueItem component
const ICON_BOX_STYLES: Record<string, { border: string; color: string }> = {
  [T.redL]: { border: "#b91c1c", color: "#b91c1c" },
  [T.amberL]: { border: "#b45309", color: "#92400e" },
  [T.greenL]: { border: "#15803d", color: "#166534" },
  default: { border: "#9ca3af", color: "#374151" },
};

const ICON_COMPONENTS: Record<string, any> = {
  "⚠️": TriangleAlert,
  "✏️": Pencil,
  "📋": ClipboardList,
  "✅": CircleCheck,
  "📞": Phone,
  "💬": MessageSquare,
};

function QueueItem({ icon, iconBg, title, sub, badge, badgeVariant, age }: { icon: string; iconBg: string; title: string; sub?: string; badge?: string; badgeVariant?: string; age?: string }) {
  const iconStyle = ICON_BOX_STYLES[iconBg] ?? ICON_BOX_STYLES.default;
  const IconComponent = ICON_COMPONENTS[icon];
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3.5 py-3 mb-2 flex items-start gap-3">
      <div
        className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
        style={{ background: "#FFFFFF", border: `1px solid ${iconStyle.border}`, color: iconStyle.color }}
      >
        {IconComponent ? <IconComponent size={16} aria-hidden="true" /> : icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-base font-semibold text-gray-900 leading-normal">{title}</p>
        {sub && <p className="text-base text-gray-600 mt-0.5 leading-normal">{sub}</p>}
      </div>
      {(badge || age) && (
        <div className="text-right flex-shrink-0">
          {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
          {age && <p className="text-base text-gray-600 mt-1">{age}</p>}
        </div>
      )}
    </div>
  );
}

// FieldRow component
function FieldRow({ field, value, status, isHeader }: { field: string; value: string; status?: string; isHeader?: boolean }) {
  if (isHeader) {
    return (
      <div className="flex items-center px-3 py-2 gap-3 bg-gray-50">
        <span className="flex-1 text-base font-bold tracking-wider uppercase text-gray-600">{field}</span>
        <span className="flex-1 text-base font-bold tracking-wider uppercase text-gray-600 font-mono">{value}</span>
        <span className="flex-shrink-0 text-base font-bold tracking-wider uppercase text-gray-600">{status}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center px-3 py-2 gap-3 border-b border-gray-100 last:border-0">
      <span className="flex-1 text-base font-medium text-gray-900">{field}</span>
      <span className="flex-1 text-base text-gray-600 font-mono">{value}</span>
      <span className="flex-shrink-0"><Badge variant="green">OK</Badge></span>
    </div>
  );
}

// SectionLabel component
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base font-bold tracking-widest uppercase text-gray-600 mt-1 mb-2">{children}</p>
  );
}

// ShotBlock component
function ShotBlock({ num, title, placement, children }: { num: string; title: string; placement: string; children: React.ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto mb-16">
      <div className="mb-3">
        <span className="inline-block text-base font-bold tracking-widest uppercase px-2.5 py-0.5 rounded mb-1" style={{ background: "#e8f0fd", color: "#1E3A5F" }}>
          {num}
        </span>
        <p className="text-base font-semibold text-gray-900">{title}</p>
        <p className="text-base text-gray-600 mt-0.5">{placement}</p>
      </div>
      {children}
    </div>
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

export function Screen03ClubDetail() {
  const eventRows = [
    ["June Meeting", <Badge key="1" variant="blue">Meeting</Badge>, <Badge key="2" variant="green">Reported</Badge>, "2 hrs"],
    ["Park Cleanup", <Badge key="1" variant="blue">Service</Badge>, <Badge key="2" variant="amber">In Progress</Badge>, "10 hrs"],
    ["Bingo Fundraiser", <Badge key="1" variant="gray">Fundraiser</Badge>, <Badge key="2" variant="red">Not Started</Badge>, "—"],
    ["BBQ Lunch", <Badge key="1" variant="gray">Fundraiser</Badge>, <Badge key="2" variant="red">Not Started</Badge>, "—"],
    ["Eyeglass Collection", <Badge key="1" variant="blue">Service</Badge>, <Badge key="2" variant="red">Not Started</Badge>, "—"],
  ];

  return (
    <ChromeFrame url="hoursserved.com/app/district/clubs/riverside-lions">
      <AppShell
        active="Clubs"
        topbarTitle="Riverside Lions Club"
        topbarSub="Club #4823 · District 18-C · Zone 4"
        topbarActions={[{ label: "← All Clubs" }, { label: "Add Follow-Up Note", primary: true }]}
      >
        <div className="bg-white border border-gray-200 rounded-lg px-5 py-4 mb-3 flex items-center justify-between">
          <div>
            <p className="text-base font-bold text-gray-900">Riverside Lions Club</p>
            <p className="text-base text-gray-600 mt-0.5">32 members · President: Lion Margaret H. · Secretary: Lion David K.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="red">Overdue</Badge>
            <Badge variant="amber">3 open corrections</Badge>
            <Badge variant="gray">14 days no activity</Badge>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <CardWrap title="June Reporting Status">
            <DataTable headers={["Event", "Type", "Status", "Hours"]} rows={eventRows} />
          </CardWrap>
          <CardWrap title="Open Issues">
            <div className="p-2">
              <QueueItem icon="⚠️" iconBg={T.redL} title="Bingo Fundraiser — no hours entered" sub="Event passed June 8 · no data submitted" badge="Blocked" badgeVariant="red" />
              <QueueItem icon="✏️" iconBg={T.amberL} title="Park Cleanup — attendance count mismatch" sub="Sign-in: 11 members · Report: 8 members" badge="Correction" badgeVariant="amber" />
              <QueueItem icon="📋" iconBg={T.redL} title="Monthly report not approved" sub="Awaiting president sign-off since June 14" badge="Overdue" badgeVariant="red" />
            </div>
          </CardWrap>
        </div>
      </AppShell>
    </ChromeFrame>
  );
}

export function Screen04EventOpsBoard() {
  const rows = [
    ["June Regular Meeting", "Thornwood Lions", <Badge key="1" variant="blue">Meeting</Badge>, "Jun 4", "18/28", "22", <span key="2" style={{color: T.green}}>0</span>, <Badge key="3" variant="green">Ready</Badge>],
    ["Bingo Fundraiser", "Riverside Lions", <Badge key="1" variant="gray">Fundraiser</Badge>, "Jun 8", "—", "—", <span key="2" style={{color: T.redText}}>3</span>, <Badge key="3" variant="red">Blocked</Badge>],
    ["Park Cleanup Day", "Maplewood Lions", <Badge key="1" variant="blue">Service</Badge>, "Jun 12", "14/14", "14", <span key="2" style={{color: T.amber}}>1</span>, <Badge key="3" variant="amber">Review</Badge>],
    ["Eyeglass Collection", "Pinehurst Lions", <Badge key="1" variant="blue">Service</Badge>, "Jun 15", "9/12", "11", <span key="2" style={{color: T.green}}>0</span>, <Badge key="3" variant="green">Ready</Badge>],
    ["Dinner Gala", "Elmwood Lions", <Badge key="1" variant="gray">Fundraiser</Badge>, "Jun 19", "62/80", "74", <span key="2" style={{color: T.green}}>0</span>, <Badge key="3" variant="green">Ready</Badge>],
    ["Board Meeting", "Cedarbrook Lions", <Badge key="1" variant="blue">Meeting</Badge>, "Jun 21", "—", "—", <span key="2" style={{color: T.redText}}>4</span>, <Badge key="3" variant="red">Blocked</Badge>],
    ["Youth Camp Service", "Harborview Lions", <Badge key="1" variant="blue">Service</Badge>, "Jun 24", "8/8", "8", <span key="2" style={{color: T.green}}>0</span>, <Badge key="3" variant="green">Ready</Badge>],
  ];

  return (
    <ChromeFrame url="hoursserved.com/app/district/event-operations">
      <AppShell
        active="Event Ops"
        topbarTitle="Event Operations Board"
        topbarSub="June 2025 · All event types · All 34 clubs"
        topbarActions={[{ label: "Filter: All Types" }, { label: "All Clubs" }]}
      >
        <CardWrap title="District Events — June 2025" count="47 events across 34 clubs">
          <DataTable
            headers={["Event", "Club", "Type", "Date", "RSVPs", "Attendance", "Corrections", "Readiness"]}
            rows={rows}
          />
        </CardWrap>
      </AppShell>
    </ChromeFrame>
  );
}

export function Screen05EventDetail() {
  const checklistRows = [
    ["Event created and published", <Badge key="1" variant="green">Done</Badge>],
    ["Attendance recorded", <Badge key="1" variant="red">✗ Missing</Badge>],
    ["Service hours entered", <Badge key="1" variant="red">✗ Missing</Badge>],
    ["Corrections resolved", <Badge key="1" variant="red">✗ 3 open</Badge>],
    ["Officer approval", <Badge key="1" variant="red">✗ Pending</Badge>],
    ["Ready for Lions Portal", <Badge key="1" variant="red">✗ Blocked</Badge>],
  ];

  return (
    <ChromeFrame url="hoursserved.com/app/district/events/bingo-fundraiser-riverside">
      <AppShell
        active="Event Ops"
        topbarTitle="Bingo Fundraiser — Riverside Lions"
        topbarSub="June 8, 2025 · Fundraiser · Event #7841"
        topbarActions={[{ label: "← Event Board" }, { label: "Flag for Follow-Up", primary: true }]}
      >
        <div className="grid grid-cols-2 gap-3 mb-3">
          <StatCard label="RSVPs" value="—" sub="Not collected" variant="red" />
          <StatCard label="Attendance" value="—" sub="Not entered" variant="red" />
          <StatCard label="Service Hours" value="0" sub="No data submitted" variant="red" />
          <StatCard label="Corrections" value="3" sub="Blocking readiness" variant="red" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <CardWrap title="Readiness Checklist">
            <DataTable headers={["Requirement", "Status"]} rows={checklistRows} />
          </CardWrap>
          <CardWrap title="Open Corrections">
            <div className="p-2">
              <QueueItem icon="⚠️" iconBg={T.redL} title="No attendance data" sub="Event passed June 8 · field empty" badge="Critical" badgeVariant="red" />
              <QueueItem icon="⚠️" iconBg={T.redL} title="Service hours = 0" sub="Fundraiser logged zero volunteer hours" badge="Critical" badgeVariant="red" />
              <QueueItem icon="✏️" iconBg={T.amberL} title="Event category unconfirmed" sub='Logged as "Other" — needs classification' badge="Minor" badgeVariant="amber" />
            </div>
          </CardWrap>
        </div>
      </AppShell>
    </ChromeFrame>
  );
}

export function Screen06CorrectionsQueue() {
  const rows = [
    ["No attendance data entered", "Riverside Lions", "Bingo Fundraiser", <Badge key="1" variant="gray">Attendance</Badge>, <Badge key="2" variant="red">Critical</Badge>, <span key="3" style={{color: T.redText}}>8 days</span>],
    ["Service hours = 0", "Riverside Lions", "Bingo Fundraiser", <Badge key="1" variant="gray">Hours</Badge>, <Badge key="2" variant="red">Critical</Badge>, <span key="3" style={{color: T.redText}}>8 days</span>],
    ["No reporting data at all", "Cedarbrook Lions", "Board Meeting", <Badge key="1" variant="gray">Report</Badge>, <Badge key="2" variant="red">Critical</Badge>, <span key="3" style={{color: T.redText}}>15 days</span>],
    ["Attendance count mismatch", "Maplewood Lions", "Park Cleanup", <Badge key="1" variant="gray">Attendance</Badge>, <Badge key="2" variant="amber">Minor</Badge>, "3 days"],
    ["Event category unconfirmed", "Riverside Lions", "Bingo Fundraiser", <Badge key="1" variant="gray">Category</Badge>, <Badge key="2" variant="amber">Minor</Badge>, "8 days"],
    ["Missing officer approval", "Lakeside Lions", "June Meeting", <Badge key="1" variant="gray">Approval</Badge>, <Badge key="2" variant="red">Critical</Badge>, <span key="3" style={{color: T.redText}}>6 days</span>],
    ["Duplicate service entry", "Pinehurst Lions", "Eyeglass Collection", <Badge key="1" variant="gray">Hours</Badge>, <Badge key="2" variant="amber">Minor</Badge>, "2 days"],
  ];

  return (
    <ChromeFrame url="hoursserved.com/app/district/corrections">
      <AppShell
        active="Corrections"
        topbarTitle="Corrections Queue"
        topbarSub="June 2025 · 14 open corrections across 6 clubs"
        topbarActions={[{ label: "Filter: Critical" }, { label: "Export Corrections", primary: true }]}
      >
        <div className="grid grid-cols-3 gap-3 mb-4">
          <StatCard label="Critical (Blocking)" value="7" sub="blocks Lions Portal export" variant="red" />
          <StatCard label="Minor (Review)" value="7" sub="data inconsistencies" variant="amber" />
          <StatCard label="Resolved This Week" value="11" sub="corrections closed" variant="green" />
        </div>
        <CardWrap title="Open Corrections — Sorted by Severity">
          <DataTable
            headers={["Issue", "Club", "Event", "Type", "Severity", "Age"]}
            rows={rows}
          />
        </CardWrap>
      </AppShell>
    </ChromeFrame>
  );
}

export function Screen07WorkQueue() {
  return (
    <ChromeFrame url="hoursserved.com/app/district/work-queue">
      <AppShell
        active="Work Queue"
        topbarTitle="Officer Work Queue"
        topbarSub="9 items need action · 3 approvals pending · 6 follow-ups"
        topbarActions={[{ label: "Filter: All" }]}
      >
        <SectionLabel>Approvals Required</SectionLabel>
        <QueueItem icon="✅" iconBg={T.redL} title="June Report — Riverside Lions" sub="Awaiting district secretary approval · submitted June 14" badge="Overdue" badgeVariant="red" age="8 days" />
        <QueueItem icon="✅" iconBg={T.amberL} title="June Report — Lakeside Lions" sub="Awaiting district secretary approval · submitted June 18" badge="Pending" badgeVariant="amber" age="4 days" />
        <QueueItem icon="✅" iconBg={T.amberL} title="June Report — Maplewood Lions" sub="Submitted today — ready for district review" badge="New" badgeVariant="amber" age="Today" />
        <SectionLabel>Club Follow-Up Items</SectionLabel>
        <QueueItem icon="📞" iconBg={T.redL} title="Contact Cedarbrook — no activity in 21 days" sub="No events, no report, no login recorded" badge="Urgent" badgeVariant="red" />
        <QueueItem icon="📞" iconBg={T.redL} title="Riverside Lions — 3 unresolved corrections" sub="Bingo Fundraiser corrections open 8 days" badge="Urgent" badgeVariant="red" />
        <QueueItem icon="💬" iconBg={T.amberL} title="Pinehurst Lions — duplicate hours entry" sub="Eyeglass Collection · needs officer confirmation" badge="Review" badgeVariant="amber" />
      </AppShell>
    </ChromeFrame>
  );
}

export function Screen08ExportCenter() {
  const rows = [
    ["Thornwood Lions", "5 / 5", "124 hrs", <span key="1" style={{color: T.green}}>0</span>, <Badge key="2" variant="green">Approved</Badge>, <Badge key="3" variant="green">Ready</Badge>, <button key="4" className="text-base font-semibold px-2.5 py-1 rounded text-white" style={{background: T.blue}}>Export CSV</button>],
    ["Elmwood Lions", "4 / 4", "89 hrs", <span key="1" style={{color: T.green}}>0</span>, <Badge key="2" variant="green">Approved</Badge>, <Badge key="3" variant="green">Ready</Badge>, <button key="4" className="text-base font-semibold px-2.5 py-1 rounded text-white" style={{background: T.blue}}>Export CSV</button>],
    ["Harborview Lions", "3 / 3", "56 hrs", <span key="1" style={{color: T.green}}>0</span>, <Badge key="2" variant="green">Approved</Badge>, <Badge key="3" variant="green">Ready</Badge>, <button key="4" className="text-base font-semibold px-2.5 py-1 rounded text-white" style={{background: T.blue}}>Export CSV</button>],
    ["Maplewood Lions", "3 / 5", "48 hrs", <span key="1" style={{color: T.amber}}>1</span>, <Badge key="2" variant="amber">Pending</Badge>, <Badge key="3" variant="amber">Partial</Badge>, <button key="4" className="text-base font-semibold px-2.5 py-1 rounded border border-gray-200 text-gray-900">Review</button>],
    ["Pinehurst Lions", "3 / 4", "61 hrs", <span key="1" style={{color: T.amber}}>1</span>, <Badge key="2" variant="green">Approved</Badge>, <Badge key="3" variant="amber">Review</Badge>, <button key="4" className="text-base font-semibold px-2.5 py-1 rounded border border-gray-200 text-gray-900">Review</button>],
    ["Riverside Lions", "1 / 5", "12 hrs", <span key="1" style={{color: T.redText}}>3</span>, <Badge key="2" variant="red">Missing</Badge>, <Badge key="3" variant="red">Blocked</Badge>, <button key="4" className="text-base font-semibold px-2.5 py-1 rounded border text-red-700" style={{borderColor: T.red}}>Fix Issues</button>],
    ["Cedarbrook Lions", "0 / 4", "0 hrs", <span key="1" style={{color: T.redText}}>4</span>, <Badge key="2" variant="red">Missing</Badge>, <Badge key="3" variant="red">Blocked</Badge>, <button key="4" className="text-base font-semibold px-2.5 py-1 rounded border text-red-700" style={{borderColor: T.red}}>Fix Issues</button>],
  ];

  return (
    <ChromeFrame url="hoursserved.com/app/district/export-center">
      <AppShell
        active="Export Center"
        topbarTitle="Export Center"
        topbarSub="June 2025 · Lions Portal CSV preparation · District 18-C"
        topbarActions={[{ label: "Preview Ready" }, { label: "Export All Ready", primary: true }]}
      >
        <div className="grid grid-cols-3 gap-3 mb-4">
          <StatCard label="Export Ready" value="18" sub="clubs · 21 events · 1,847 hrs" variant="green" />
          <StatCard label="Awaiting Data" value="11" sub="clubs pending completion" variant="amber" />
          <StatCard label="Blocked" value="5" sub="clubs · active corrections" variant="red" />
        </div>
        <CardWrap title="Club Export Readiness" count="34 clubs">
          <DataTable
            headers={["Club", "Events Ready", "Total Hours", "Corrections", "Approval", "Export Status", <span key="h7" className="sr-only">Actions</span>]}
            rows={rows}
          />
        </CardWrap>
      </AppShell>
    </ChromeFrame>
  );
}

export function Screen09LionsPortal() {
  const fields = [
    { field: "Club Number", value: "4391" },
    { field: "Reporting Month", value: "June 2025" },
    { field: "Activity Name", value: "June Regular Meeting" },
    { field: "Activity Type", value: "Club Meeting" },
    { field: "Activity Date", value: "2025-06-04" },
    { field: "Volunteer Count", value: "22" },
    { field: "Service Hours", value: "44.0" },
    { field: "Beneficiaries", value: "0" },
    { field: "LCIF Donation", value: "$0.00" },
  ];

  const summaryRows = [
    ["Events included", <strong key="1">5</strong>],
    ["Total rows in CSV", <strong key="2">5</strong>],
    ["Total volunteer hours", <strong key="3">124.0 hrs</strong>],
    ["Unique volunteers", <strong key="4">28</strong>],
    ["Fields with issues", <strong key="5" style={{color: T.green}}>0</strong>],
    ["Ready for Lions Portal", <Badge key="6" variant="green">Yes</Badge>],
  ];

  return (
    <ChromeFrame url="hoursserved.com/app/district/lions-portal-report">
      <AppShell
        active="Lions Portal"
        topbarTitle="Lions Portal Report Preview"
        topbarSub="Thornwood Lions · June 2025 · Field alignment check"
        topbarActions={[{ label: "← Export Center" }, { label: "Download CSV", primary: true }]}
      >
        <div className="grid grid-cols-2 gap-3">
          <CardWrap title="Field Alignment — Thornwood Lions" count={<Badge variant="green">All fields aligned</Badge>}>
            <FieldRow field="LIONS PORTAL FIELD" value="HOURSSERVED VALUE" status="STATUS" isHeader />
            {fields.map((f, i) => <FieldRow key={i} field={f.field} value={f.value} />)}
          </CardWrap>
          <div className="flex flex-col gap-3">
            <CardWrap title="Export Summary">
              <DataTable headers={["Item", "Value"]} rows={summaryRows} />
            </CardWrap>
            <div className="rounded-lg p-4 border border-gray-200 bg-white">
              <p className="text-base font-semibold mb-1" style={{color: T.green}}>All clear — ready to submit</p>
              <p className="text-base leading-relaxed text-gray-900">
                All required Lions Portal fields are populated and aligned. Download the CSV and upload directly to the Lions Portal activity reporting module.
              </p>
            </div>
          </div>
        </div>
      </AppShell>
    </ChromeFrame>
  );
}

export function Screen10BeforeAfter() {
  const before = [
    "District secretary emails clubs one at a time to ask for reporting status",
    "No visibility into which clubs have corrections open or how old they are",
    "Follow-up based on who responds — overdue clubs stay invisible",
    "Month-end reporting compiled manually from email replies and spreadsheets",
    "Lions Portal CSV built by hand, field by field, from scattered sources",
    "District governor doesn't know which clubs need coaching until it's too late",
    "Corrections discovered at submission — too late to fix without delays",
  ];

  const after = [
    "District dashboard shows all 34 clubs — complete, in progress, blocked — at a glance",
    "Corrections queue shows every open issue, sorted by severity and age",
    "Follow-up is targeted: district officers see exactly which clubs need attention first",
    "Month-end reporting is a review, not a rebuild — data already in the system",
    "Lions Portal CSV generated from aligned fields in one click, per club",
    "Club Detail gives district reviewers real activity context before any coaching call",
    "Corrections resolved before submission — no month-end surprises",
  ];

  return (
    <ChromeFrame url="hoursserved.com/solutions/districts">
      <div className="bg-white" style={sans}>
        <div className="px-6 py-4 border-b border-gray-200 text-center">
          <p className="text-base font-semibold text-gray-900">Before and After District Review Becomes Structured</p>
          <p className="text-base text-gray-600 mt-1">HoursServed replaces scattered follow-up with visible club status, correction tracking, and clearer reporting readiness.</p>
        </div>
        <div className="grid grid-cols-2">
          <div className="p-5 border-r border-gray-200" style={{background: "#fef2f2"}}>
            <p className="text-base font-bold tracking-widest uppercase mb-4" style={{color: T.red}}>Without HoursServed</p>
            {before.map((item, i) => (
              <div key={i} className="flex items-start gap-2 mb-2.5 text-base text-gray-900 leading-normal">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{background: T.red}} aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
          <div className="p-5 bg-white">
            <p className="text-base font-bold tracking-widest uppercase mb-4" style={{color: T.green}}>With HoursServed</p>
            {after.map((item, i) => (
              <div key={i} className="flex items-start gap-2 mb-2.5 text-base text-gray-900 leading-normal">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{background: T.green}} aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-3.5 flex items-center justify-between" style={{background: T.blue}}>
          <p className="text-base" style={{color: "rgba(255,255,255,0.9)", fontFamily: sans.fontFamily}}>
            District 18-C reduced month-end cleanup from 3 days to under 4 hours.
          </p>
          <button className="text-base font-bold px-4 py-1.5 rounded" style={{background: "white", color: T.blue, fontFamily: sans.fontFamily}}>
            See District Features →
          </button>
        </div>
      </div>
    </ChromeFrame>
  );
}
