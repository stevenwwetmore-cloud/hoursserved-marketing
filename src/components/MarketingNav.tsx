import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';

const SOLUTIONS = [
  { label: 'Lions Clubs', href: '/solutions/service-clubs', desc: 'Run meetings, service, dues, and reporting with less admin friction.' },
  { label: 'Districts', href: '/solutions/districts', desc: 'Standardize meetings, attendance, service hours, and reporting across clubs without adding more admin work for officers.' },
  { label: 'Officer Transition', href: '/solutions/officer-transition', desc: 'Transfer tasks, files, knowledge, and training without losing momentum each year.' },
  { label: 'Volunteer Growth', href: '/solutions/volunteer-growth', desc: 'Turn guests and volunteers into returning contributors and future members.' },
  { label: 'Service Reporting', href: '/solutions/service-reporting', desc: 'Capture service activity cleanly and prepare Lions-ready reporting faster.' },
  { label: 'Meetings & Events', href: '/solutions/meetings-events', desc: 'Plan agendas, attendance, service projects, shifts, and follow-up in one workflow.' },
  { label: 'Churches & Ministries', href: '/solutions/churches', desc: 'Track volunteer hours and service activity for faith-based organizations.' },
  { label: 'Community Groups', href: '/solutions/community-groups', desc: 'Hour tracking and reporting for civic and community organizations.' },
  { label: 'Parent Councils & Boosters', href: '/solutions/parent-councils-booster-groups-youth-sports', desc: 'Manage volunteers and service hours for school and youth organizations.' },
  { label: 'See All Solutions', href: '/solutions', divider: true },
  { label: '🌎 América Latina', href: '/es', desc: 'Para Clubes de Lions en LATAM' },
];

const COMPARE = [
  { label: 'ClubRunner', href: '/compare/clubrunner' },
  { label: 'LionsBase', href: '/compare/lionsbase' },
  { label: 'Lions Portal', href: '/compare/lions-portal' },
  { label: 'SignUpGenius', href: '/compare/signupgenius' },
  { label: 'Track It Forward', href: '/compare/track-it-forward' },
  { label: 'Unison', href: '/compare/unison' },
  { label: 'See All Comparisons', href: '/compare', divider: true },
];

const RESOURCES = [
  { label: 'Guides', href: '/guide', icon: BookOpen },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

function Dropdown({ label, items, isOpen, onToggle, wide }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onToggle(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => onToggle(!isOpen)}
        className="flex items-center gap-1 text-base text-white hover:text-white/90 px-3 py-2 font-medium transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
      </button>
      {isOpen && (
        <div className={`absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-50 ${wide ? 'min-w-80' : 'min-w-52'}`}>
          {items.map(({ label: l, href, desc, divider, icon: Icon }: any) => (
            <React.Fragment key={href}>
              {divider && <div className="border-t border-gray-100 my-1" />}
              <a
                href={href}
                onClick={() => onToggle(false)}
                className="block px-4 py-2.5 hover:bg-gray-50 hover:text-[#1E3A5F] transition-colors"
              >
                <span className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                  {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#0F6E56' }} />}
                  {l}
                </span>
                {desc && <p className="text-base text-gray-600 mt-0.5 leading-snug">{desc}</p>}
              </a>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileSection({ label, items, isOpen, onToggle }: any) {
  return (
    <div>
      <button
        onClick={() => onToggle(!isOpen)}
        className="flex items-center justify-between w-full py-2.5 text-base text-white font-medium"
        aria-expanded={isOpen}
      >
        {label}
      </button>
      {isOpen && (
        <div className="pl-3 pb-1 space-y-0.5 border-l-2 border-white/20 ml-1">
          {items.map(({ label: l, href, divider }: any) => (
            <React.Fragment key={href}>
              {divider && <div className="border-t border-white/20 my-1" />}
              <a href={href} className="block py-2 text-base text-white/80 hover:text-white transition-colors">{l}</a>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MarketingNav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const toggleMobileSection = (key: string) => setMobileExpanded(prev => prev === key ? null : key);

  return (
    <nav className="sticky top-0 z-40 bg-brand-navy border-b border-brand-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 flex-shrink-0">
          <img src="https://media.base44.com/images/public/69ac4eaa5a3031dffe252cf9/57f99d8a4_Gemini_Generated_Service_Hours.png" alt="Hours Served" className="w-7 h-7 rounded-lg" />
          <BrandLogo dark />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <a
            href="/how-it-works"
            className="text-base text-white hover:text-white/90 px-3 py-2 font-medium transition-colors"
          >
            How It Works
          </a>
          <Dropdown
            label="Solutions"
            items={SOLUTIONS}
            isOpen={openMenu === 'solutions'}
            onToggle={(v: boolean) => setOpenMenu(v ? 'solutions' : null)}
            wide
          />
          <Dropdown
            label="Compare"
            items={COMPARE}
            isOpen={openMenu === 'compare'}
            onToggle={(v: boolean) => setOpenMenu(v ? 'compare' : null)}
          />
          <a
            href="/pricing"
            className="text-base text-white hover:text-white/90 px-3 py-2 font-medium transition-colors"
          >
            Pricing
          </a>
          <Dropdown
            label="Resources"
            items={RESOURCES}
            isOpen={openMenu === 'resources'}
            onToggle={(v: boolean) => setOpenMenu(v ? 'resources' : null)}
          />
        </div>

        {/* Desktop utility */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/login" className="text-base text-white hover:text-white/90 px-3 py-2 font-bold transition-colors">Login</a>
          <a href="/demo" className="bg-brand-teal-dark text-white text-base font-semibold px-4 py-2 rounded-lg hover:bg-brand-teal transition-colors">Book a Demo</a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-navy border-t border-brand-navy px-4 py-4 space-y-1">
          <a href="/how-it-works" className="block py-2.5 text-base text-white font-medium">How It Works</a>
          <MobileSection label="Solutions" items={SOLUTIONS} isOpen={mobileExpanded === 'solutions'} onToggle={() => toggleMobileSection('solutions')} />
          <MobileSection label="Compare" items={COMPARE} isOpen={mobileExpanded === 'compare'} onToggle={() => toggleMobileSection('compare')} />
          <a href="/pricing" className="block py-2.5 text-base text-white font-medium">Pricing</a>
          <MobileSection label="Resources" items={RESOURCES} isOpen={mobileExpanded === 'resources'} onToggle={() => toggleMobileSection('resources')} />
          <div className="pt-3 border-t border-white/20 flex flex-col gap-2">
            <a href="/login" className="text-center py-2.5 text-base font-bold text-white border border-white/30 rounded-lg">Login</a>
            <a href="/demo" className="text-center py-2.5 text-base font-semibold text-white bg-brand-teal-dark rounded-lg">Book a Demo</a>
          </div>
        </div>
      )}
    </nav>
  );
}
