import React from 'react';
import BrandLogo from './BrandLogo';

export default function MarketingFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 pt-14 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-3">
              <img src="https://media.base44.com/images/public/69ac4eaa5a3031dffe252cf9/57f99d8a4_Gemini_Generated_Service_Hours.png" alt="Hours Served" className="w-7 h-7 rounded-lg" />
              <BrandLogo />
            </a>
            <p className="text-xs text-brand-ink leading-relaxed mb-4">Attendance and volunteer hour tracking for service-led organizations.</p>
            <div className="flex flex-col gap-2">
              <a href="/login" className="text-center text-xs font-semibold text-gray-700 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-colors">Login</a>
              <a href="/demo" className="text-center text-xs font-semibold text-white py-2 rounded-lg transition-colors" style={{ background: "#0F6E56" }} onMouseEnter={(e: any) => (e.currentTarget.style.background = "#0d5c48")} onMouseLeave={(e: any) => (e.currentTarget.style.background = "#0F6E56")}>Book a Demo</a>
            </div>
          </div>

          {/* Column 1: Product */}
          <div>
            <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">Product</p>
            <ul className="space-y-2">
              <li><a href="/how-it-works" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">How It Works</a></li>
              <li><a href="/pricing" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Pricing</a></li>
              <li><a href="/demo" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Demo</a></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">Solutions</p>
            <ul className="space-y-2">
              <li><a href="/solutions" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">All Solutions</a></li>
              <li><a href="/solutions/service-clubs" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Lions Clubs</a></li>
              <li><a href="/solutions/districts" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Lions Districts</a></li>
              <li><a href="/solutions/officer-transition" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Officer Transition</a></li>
              <li><a href="/solutions/volunteer-growth" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Volunteer Growth</a></li>
              <li><a href="/solutions/service-reporting" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Service Reporting</a></li>
              <li><a href="/solutions/meetings-events" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Meetings & Events</a></li>
              <li><a href="/solutions/churches" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Churches & Ministries</a></li>
              <li><a href="/solutions/community-groups" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Community & Civic Groups</a></li>
              <li><a href="/solutions/parent-councils-booster-groups-youth-sports" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Parent Councils & Boosters</a></li>
            </ul>
          </div>

          {/* Column 3: Compare */}
          <div>
            <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">Compare</p>
            <ul className="space-y-2">
              <li><a href="/compare" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Compare Overview</a></li>
              <li><a href="/compare/lions-portal" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">vs Lions Portal</a></li>
              <li><a href="/compare/lionsbase" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">vs LionsBase</a></li>
              <li><a href="/compare/clubrunner" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">vs ClubRunner</a></li>
              <li><a href="/compare/signupgenius" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">vs SignUpGenius</a></li>
              <li><a href="/compare/unison" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">vs Unison</a></li>
              <li><a href="/compare/track-it-forward" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">vs Track It Forward</a></li>
            </ul>
          </div>

          {/* Column 4: América Latina */}
          <div>
            <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">América Latina</p>
            <ul className="space-y-2">
              <li><a href="/es" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Para Clubes de Lions</a></li>
              <li><a href="/es/how-it-works" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Cómo Funciona</a></li>
              <li><a href="/es/solutions/service-clubs" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Soluciones</a></li>
              <li><a href="/es/contact" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div>
            <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">Company</p>
            <ul className="space-y-2">
              <li><a href="/guide" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Secretary Guide</a></li>
              <li><a href="/faq" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">FAQ</a></li>
              <li><a href="/blog" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Blog</a></li>
              <li><a href="/contact" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Contact</a></li>
              <li><a href="/contact" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Support</a></li>
              <li><a href="/contact" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Billing</a></li>
              <li><a href="/privacy-policy" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Privacy</a></li>
              <li><a href="/terms-of-service" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Terms</a></li>
              <li><a href="/cookie-policy" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Cookie Policy</a></li>
              <li><a href="/accessibility" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Accessibility</a></li>
              <li><a href="/legal/processors" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Subprocessor DPAs</a></li>
              <li><a href="/sitemap" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Site Map</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4">
          <p className="text-xs text-gray-600 leading-relaxed max-w-4xl">
            HoursServed is an independent product of Abacus Media Marketing Inc. It is not affiliated with, endorsed by, or sponsored by Lions Clubs International. Lions Clubs International, MyLCI, and Lion Portal are trademarks of their respective owner, used here only to describe compatibility.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-brand-ink">© 2026 Hours Served Inc. All rights reserved. · Toronto, ON, Canada</p>
            <a href="/contact" className="text-xs text-brand-ink hover:text-gray-700 transition-colors">hello@hoursserved.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
