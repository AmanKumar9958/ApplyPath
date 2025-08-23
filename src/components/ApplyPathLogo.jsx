import React from "react";

const ApplyPathLogo = ({ className = "" }) => (
  <svg
    className={className}
    width="170"
    height="60"
    viewBox="0 0 500 100"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="ApplyPath logo"
  >
    {/* Logo Mark Group */}
    <g transform="translate(20, 15)">
      {/* Animated 'A' Monogram */}
      <path
        d="M20 70 Q 50 10 80 70 T 140 20"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        className="stroke-gray-900 dark:stroke-white animate-draw"
      />
      
      {/* Animated Yellow Accent */}
      <path
        d="M85 30 L110 50 L85 70 M100 50 L110 50"
        stroke="#FACC15"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="animate-slideAccent"
      />
    </g>

    {/* Wordmark Group */}
    <g transform="translate(160, 48)">
      <text
        x="8"
        y="0"
        fontSize="48"
        fontFamily="Inter, Segoe UI, Roboto, Arial, sans-serif"
        fontWeight="700"
        className="fill-gray-900 dark:fill-white opacity-0 animate-fadeUpText"
      >
        ApplyPath
      </text>
      <text
        x="5"
        y="28"
        fontSize="14"
        fontFamily="Inter, Segoe UI, Roboto, Arial, sans-serif"
        fontWeight="500"
        opacity="0.7"
        className="fill-gray-700 dark:fill-gray-300 opacity-0 animate-fadeUpText delay-200"
      >
        JOBS • TALENT • HIRING
      </text>
    </g>

    {/* Tailwind Animations */}
    <style>{`
      @keyframes draw {
        0% { stroke-dasharray: 300; stroke-dashoffset: 300; }
        100% { stroke-dasharray: 300; stroke-dashoffset: 0; }
      }
      .animate-draw {
        stroke-dasharray: 300;
        stroke-dashoffset: 300;
        animation: draw 2s ease forwards;
      }

      @keyframes slideAccent {
        0% { transform: translateX(-20px); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      .animate-slideAccent {
        animation: slideAccent 1.5s ease forwards 1s;
      }

      @keyframes fadeUpText {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeUpText {
        animation: fadeUpText 1s ease forwards 1.5s;
      }
      .delay-200 {
        animation-delay: 1.7s;
      }
    `}</style>
  </svg>
);

export default ApplyPathLogo;
