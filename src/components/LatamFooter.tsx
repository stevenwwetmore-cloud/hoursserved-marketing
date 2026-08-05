import React from 'react';
import BrandLogo from './BrandLogo';

export default function LatamFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 pt-14 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-md mx-auto text-center mb-12">
          {/* Brand */}
          <a href="/es/" className="inline-flex items-center gap-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
            <BrandLogo size={24} />
          </a>
          <p className="text-xs text-brand-ink leading-relaxed mb-6">Seguimiento de asistencia y horas de voluntariado para organizaciones de servicio.</p>

          {/* Links column */}
          <ul className="space-y-2 mb-8">
            <li><a href="/es/como-funciona/" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Cómo Funciona</a></li>
            <li><a href="/es/soluciones/" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Soluciones</a></li>
            <li><a href="/es/soluciones/clubes-de-servicio/" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Clubes de Servicio</a></li>
            <li><a href="/es/precios/" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Precios</a></li>
            <li><a href="/es/contacto/" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Contacto</a></li>
          </ul>

          {/* Copyright */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              HoursServed es un producto independiente de Abacus Media Marketing Inc. No está afiliado, respaldado ni patrocinado por Lions Clubs International. Lions Clubs International, MyLCI y Lion Portal son marcas comerciales de su respectivo propietario, utilizadas aquí solo para describir compatibilidad.
            </p>
            <p className="text-xs text-brand-ink">© 2026 HoursServed — un producto de Abacus Media Marketing Inc. Todos los derechos reservados. · Toronto, ON, Canadá</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
