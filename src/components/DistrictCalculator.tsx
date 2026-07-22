import { useState, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';

const GRADUATED_RATES = {
  USD: { symbol: '$', code: 'USD', tier1: 6.60, tier2: 5.00, tier3: 4.00 },
  CAD: { symbol: '$', code: 'CAD', tier1: 8.99, tier2: 6.99, tier3: 5.99 },
  GBP: { symbol: '£', code: 'GBP', tier1: 4.99, tier2: 3.99, tier3: 2.99 },
  AUD: { symbol: '$', code: 'AUD', tier1: 9.49, tier2: 7.49, tier3: 5.99 },
};

const DISTRICT_FEATURES = [
  'Everything in Club Pro for the district account',
  'District Dashboard — all clubs visible',
  'Club reporting coverage view',
  'At-risk member flags across clubs',
  'Officer transition oversight',
  'Email and phone support (by appointment)',
];

type Currency = 'USD' | 'CAD' | 'GBP' | 'AUD';

interface DistrictCalculatorProps {
  currency?: Currency;
}

export default function DistrictCalculator({ currency = 'CAD' }: DistrictCalculatorProps) {
  const [clubs, setClubs] = useState(34);

  // Load Fraunces font
  useEffect(() => {
    if (!document.querySelector('link[href*="Fraunces"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700;800&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const rates = GRADUATED_RATES[currency];
  const billedClubs = Math.max(clubs, 10);

  // Calculate graduated pricing
  const calculatePricing = () => {
    const brackets = [];
    let remaining = billedClubs;
    let monthlyTotal = 0;

    // Bracket 1: clubs 1-25
    if (remaining > 0) {
      const count = Math.min(remaining, 25);
      const subtotal = count * rates.tier1;
      brackets.push({
        label: 'First 25 clubs',
        range: count === 25 ? '1-25' : `1-${count}`,
        count,
        rate: rates.tier1,
        subtotal,
      });
      monthlyTotal += subtotal;
      remaining -= count;
    }

    // Bracket 2: clubs 26-60
    if (remaining > 0) {
      const count = Math.min(remaining, 35);
      const subtotal = count * rates.tier2;
      const start = billedClubs - remaining + 1;
      const end = start + count - 1;
      brackets.push({
        label: `Clubs ${start}-${end}`,
        range: `${start}-${end}`,
        count,
        rate: rates.tier2,
        subtotal,
      });
      monthlyTotal += subtotal;
      remaining -= count;
    }

    // Bracket 3: clubs 61-100
    if (remaining > 0) {
      const count = Math.min(remaining, 40);
      const subtotal = count * rates.tier3;
      const start = billedClubs - remaining + 1;
      const end = start + count - 1;
      brackets.push({
        label: `Clubs ${start}-${end}`,
        range: `${start}-${end}`,
        count,
        rate: rates.tier3,
        subtotal,
      });
      monthlyTotal += subtotal;
      remaining -= count;
    }

    // Bracket 4: clubs 101+
    if (remaining > 0) {
      const subtotal = remaining * rates.tier3;
      const start = billedClubs - remaining + 1;
      brackets.push({
        label: `Clubs ${start}-${billedClubs}`,
        range: `${start}-${billedClubs}`,
        count: remaining,
        rate: rates.tier3,
        subtotal,
      });
      monthlyTotal += subtotal;
    }

    const annualTotal = monthlyTotal * 12;
    const blendedRate = monthlyTotal / billedClubs;

    return { brackets, monthlyTotal, annualTotal, blendedRate };
  };

  const { brackets, monthlyTotal, annualTotal, blendedRate } = calculatePricing();

  const handleClubChange = (value: number | string) => {
    const num = parseInt(String(value), 10);
    if (!isNaN(num) && num >= 1 && num <= 200) {
      setClubs(num);
    }
  };

  const fmt = (amount: number) => `${rates.symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Calculate max monthly total for proportional bar widths
  const maxBracketTotal = Math.max(...brackets.map(b => b.subtotal));

  // Generate checkout link URLs
  const subscribeUrl = `https://www.hoursserved.com/login?plan=district_graduated_annual&currency=${currency.toLowerCase()}&clubs=${clubs}`;
  const quoteUrl = `/contact?clubs=${clubs}&currency=${currency}&total=${annualTotal.toFixed(2)}`;

  return (
    <div className="max-w-3xl mx-auto" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Eyebrow */}
      <div className="text-center mb-3">
        <div className="inline-block text-xs font-bold tracking-[0.15em] uppercase text-gray-600">
          District Plan
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-3 text-gray-900" style={{ fontFamily: 'Fraunces, serif' }}>
          Price your district
        </h2>
        <p className="text-base leading-relaxed max-w-xl mx-auto text-gray-600">
          You only pay for the clubs you have. Enter your club count to see your exact annual price.
        </p>
      </div>

      {/* Main Calculator Card */}
      <div className="rounded-2xl p-8 mb-8 bg-white border border-gray-300">
        {/* Club Count Input */}
        <div className="mb-8">
          <label htmlFor="club-count" className="block text-base font-semibold mb-4 text-gray-900">
            Number of clubs in your district
          </label>
          <div className="flex items-center gap-3 mb-4">
            <button
              type="button"
              onClick={() => handleClubChange(clubs - 1)}
              disabled={clubs <= 1}
              aria-label="Decrease club count"
              className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-30 disabled:cursor-not-allowed bg-white border-2 border-gray-300 text-gray-900 focus-visible:outline-gray-900"
            >
              <Minus className="w-5 h-5" />
            </button>
            <input
              id="club-count"
              type="number"
              min="1"
              max="200"
              value={clubs}
              onChange={(e) => handleClubChange(e.target.value)}
              className="text-center text-3xl font-bold rounded-lg px-4 py-3 focus:outline-none transition-all bg-white border-2 border-gray-300 text-gray-900"
              style={{
                flex: 1,
                fontFamily: 'Fraunces, serif',
              }}
            />
            <button
              type="button"
              onClick={() => handleClubChange(clubs + 1)}
              disabled={clubs >= 200}
              aria-label="Increase club count"
              className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-30 disabled:cursor-not-allowed bg-white border-2 border-gray-300 text-gray-900 focus-visible:outline-gray-900"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <input
            type="range"
            min="1"
            max="120"
            value={Math.min(clubs, 120)}
            onChange={(e) => handleClubChange(e.target.value)}
            aria-label="Club count slider"
            className="w-full h-2 rounded-lg appearance-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-gray-300"
            style={{
              outlineColor: '#1E3A5F',
              accentColor: '#1E3A5F',
            }}
          />
          <div className="mt-3 px-4 py-2.5 rounded-lg text-sm bg-white text-gray-900 border-2" style={{ borderColor: '#1E3A5F' }} hidden={clubs >= 10}>
            Below the 10-club minimum, so billed as 10 clubs.
          </div>
        </div>

        {/* Breakdown Ladder */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-gray-600">
            How it adds up
          </h3>
          <div className="space-y-4">
            {brackets.map((bracket, idx) => (
              <div key={idx}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="text-base font-semibold text-gray-900">
                      {bracket.label}
                    </div>
                    <div className="text-xs text-gray-600">
                      {bracket.count} × {rates.symbol}{bracket.rate.toFixed(2)}/mo
                    </div>
                  </div>
                  <div className="text-base font-bold text-gray-900" style={{ fontFamily: 'Fraunces, serif' }}>
                    {fmt(bracket.subtotal)}/mo
                  </div>
                </div>
                {/* Proportional bar */}
                <div className="h-1.5 rounded-full overflow-hidden bg-gray-200">
                  <div
                    className="h-full rounded-full transition-all bg-gray-900"
                    style={{
                      width: `${(bracket.subtotal / maxBracketTotal) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Subtotal */}
        <div className="flex items-center justify-between py-4 mb-6 border-t border-gray-300">
          <span className="text-base font-medium text-gray-600">
            Monthly subtotal × 12 months
          </span>
          <span className="text-base font-bold text-gray-900" style={{ fontFamily: 'Fraunces, serif' }}>
            {fmt(monthlyTotal)}/mo
          </span>
        </div>

        {/* Annual Total */}
        <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: '#1E3A5F' }}>
          <div className="flex items-end justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Annual total
            </span>
            <div className="text-right">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white" style={{ fontFamily: 'Fraunces, serif' }}>
                  {rates.code} {rates.symbol}{annualTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-lg font-medium" style={{ color: '#E8EDF3' }}>
                  / year
                </span>
              </div>
              <div className="text-sm mt-1" style={{ color: '#E8EDF3' }}>
                That is {fmt(blendedRate)} per club, per month
              </div>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mb-6 rounded-xl p-6 bg-white border border-gray-300">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-600">
            What's included
          </h3>
          <ul className="grid sm:grid-cols-2 gap-2">
            {DISTRICT_FEATURES.map((feature, idx) => (
              <li key={idx} className="text-base flex items-start gap-2 text-gray-900">
                <span className="text-gray-900" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>●</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href={subscribeUrl}
            className="w-full font-semibold py-3.5 px-6 rounded-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 flex items-center justify-center gap-2 bg-gray-900 text-white no-underline hover:opacity-90"
            style={{
              outlineColor: '#1E3A5F',
            }}
          >
            Subscribe by card
          </a>
          <a
            href={quoteUrl}
            className="w-full font-semibold py-3.5 px-6 rounded-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-transparent border-2 border-gray-900 text-gray-900 no-underline hover:opacity-90 flex items-center justify-center"
            style={{
              outlineColor: '#1E3A5F',
            }}
          >
            Request a quote or invoice
          </a>
        </div>

        {/* Footnote */}
        <div className="mt-6 pt-6 border-t border-gray-300">
          <p className="text-xs leading-relaxed text-gray-600">
            Billed annually. Pay by card, or request an invoice with net 45 terms payable by bank transfer.
            <span className="block mt-2 text-gray-600" hidden={clubs <= 100}>
              Clubs over 100 are billed at the lowest per-club rate ({rates.symbol}{rates.tier3.toFixed(2)}/club/month).
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
