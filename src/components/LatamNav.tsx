import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';
import TopBenefitsHero from './TopBenefitsHero';

export default function LatamNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
    <nav className="sticky top-0 z-40 bg-brand-navy border-b border-brand-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/es/" className="flex items-center gap-2 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-brand-navy rounded">
          <BrandLogo dark />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <a
            href="/es/como-funciona/"
            className="text-base text-white hover:text-white/90 px-3 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-brand-navy rounded"
          >
            Cómo Funciona
          </a>
          <a
            href="/es/soluciones/"
            className="text-base text-white hover:text-white/90 px-3 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-brand-navy rounded"
          >
            Soluciones
          </a>
          <a
            href="/es/precios/"
            className="text-base text-white hover:text-white/90 px-3 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-brand-navy rounded"
          >
            Precios
          </a>
          <a
            href="/es/contacto/"
            className="text-base text-white hover:text-white/90 px-3 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-brand-navy rounded"
          >
            Contacto
          </a>
        </div>

        {/* Desktop utility */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/login" className="text-base text-white hover:text-white/90 px-3 py-2 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-brand-navy rounded">Iniciar Sesión</a>
          <a href="/es/contacto/" className="bg-brand-teal-dark text-white text-base font-semibold px-4 py-2 rounded-lg hover:bg-brand-teal transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-brand-navy">Solicitar una demo</a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Abrir o cerrar el menú">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-navy border-t border-brand-navy px-4 py-4 space-y-1">
          <a href="/es/como-funciona/" className="block py-2.5 text-base text-white font-medium focus:outline-none focus:ring-2 focus:ring-white/50 rounded">Cómo Funciona</a>
          <a href="/es/soluciones/" className="block py-2.5 text-base text-white font-medium focus:outline-none focus:ring-2 focus:ring-white/50 rounded">Soluciones</a>
          <a href="/es/precios/" className="block py-2.5 text-base text-white font-medium focus:outline-none focus:ring-2 focus:ring-white/50 rounded">Precios</a>
          <a href="/es/contacto/" className="block py-2.5 text-base text-white font-medium focus:outline-none focus:ring-2 focus:ring-white/50 rounded">Contacto</a>
          <div className="pt-3 border-t border-white/20 flex flex-col gap-2">
            <a href="/login" className="text-center py-2.5 text-base font-bold text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50">Iniciar Sesión</a>
            <a href="/es/contacto/" className="text-center py-2.5 text-base font-semibold text-white bg-brand-teal-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50">Solicitar una demo</a>
          </div>
        </div>
      )}
    </nav>
    <TopBenefitsHero locale="es-419" />
    </>
  );
}
