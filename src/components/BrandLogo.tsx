interface BrandLogoProps {
  className?: string;
  dark?: boolean;
  size?: number;
}

export default function BrandLogo({ className = '', dark = false, size }: BrandLogoProps) {
  const finalSize = size ?? (dark ? 34 : 30);
  const colors = dark
    ? { track: '#375872', sweep: '#2FD3AC', hands: '#FFFFFF', hours: '#FFFFFF', served: '#2FD3AC' }
    : { track: '#C3D0D8', sweep: '#0F6E56', hands: '#1E3A5F', hours: '#1E3A5F', served: '#0F6E56' };

  return (
    <span className={`inline-flex items-center gap-2 ${className}`} role="img" aria-label="HoursServed">
      <svg width={finalSize} height={finalSize} viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="25" stroke={colors.track} strokeWidth="6" />
        <path d="M32 7 A25 25 0 1 1 7 32" stroke={colors.sweep} strokeWidth="6" strokeLinecap="round" />
        <path d="M32 32 L32 17" stroke={colors.hands} strokeWidth="5" strokeLinecap="round" />
        <path d="M32 32 L43 38" stroke={colors.hands} strokeWidth="5" strokeLinecap="round" />
      </svg>
      <span
        aria-hidden="true"
        style={{ fontSize: `${finalSize}px`, fontWeight: 800, letterSpacing: '-0.015em', lineHeight: 1 }}
      >
        <span style={{ color: colors.hours }}>Hours</span>
        <span style={{ color: colors.served }}>Served</span>
      </span>
    </span>
  );
}
