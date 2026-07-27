export function Logo({ size = 30, stroke = "#1f5138" }: { size?: number; stroke?: string }) {
  return (
    <svg className="mark" width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 2l16 9v18l-16 9L4 29V11z" fill="none" stroke={stroke} strokeWidth="1.6" />
      <path d="M20 9c5 4 5 10 0 22-5-12-5-18 0-22z" fill="#2f8f5b" />
      <circle cx="20" cy="17" r="2.1" fill="#a9863f" />
    </svg>
  );
}
