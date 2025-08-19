import React from "react";

const HiredLogo = ({ className = "", color = "#111", accent = "#FF4C60" }) => (
  <svg
    className={className}
    width="180"
    height="100"
    viewBox="0 0 420 200"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Hired logo"
  >
    {/* Stylish Mark */}
    <g transform="translate(30,30)">
      {/* Accent Circle with Gradient */}
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>

      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#grad1)"
        strokeWidth="8"
        fill="none"
      />

      {/* "H" Modern Monogram */}
      <rect x="30" y="20" width="12" height="60" rx="6" fill={color} />
      <rect x="58" y="20" width="12" height="60" rx="6" fill={color} />
      <rect x="30" y="45" width="40" height="10" rx="5" fill={accent} />
    </g>

    {/* Wordmark */}
    <g transform="translate(140,90)">
      <text
        x="0"
        y="0"
        fontSize="60"
        fontFamily="Poppins, Segoe UI, Roboto, Arial, sans-serif"
        fontWeight="700"
        fill={color}
        letterSpacing="2"
      >
        Hired
      </text>
    </g>
  </svg>
);

export default HiredLogo;
