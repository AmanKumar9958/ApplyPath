import React from "react";

const HirenixLogo = ({ className = "", color = "currentColor", accent = "currentColor" }) => (
  <svg
    className={className}
    width="170"
    height="90"
    viewBox="60 0 400 250"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Hirenix logo"
  >
    {/* Logo mark */}
    <g transform="translate(28,40)">
      {/* Accent ring */}
      <path
        d="M62 5c35 0 63 28 63 63s-28 63-63 63S-1 103 -1 68 27 5 62 5z"
        fill="none"
        stroke={accent}
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* H monogram */}
      <rect x="28" y="32" width="14" height="72" rx="7" fill={color} />
      <rect x="82" y="32" width="14" height="72" rx="7" fill={color} />
      <rect x="42" y="63" width="44" height="10" rx="5" fill={color} />
    </g>

    {/* Wordmark */}
    <g transform="translate(140,104)">
      <text
        x="0"
        y="0"
        fontSize="56"
        fontFamily="Inter, Segoe UI, Roboto, Arial, sans-serif"
        fontWeight="700"
        fill={color}
      >
        ApplyPath
      </text>
      <text
        x="15"
        y="32"
        fontSize="14"
        fontFamily="Inter, Segoe UI, Roboto, Arial, sans-serif"
        fontWeight="500"
        opacity="0.7"
        fill={color}
      >
        JOBS • TALENT • HIRING
      </text>
    </g>
  </svg>
);

export default HirenixLogo;
