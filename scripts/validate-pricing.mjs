import { readdir, readFile } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pricingPath = join(repositoryRoot, 'src', 'components', 'PricingSection.tsx');
const districtPath = join(repositoryRoot, 'src', 'components', 'DistrictCalculator.tsx');
const pagesPath = join(repositoryRoot, 'src', 'pages');

const [pricingSource, districtSource] = await Promise.all([
  readFile(pricingPath, 'utf8'),
  readFile(districtPath, 'utf8'),
]);

const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

const escapeRegExp = (value) => value.replace(/[.*+?^\x24{}()|[\]\\]/g, '\\$&');

const objectBlock = (source, name) => {
  const startToken = 'const ' + name + ' = {';
  const start = source.indexOf(startToken);
  if (start === -1) return '';
  const end = source.indexOf('\n};', start);
  return end === -1 ? '' : source.slice(start, end + 3);
};

const assertRows = (block, objectName, expectedRows) => {
  expect(Boolean(block), objectName + ' must exist.');
  for (const [currency, expectedValues] of Object.entries(expectedRows)) {
    const row = block.match(new RegExp('\\b' + currency + ':\\s*\\{([^}]*)\\}'))?.[1] ?? '';
    expect(Boolean(row), objectName + ' must define ' + currency + '.');
    for (const [key, expectedValue] of Object.entries(expectedValues)) {
      if (typeof expectedValue === 'number') {
        const actualValue = row.match(new RegExp('\\b' + key + ':\\s*(-?\\d+(?:\\.\\d+)?)'))?.[1];
        expect(
          actualValue !== undefined && Number(actualValue) === expectedValue,
          objectName + '.' + currency + '.' + key + ' must equal ' + JSON.stringify(expectedValue) + '.',
        );
      } else {
        expect(
          new RegExp('\\b' + key + ":\\s*'" + escapeRegExp(expectedValue) + "'(?:,|\\s|$)").test(row),
          objectName + '.' + currency + '.' + key + ' must equal ' + JSON.stringify(expectedValue) + '.',
        );
      }
    }
  }
};

const clubPrices = {
  USD: { essential_mo: 'USD $19', essential_yr: 'USD $190', pro_mo: 'USD $34', pro_yr: 'USD $340' },
  CAD: { essential_mo: 'CAD $25', essential_yr: 'CAD $250', pro_mo: 'CAD $45', pro_yr: 'CAD $450' },
  GBP: { essential_mo: '£15', essential_yr: '£149', pro_mo: '£27', pro_yr: '£269' },
  AUD: { essential_mo: 'AUD $29', essential_yr: 'AUD $289', pro_mo: 'AUD $52', pro_yr: 'AUD $519' },
};

const districtPrices = {
  USD: { symbol: 'USD $', connectYear: 490, trialMonth: 149, starter: 6.60, growth: 5.00, premier: 4.00 },
  CAD: { symbol: 'CAD $', connectYear: 679, trialMonth: 199, starter: 8.99, growth: 6.99, premier: 5.99 },
  GBP: { symbol: 'GBP £', connectYear: 369, trialMonth: 109, starter: 4.99, growth: 3.99, premier: 2.99 },
  AUD: { symbol: 'AUD $', connectYear: 699, trialMonth: 219, starter: 9.49, growth: 7.49, premier: 5.99 },
};

const graduatedRates = Object.fromEntries(
  Object.entries(districtPrices).map(([currency, values]) => [
    currency,
    {
      code: currency,
      tier1: values.starter,
      tier2: values.growth,
      tier3: values.premier,
    },
  ]),
);

assertRows(objectBlock(pricingSource, 'CLUB_PRICES'), 'CLUB_PRICES', clubPrices);
assertRows(objectBlock(pricingSource, 'DISTRICT_PRICING'), 'DISTRICT_PRICING', districtPrices);
assertRows(objectBlock(districtSource, 'GRADUATED_RATES'), 'GRADUATED_RATES', graduatedRates);

expect(
  pricingSource.includes("planKey={annual ? 'essential_annual' : 'essential_monthly'}"),
  'Essential billing states must map to the canonical plan keys.',
);
expect(
  pricingSource.includes("planKey={annual ? 'pro_annual' : 'pro_monthly'}"),
  'Pro billing states must map to the canonical plan keys.',
);
expect(
  pricingSource.includes('promoLine={annual') &&
    pricingSource.includes('P.pro_yr}/year — billed annually') &&
    pricingSource.includes('P.pro_mo}/month'),
  'The Pro trial footnote must use the annual price in annual mode and the monthly price in monthly mode.',
);
expect(
  pricingSource.includes('plan=pro_district_connect_annual&currency='),
  'District Connect must use pro_district_connect_annual.',
);
expect(
  pricingSource.includes('plan=district_trial_monthly&currency='),
  'District Trial must use district_trial_monthly.',
);
expect(
  districtSource.includes('plan=district_graduated_annual&currency=') &&
    districtSource.includes('&clubs='),
  'District calculator checkout must include the graduated annual key, currency, and club quantity.',
);

const sourceExtensions = new Set(['.astro', '.js', '.jsx', '.ts', '.tsx']);
const pageFiles = [];
const collectPageFiles = async (directory) => {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) await collectPageFiles(fullPath);
    else if (sourceExtensions.has(extname(entry.name))) pageFiles.push(fullPath);
  }
};
await collectPageFiles(pagesPath);

const stalePatterns = [
  { pattern: /\$199\b/i, label: 'obsolete $199 annual price' },
  { pattern: /Pro[^\r\n]{0,120}\$19\b/i, label: 'Pro incorrectly described as $19' },
  { pattern: /\$19\b[^\r\n]{0,120}Pro/i, label: '$19 incorrectly associated with Pro' },
  { pattern: /Free[^\r\n]{0,120}(?:up to )?20 members/i, label: 'Free incorrectly described as supporting 20 members' },
  { pattern: /(?:up to )?20 members[^\r\n]{0,120}Free/i, label: '20 members incorrectly associated with Free' },
  { pattern: /Free[^\r\n]{0,120}basic CSV/i, label: 'Free incorrectly described as including CSV export' },
];

for (const filePath of pageFiles) {
  const source = await readFile(filePath, 'utf8');
  for (const { pattern, label } of stalePatterns) {
    expect(!pattern.test(source), label + ' found in ' + filePath.slice(repositoryRoot.length + 1) + '.');
  }
}

if (failures.length > 0) {
  console.error('Marketing pricing validation failed:');
  for (const failure of failures) console.error('- ' + failure);
  process.exitCode = 1;
} else {
  console.log('Marketing pricing is internally consistent across four currencies and all paid plan keys.');
}
