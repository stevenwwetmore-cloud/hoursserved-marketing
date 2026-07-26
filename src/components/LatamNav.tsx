import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';

const SOLUCIONES = [
  { label: 'Clubes de Lions', href: '/es/solutions/service-clubs', desc: 'Gestiona reuniones, servicio, cuotas y reportes con menos fricción administrativa.' },
  { label: 'Ver Todas las Soluciones', href: '/es/solutions', divider: true },
];

const RECURSOS = [
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contacto', href: '/es/contact' },
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
        className="flex items-center gap-1 text-base text-white hover:text-white/90 px-3 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-brand-navy rounded"
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
                className="block px-4 py-2.5 hover:bg-gray-50 hover:text-[#1E3A5F] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded"
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
        className="flex items-center justify-between w-full py-2.5 text-base text-white font-medium focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
        aria-expanded={isOpen}
      >
        {label}
      </button>
      {isOpen && (
        <div className="pl-3 pb-1 space-y-0.5 border-l-2 border-white/20 ml-1">
          {items.map(({ label: l, href, divider }: any) => (
            <React.Fragment key={href}>
              {divider && <div className="border-t border-white/20 my-1" />}
              <a href={href} className="block py-2 text-base text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded">{l}</a>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LatamNav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const toggleMobileSection = (key: string) => setMobileExpanded(prev => prev === key ? null : key);

  return (
    <nav className="sticky top-0 z-40 bg-brand-navy border-b border-brand-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/es" className="flex items-center gap-2 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-brand-navy rounded">
          <img src="/images/logo.png" alt="Hours Served" className="w-7 h-7 rounded-lg" />
          <span className="text-white font-bold text-xl">HoursServed</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <a
            href="/es/how-it-works"
            className="text-base text-white hover:text-white/90 px-3 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-brand-navy rounded"
          >
            Cómo Funciona
          </a>
          <Dropdown
            label="Soluciones"
            items={SOLUCIONES}
            isOpen={openMenu === 'soluciones'}
            onToggle={(v: boolean) => setOpenMenu(v ? 'soluciones' : null)}
            wide
          />
          <a
            href="/pricing"
            className="text-base text-white hover:text-white/90 px-3 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-brand-navy rounded"
          >
            Precios
          </a>
          <Dropdown
            label="Recursos"
            items={RECURSOS}
            isOpen={openMenu === 'recursos'}
            onToggle={(v: boolean) => setOpenMenu(v ? 'recursos' : null)}
          />
        </div>

        {/* Desktop utility */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/login" className="text-base text-white hover:text-white/90 px-3 py-2 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-brand-navy rounded">Iniciar Sesión</a>
          <a href="/demo" className="bg-brand-teal-dark text-white text-base font-semibold px-4 py-2 rounded-lg hover:bg-brand-teal transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-brand-navy">Solicitar una Demo</a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-navy border-t border-brand-navy px-4 py-4 space-y-1">
          <a href="/es/how-it-works" className="block py-2.5 text-base text-white font-medium focus:outline-none focus:ring-2 focus:ring-white/50 rounded">Cómo Funciona</a>
          <MobileSection label="Soluciones" items={SOLUCIONES} isOpen={mobileExpanded === 'soluciones'} onToggle={() => toggleMobileSection('soluciones')} />
          <a href="/pricing" className="block py-2.5 text-base text-white font-medium focus:outline-none focus:ring-2 focus:ring-white/50 rounded">Precios</a>
          <MobileSection label="Recursos" items={RECURSOS} isOpen={mobileExpanded === 'recursos'} onToggle={() => toggleMobileSection('recursos')} />
          <div className="pt-3 border-t border-white/20 flex flex-col gap-2">
            <a href="/login" className="text-center py-2.5 text-base font-bold text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50">Iniciar Sesión</a>
            <a href="/demo" className="text-center py-2.5 text-base font-semibold text-white bg-brand-teal-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50">Solicitar una Demo</a>
          </div>
        </div>
      )}
    </nav>
  );
}
