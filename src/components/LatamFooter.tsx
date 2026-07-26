import React from 'react';

export default function LatamFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 pt-14 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/es" className="flex items-center gap-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
              <img src="/images/logo.png" alt="Hours Served" className="w-7 h-7 rounded-lg" />
              <span className="font-bold text-lg text-gray-900">HoursServed</span>
            </a>
            <p className="text-xs text-brand-ink leading-relaxed mb-4">Seguimiento de asistencia y horas de voluntariado para organizaciones de servicio.</p>
            <div className="flex flex-col gap-2">
              <a href="/login" className="text-center text-xs font-semibold text-gray-700 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">Iniciar Sesión</a>
              <a href="/demo" className="text-center text-xs font-semibold text-white py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ backgroundColor: '#0F6E56' }}>Solicitar una Demo</a>
            </div>
          </div>

          {/* Column 1: Producto */}
          <div>
            <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">Producto</p>
            <ul className="space-y-2">
              <li><a href="/es/how-it-works" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Cómo Funciona</a></li>
              <li><a href="/pricing" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Precios</a></li>
              <li><a href="/demo" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Demo</a></li>
            </ul>
          </div>

          {/* Column 2: Soluciones */}
          <div>
            <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">Soluciones</p>
            <ul className="space-y-2">
              <li><a href="/es/solutions" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Todas las Soluciones</a></li>
              <li><a href="/es/solutions/service-clubs" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Clubes de Lions</a></li>
            </ul>
          </div>

          {/* Column 3: English */}
          <div>
            <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">English</p>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">For Lions Clubs</a></li>
              <li><a href="/how-it-works" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">How It Works</a></li>
              <li><a href="/solutions" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Solutions</a></li>
              <li><a href="/contact" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Contact</a></li>
            </ul>
          </div>

          {/* Column 4: Compañía */}
          <div>
            <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">Compañía</p>
            <ul className="space-y-2">
              <li><a href="/guide" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Guía del Secretario</a></li>
              <li><a href="/faq" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">FAQ</a></li>
              <li><a href="/blog" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Blog</a></li>
              <li><a href="/es/contact" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Contacto</a></li>
              <li><a href="/privacy-policy" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Privacidad</a></li>
              <li><a href="/terms-of-service" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Términos</a></li>
              <li><a href="/cookie-policy" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Política de Cookies</a></li>
              <li><a href="/accessibility" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Accesibilidad</a></li>
              <li><a href="/sitemap" className="text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Mapa del Sitio</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4">
          <p className="text-xs text-gray-600 leading-relaxed max-w-4xl">
            HoursServed es un producto independiente de Abacus Media Marketing Inc. No está afiliado, respaldado ni patrocinado por Lions Clubs International. Lions Clubs International, MyLCI y Lion Portal son marcas comerciales de su respectivo propietario, utilizadas aquí solo para describir compatibilidad.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-brand-ink">© 2026 Hours Served Inc. Todos los derechos reservados. · Toronto, ON, Canadá</p>
            <a href="/es/contact" className="text-xs text-brand-ink hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">hello@hoursserved.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
