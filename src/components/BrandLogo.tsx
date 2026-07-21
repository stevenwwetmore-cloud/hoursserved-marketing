export default function BrandLogo({ className = "font-bold text-xl", dark = false }) {
  return (
    <span className={className}>
      <span style={{ color: dark ? '#FFFFFF' : '#1E3A5F' }}>Hours</span>
      <span style={{ color: dark ? '#5DCAA5' : '#4A4A4A' }}>Served</span>
    </span>
  );
}
