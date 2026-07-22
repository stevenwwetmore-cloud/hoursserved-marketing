import { useState, useEffect } from 'react';
import { CheckCircle, X, Zap, ClipboardCheck, Map } from 'lucide-react';
import DistrictCalculator from './DistrictCalculator';

// ── Fixed district prices per currency ───────────────────────────────────────
const DISTRICT_PRICING = {
  USD: { symbol: 'USD $', connectYear: 490, trialMonth: 149, starter: 6.60, growth: 5.00, premier: 4.00, tax_note: 'excl. applicable tax' },
  CAD: { symbol: 'CAD $', connectYear: 679, trialMonth: 199, starter: 8.99, growth: 6.99, premier: 5.99, tax_note: 'excl. HST/GST' },
  GBP: { symbol: 'GBP £', connectYear: 369, trialMonth: 109, starter: 4.99, growth: 3.99, premier: 2.99, tax_note: 'excl. VAT' },
  AUD: { symbol: 'AUD $', connectYear: 699, trialMonth: 219, starter: 9.49, growth: 7.49, premier: 5.99, tax_note: 'excl. GST' },
};

// ── Club plan prices (unchanged) ─────────────────────────────────────────────
const CLUB_PRICES = {
  USD: { essential_mo: 'USD $19', essential_yr: 'USD $190', pro_mo: 'USD $34', pro_yr: 'USD $340', tax_note: 'excl. applicable tax' },
  CAD: { essential_mo: 'CAD $25', essential_yr: 'CAD $250', pro_mo: 'CAD $45', pro_yr: 'CAD $450', tax_note: 'excl. HST/GST' },
  GBP: { essential_mo: '£15',     essential_yr: '£149',     pro_mo: '£27',     pro_yr: '£269',     tax_note: 'excl. VAT' },
  AUD: { essential_mo: 'AUD $29', essential_yr: 'AUD $289', pro_mo: 'AUD $52', pro_yr: 'AUD $519', tax_note: 'excl. GST' },
};

const DISTRICT_FEATURES = [
  'Everything in Club Pro for the district account',
  'District Dashboard — all clubs visible',
  'Club reporting coverage view',
  'At-risk member flags across clubs',
  'Officer transition oversight',
  'Email and phone support (by appointment)',
];

const freeFeatures = [
  'Up to 15 members', 'Up to 2 events per month', 'Email invitations',
  'Service hours tracking', 'Monthly report — view only', 'Email support',
  { text: 'No export or PDF', included: false },
  { text: 'No Lions Portal fields', included: false },
  { text: 'No shift management', included: false },
  { text: 'No volunteer tracking', included: false },
];
const essentialFeatures = [
  'Up to 50 members', 'Unlimited events', 'Email invitations',
  'Service hours tracking', 'Monthly report — PDF and CSV export',
  'Lions Portal fields complete', 'Import and export', 'Email support',
  { text: 'No shift management', included: false },
  { text: 'No volunteer tracking', included: false },
  { text: 'No District Dashboard visibility', included: false },
];
const proFeatures = [
  'Unlimited members', 'Unlimited events', 'Email invitations and nudges',
  'Service hours tracking', 'Monthly report — PDF and CSV export',
  { note: true, text: 'For Rotary, Kiwanis, and community organizations: generates a Monthly Activity Report instead.' },
  'Lions Portal fields complete', 'Shift management', 'Volunteer tracking',
  'Bulk actions', 'Report approval workflow', 'Google Calendar sync',
  'District Dashboard visibility', 'Dues management', 'Import and export', 'Email support',
];

type Currency = 'USD' | 'CAD' | 'GBP' | 'AUD';

interface PricingCardProps {
  name: string;
  badge?: string;
  price: string;
  billing: string;
  features: (string | { text: string; included?: boolean; note?: boolean })[];
  cta: string;
  highlight?: boolean;
  ctaLink?: string;
  trialBanner?: string;
  savingsBadge?: string;
  promoLine?: string;
  planKey?: string;
  currency?: string;
}

function PricingCard({ name, badge, price, billing, features, cta, highlight, ctaLink, trialBanner, savingsBadge, promoLine, planKey, currency }: PricingCardProps) {
  // Build checkout URL for paid plans
  const checkoutUrl = planKey && currency
    ? `https://www.hoursserved.com/login?plan=${planKey}&currency=${currency.toLowerCase()}${(planKey === 'pro_monthly' || planKey === 'pro_annual') ? '&trial=true' : ''}`
    : ctaLink || '/app/dashboard';

  return (
    <div className={`rounded-2xl border flex flex-col p-8 relative ${highlight ? 'bg-brand-navy text-white shadow-2xl' : 'bg-white'}`} style={highlight ? {} : { borderColor: '#E5E1D8' }}>
      {badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white border-2 text-xs font-bold px-3 py-1 rounded-full shadow-sm whitespace-nowrap" style={{ borderColor: '#0F6E56', color: '#0F6E56' }}>
          {badge}
        </div>
      )}
      <div className="mb-1 text-sm font-semibold uppercase tracking-wide" style={{ color: highlight ? '#E8EDF3' : undefined }}>{name}</div>
      {trialBanner && (
        <div className={`inline-flex items-center self-start px-3 py-1.5 rounded-full text-xs font-bold mb-3 ${highlight ? 'bg-white border-2' : 'bg-white border-2'}`} style={{ borderColor: '#0F6E56', color: '#0F6E56' }}>
          {trialBanner}
        </div>
      )}
      <div className="flex items-baseline gap-2 flex-wrap">
        <div className="text-4xl font-bold">{price}</div>
        {savingsBadge && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white border-2" style={{ borderColor: '#0F6E56', color: '#0F6E56' }}>{savingsBadge}</span>}
      </div>
      <div className="text-sm mb-6 mt-1" style={{ color: highlight ? '#E8EDF3' : undefined }}>{billing}</div>
      <ul className="space-y-2.5 flex-1 mb-8">
        {features.map((f, i) => {
          if (typeof f === 'object' && f.note) {
            return <li key={i} className={`ml-6 text-xs leading-snug ${highlight ? 'text-white' : 'text-gray-600'}`}>{f.text}</li>;
          }
          const text = typeof f === 'string' ? f : f.text;
          const included = typeof f === 'string' ? true : f.included !== false;
          return (
            <li key={i} className={`flex items-start gap-2 text-base ${highlight ? (included ? 'text-white' : '') : (included ? 'text-gray-900' : 'text-gray-600')}`} style={highlight && !included ? { color: '#E8EDF3' } : {}}>
              {included
                ? <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${highlight ? 'text-white' : ''}`} style={!highlight ? { color: '#0F6E56' } : {}} aria-hidden="true" />
                : <X className={`w-4 h-4 mt-0.5 flex-shrink-0 ${highlight ? '' : 'text-gray-600'}`} style={highlight ? { color: '#E8EDF3' } : {}} aria-hidden="true" />
              }
              {text}
            </li>
          );
        })}
      </ul>
      <a href={checkoutUrl} className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-colors no-underline ${highlight ? 'bg-white hover:bg-gray-50' : 'text-white hover:opacity-90'}`} style={highlight ? { color: '#1E3A5F' } : { backgroundColor: '#0F6E56' }}>
        {cta}
      </a>
      {promoLine && <p className={`text-xs text-center mt-2 ${highlight ? '' : 'text-gray-600'}`} style={highlight ? { color: '#E8EDF3' } : {}}>{promoLine}</p>}
    </div>
  );
}

export default function PricingSection() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [annual, setAnnual] = useState(true);

  // Detect browser language after hydration
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const lang = navigator.language || 'en-US';
      if (lang.startsWith('en-GB')) setCurrency('GBP');
      else if (lang.startsWith('en-AU')) setCurrency('AUD');
      else if (lang.startsWith('fr-CA') || lang.startsWith('en-CA')) setCurrency('CAD');
      else setCurrency('USD');
    }
  }, []);

  const P = CLUB_PRICES[currency];
  const D = DISTRICT_PRICING[currency];
  const CURRENCY_LABELS = { CAD: 'CAD', USD: 'USD', GBP: 'GBP', AUD: 'AUD' };

  const fmt = (n: number) => `${D.symbol}${Number(n).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const CurrencyBtn = ({ c }: { c: Currency }) => (
    <button onClick={() => setCurrency(c)}
      className={`px-4 py-2 rounded-md text-base font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${currency === c ? 'bg-white shadow border border-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
      style={currency === c ? { color: '#0F6E56', outlineColor: '#0F6E56' } : { outlineColor: '#0F6E56' }}>
      {c === 'CAD' && <><span aria-hidden="true">🇨🇦</span> CAD</>}
      {c === 'USD' && <><span aria-hidden="true">🇺🇸</span> USD</>}
      {c === 'GBP' && <><span aria-hidden="true">🇬🇧</span> GBP</>}
      {c === 'AUD' && <><span aria-hidden="true">🇦🇺</span> AUD</>}
    </button>
  );

  return (
    <>
      {/* ── Club Plans Header ── */}
      <section className="bg-white pt-20 pb-10 px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Simple, transparent pricing</h1>
        <p className="text-gray-600 text-base mb-6">Cancel anytime · No credit card required for free plan</p>
        <div className="inline-flex rounded-lg border border-gray-200 bg-gray-100 p-1 gap-1">
          <button onClick={() => setAnnual(false)}
            className={`px-5 py-2 rounded-md text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${!annual ? 'bg-white shadow text-gray-900 border border-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
            style={{ outlineColor: '#0F6E56' }}>
            Monthly
          </button>
          <button onClick={() => setAnnual(true)}
            className={`px-5 py-2 rounded-md text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${annual ? 'bg-white shadow border border-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
            style={annual ? { color: '#0F6E56', outlineColor: '#0F6E56' } : { outlineColor: '#0F6E56' }}>
            Annual <span className="text-xs font-normal">(Save 2 months)</span>
          </button>
        </div>
      </section>

      <section className="pb-12 px-4">
        {/* Currency selector */}
        <div className="flex flex-col items-center mb-8 gap-2">
          <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1 gap-1">
            {(['CAD', 'USD', 'GBP', 'AUD'] as Currency[]).map(c => <CurrencyBtn key={c} c={c} />)}
          </div>
          <p className="text-xs text-gray-600 text-center mb-6">
            All prices shown in {currency} — {D.tax_note}
            <span hidden={currency !== 'CAD'}> · Canadian registered charities may claim PSB rebate on GST/HST paid</span>
          </p>
        </div>

        {/* Built for the two people section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-center mb-6 text-gray-900" style={{ fontSize: '31px', fontWeight: 500, lineHeight: 1.3 }}>
            Built for the Two People<br />who Carry the Reporting
          </h2>

          <p className="text-base text-gray-900 mb-6" style={{ lineHeight: 1.7 }}>
            A club secretary and a district officer don't lose sleep over the same thing. The secretary is trying to get members to confirm what they did. The district officer is trying to see which clubs need help before it's too late. HoursServed was built for both.
          </p>

          <p className="text-base text-gray-900 mb-6" style={{ lineHeight: 1.7 }}>
            <span className="font-medium">For the secretary, the problem is getting members to confirm.</span> You send reminders, you ask in person, and hours still go missing by reporting time. So HoursServed lets members confirm attendance with one tap, no app, no password. Their hours are recorded the moment they confirm, and added up for you when the event ends. You stop chasing confirmations and start reporting in minutes.
          </p>

          <p className="text-base text-gray-900 mb-6" style={{ lineHeight: 1.7 }}>
            <span className="font-medium">For the district officer, the problem is seeing trouble in time.</span> Reports arrive late, one club at a time, long after you could have stepped in. So HoursServed shows every club in your district on one screen, updated as they work. You see which clubs are active and which have gone quiet, while there's still time to reach out and help.
          </p>

          <p className="text-base text-gray-900 mb-8" style={{ lineHeight: 1.7 }}>
            <span className="font-medium">Getting started is the same for both.</span> Start free, invite your people, and watch the hours, and the whole district, come into view.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-300 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <ClipboardCheck size={22} className="text-gray-900" aria-hidden="true" />
                <h3 className="text-lg font-medium text-gray-900 m-0">What the secretary gets</h3>
              </div>
              <ul className="space-y-2 text-base text-gray-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-900" aria-hidden="true" />
                  <span>One-tap attendance confirmation (no member login)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-900" aria-hidden="true" />
                  <span>Automatic hours totaling at event close</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-900" aria-hidden="true" />
                  <span>Shift signups for multi-role events</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-900" aria-hidden="true" />
                  <span>Monthly report generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-900" aria-hidden="true" />
                  <span>Lions Portal CSV export</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-900" aria-hidden="true" />
                  <span>Lion Portal automated submission (coming soon)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-300 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Map size={22} className="text-gray-900" aria-hidden="true" />
                <h3 className="text-lg font-medium text-gray-900 m-0">What the district officer gets</h3>
              </div>
              <ul className="space-y-2 text-base text-gray-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-900" aria-hidden="true" />
                  <span>Every club on one screen</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-900" aria-hidden="true" />
                  <span>Reporting status at a glance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-900" aria-hidden="true" />
                  <span>District-initiated events</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-900" aria-hidden="true" />
                  <span>Early visibility of clubs going quiet</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Intro paragraph */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-gray-600 text-base leading-relaxed">
            Built for service clubs of every kind. Churches, parent councils, booster and youth sports groups, and community organizations use the same plans below to track service hours and report with less work.
          </p>
        </div>

        {/* Club plan cards */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 items-stretch">
          <PricingCard name="Club Free" price="$0" billing="forever · no credit card" features={freeFeatures} cta="Start Free" ctaLink="/app/dashboard" />
          <PricingCard
            name="Club Essential"
            price={annual ? P.essential_yr : P.essential_mo}
            billing={annual ? 'per year · billed annually' : 'per month'}
            features={essentialFeatures}
            cta="Get Started"
            planKey={annual ? 'essential_annual' : 'essential_monthly'}
            currency={currency}
          />
          <PricingCard
            name="Club Pro"
            badge="Most Popular"
            price={annual ? P.pro_yr : P.pro_mo}
            highlight
            billing={annual ? 'per year · billed annually' : 'per month'}
            features={proFeatures}
            cta="Start Free Trial — No Credit Card Required"
            trialBanner="30-day free trial — no credit card required"
            savingsBadge={annual ? '2 months free' : ''}
            promoLine={`30 days free, then ${P.pro_mo}/month (${CURRENCY_LABELS[currency]})`}
            planKey={annual ? 'pro_annual' : 'pro_monthly'}
            currency={currency}
          />
        </div>

        {/* Non-Lions audience links */}
        <div className="max-w-3xl mx-auto text-center mt-10">
          <p className="text-base font-semibold text-gray-900 mb-2">
            Not a Lions club? See how HoursServed fits your group:
          </p>
          <p className="text-base text-gray-600">
            <a href="/solutions/churches" className="hover:underline" style={{ color: '#0F6E56' }}>Churches and faith groups</a>
            {' · '}
            <a href="/solutions/parent-councils-booster-groups-youth-sports" className="hover:underline" style={{ color: '#0F6E56' }}>Parent councils, booster and youth sports</a>
            {' · '}
            <a href="/solutions/community-groups" className="hover:underline" style={{ color: '#0F6E56' }}>Community groups and nonprofits</a>
            {' · '}
            <a href="/solutions/service-clubs" className="hover:underline" style={{ color: '#0F6E56' }}>Service clubs</a>
          </p>
        </div>

        {/* ── Pro + District Connect Banner ── */}
        <div className="max-w-5xl mx-auto mt-8">
          <div className="rounded-2xl border border-gray-300 bg-white p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-bold text-gray-900 text-sm">Pro + District Connect</span>
                <span className="text-xs text-white font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#1E3A5F' }}>For clubs whose district uses HoursServed</span>
              </div>
              <p className="text-base text-gray-900 mb-3">
                Everything in Club Pro, plus enhanced visibility in your District Dashboard — clubs synced, roll-up reporting, and district-initiated events.
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {['Everything in Club Pro', 'Enhanced District Dashboard sync', 'District-initiated event access', 'District roll-up reports', 'Email support'].map(f => (
                  <span key={f} className="text-base text-gray-900 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: '#0F6E56' }} aria-hidden="true" />{f}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-2xl font-bold text-gray-900">{fmt(D.connectYear)}</div>
              <div className="text-xs text-gray-600 mb-3">per year</div>
              <a
                href={`https://www.hoursserved.com/login?plan=pro_district_connect_annual&currency=${currency.toLowerCase()}`}
                className="flex items-center justify-center gap-2 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: '#0F6E56', outlineColor: '#0F6E56' }}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* ── District Plans Section ── */}
      <section className="py-16 px-4 bg-canvas">
        {/* ── Currency switcher ── */}
        <div className="max-w-5xl mx-auto mb-12 flex flex-col items-center gap-2">
          <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1 gap-1">
            {(['CAD', 'USD', 'GBP', 'AUD'] as Currency[]).map(c => <CurrencyBtn key={c} c={c} />)}
          </div>
          <p className="text-xs text-gray-600 text-center">
            All prices shown in <span className="font-semibold text-gray-900">{currency}</span> — {D.tax_note}
            <span hidden={currency !== 'CAD'}> · Canadian registered charities may claim PSB rebate on GST/HST paid</span>
          </p>
        </div>

        {/* ── District Pricing Calculator ── */}
        <DistrictCalculator currency={currency} />

        {/* ── District Trial Strip ── */}
        <div className="max-w-5xl mx-auto bg-white border border-gray-300 rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Not ready to commit? Start a District Trial</h2>
            <p className="text-gray-900 text-base">
              All clubs in your district, full feature access, 3-month maximum. Flat monthly rate — no per-club math, no annual commitment.
            </p>
          </div>
          <div className="flex-shrink-0 text-center md:text-right">
            <p className="text-3xl font-extrabold text-gray-900 mb-0.5">{fmt(D.trialMonth)}<span className="text-base font-medium"> / month</span></p>
            <p className="text-xs text-gray-600 mb-3">3-mo cap</p>
            <a
              href={`https://www.hoursserved.com/login?plan=district_trial_monthly&currency=${currency.toLowerCase()}`}
              className="flex items-center justify-center gap-2 text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ backgroundColor: '#0F6E56', outlineColor: '#0F6E56' }}
            >
              Start trial
            </a>
          </div>
        </div>

        {/* ── Footer Conditions ── */}
        <p className="text-xs text-center text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
          No setup fee. Member and volunteer upload requires Excel/CSV. Meeting and event import requires Google Calendar sync or Excel/CSV. Annual billing only on Starter, Growth, and Premier. Prices exclude applicable tax.
        </p>

        {/* LATAM disclaimer */}
        <div className="max-w-2xl mx-auto p-4 rounded-lg bg-white border border-gray-300 text-center">
          <p className="text-base text-gray-900">
            <span className="font-semibold text-gray-900">Lions clubs in Latin America</span>
            {' '}— regional pricing is available in your local currency.{' '}
            <a href="/contact?subject=LATAM+Pricing+Inquiry" className="hover:underline" style={{ color: '#0F6E56' }}>Contact us</a>
            {' '}to discuss pricing for your district.
          </p>
        </div>

        {/* Lion Portal AutoSubmit add-on */}
        <div className="max-w-5xl mx-auto mt-8">
          <div className="rounded-2xl border border-gray-300 bg-white p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-bold text-gray-900 text-sm">Add-on: Lion Portal AutoSubmit</span>
                <span className="text-xs bg-gray-200 text-gray-900 font-semibold px-2 py-0.5 rounded-full border border-gray-300">Requires Club Pro</span>
              </div>
              <p className="text-base text-gray-900 mb-2">Automated monthly Lions Portal submission. After you approve your report, HoursServed logs into myLCI and submits automatically — no manual portal navigation required.</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {['Automated myLCI login', 'Event-by-event submission', 'Dry-run preview', 'Submission confirmation', 'Re-submission on error', 'Full audit log'].map(f => (
                  <span key={f} className="text-base text-gray-900 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-gray-900 flex-shrink-0" aria-hidden="true" />{f}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-2xl font-bold text-gray-900">Coming soon</div>
              <div className="text-xs text-gray-600">per club / month</div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-8">Fiscal year billing available. Canadian clubs can pay via Interac e-Transfer.</p>
      </section>
    </>
  );
}
