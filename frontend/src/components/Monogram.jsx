import React from "react";

/**
 * Refined SVG monogram for MM Innovation Consulting.
 * Renders inside a glass circle.
 */
export default function Monogram({ size = 44, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MM Innovation Consulting"
    >
      <defs>
        <linearGradient id="mm-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {/* Stylized two-stroke MM */}
      <path
        d="M9 32 V14 L17 22 L22 14 L27 22 L35 14 V32"
        fill="none"
        stroke="url(#mm-stroke)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="34" r="1.2" fill="#fff" opacity="0.85" />
    </svg>
  );
}
