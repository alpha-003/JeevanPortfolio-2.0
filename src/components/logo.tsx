import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("h-8 w-8", className)}
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop
          offset="0%"
          style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }}
        />
        <stop
          offset="100%"
          style={{ stopColor: "hsl(var(--accent))", stopOpacity: 1 }}
        />
      </linearGradient>
    </defs>
    <path
      d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z"
      fill="url(#grad1)"
    />
    <path
      d="M50 10L85 30V70L50 90L15 70V30L50 10Z"
      stroke="hsl(var(--accent))"
      strokeWidth="4"
    />
    <text
      x="50"
      y="62"
      textAnchor="middle"
      fill="white"
      fontSize="40"
      fontFamily="Space Grotesk, sans-serif"
      fontWeight="bold"
    >
      X
    </text>
  </svg>
);
export default Logo;
