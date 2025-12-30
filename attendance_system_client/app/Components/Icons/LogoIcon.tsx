export default function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="12" fill="currentColor" opacity="0.1" />
      <path
        d="M32 16C23.163 16 16 23.163 16 32C16 40.837 23.163 48 32 48C40.837 48 48 40.837 48 32C48 23.163 40.837 16 32 16ZM32 20C38.627 20 44 25.373 44 32C44 38.627 38.627 44 32 44C25.373 44 20 38.627 20 32C20 25.373 25.373 20 32 20Z"
        fill="currentColor"
      />
      <rect x="28" y="28" width="8" height="8" rx="2" fill="currentColor" />
      <path
        d="M24 36L28 32L32 36L40 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

