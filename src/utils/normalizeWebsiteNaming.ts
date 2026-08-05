export function normalizeWebsiteNaming(value: unknown) {
  if (typeof value !== 'string') return value;

  return value
    .replace(/Lions\s+Portal/g, 'Lion Portal')
    .replace(/Portal\s+de\s+Lions/g, 'Lion Portal')
    .replace(/(?<!Clubs\s)Lions\s+International/g, 'Lions Clubs International')
    .replace(/Lion Portal\s*\/\s*Lion Portal/g, 'Lion Portal')
    .replace(/Lion Portal\s*\(\s*Lion Portal\s*\)/g, 'Lion Portal');
}
