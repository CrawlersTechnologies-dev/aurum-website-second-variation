"use client";
const paths = {
  flow: (
    <>
      <circle cx="5" cy="6" r="2.4" /><circle cx="19" cy="6" r="2.4" /><circle cx="12" cy="18" r="2.4" />
      <path d="M7.2 7.2L11 16M16.8 7.2L13 16" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19V10M10 19V5M16 19v-7M22 19H2" strokeLinecap="round" />
    </>
  ),
  tag: (
    <>
      <path d="M12 3l8 8-9 9-8-8V4h8z" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.2a2.5 2.5 0 014.9.6c0 1.8-2.4 2-2.4 3.4" strokeLinecap="round" />
      <circle cx="12" cy="17.2" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  link: (
    <>
      <path d="M9.5 14.5l5-5" strokeLinecap="round" />
      <path d="M11 6.5l1.3-1.3a4 4 0 015.6 5.6L16.5 12M13 17.5l-1.3 1.3a4 4 0 01-5.6-5.6L7.5 12" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  radar: (
    <>
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <path d="M12 3v3M21 12h-3M12 21v-3M3 12h3" strokeLinecap="round" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4.2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4.2" /><circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" strokeLinecap="round" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" />
    </>
  ),
  trend: (
    <>
      <path d="M3 16l6-6 4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 5h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  twitter: (
    <path d="M18.9 3H21l-6.8 7.8L22 21h-6.6l-5.2-6.5L4.2 21H2l7.3-8.3L2.4 3H9l4.7 5.9L18.9 3z" />
  ),
  telegram: (
    <path d="M21 4L2.6 11.3c-1 .4-1 1.5.1 1.8l4.7 1.5 1.8 5.6c.3.9 1.4 1.1 2 .4l2.6-2.9 4.8 3.6c.8.6 2 .2 2.2-.8L22.9 5.2c.3-1.1-.8-1.9-1.9-1.2z" />
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9l6 3-6 3V9z" fill="currentColor" stroke="none" />
    </>
  ),
  whatsapp: (
    <path d="M12.031 0C5.394 0 0 5.394 0 12.031c0 2.633.856 5.074 2.316 7.027l-1.572 5.753 5.882-1.543A11.97 11.97 0 0 0 12.031 24c6.637 0 12.031-5.394 12.031-12.031S18.668 0 12.031 0zm5.666 17.159c-.256.721-1.488 1.379-2.072 1.467-.584.088-1.282.164-3.791-.871-3.023-1.248-4.992-4.382-5.143-4.582-.15-.2-1.229-1.637-1.229-3.125s.772-2.222 1.055-2.522c.284-.3.616-.375.823-.375.207 0 .414.004.595.011.206.008.482-.081.753.567.271.648.919 2.247.994 2.396.075.15.126.326.026.525-.101.2-.15.326-.301.526-.151.201-.318.435-.453.573-.151.151-.309.317-.134.618.176.301.782 1.291 1.682 2.096 1.164 1.042 2.138 1.365 2.44 1.516.301.151.477.126.653-.075.176-.201.753-.878.954-1.178.201-.301.402-.251.678-.151.276.101 1.745.828 2.046.978.301.151.503.226.578.351.075.126.075.727-.182 1.448z" />
  ),
  discord: (
    <path d="M8 5.5c-2.8.5-4.4 1.5-4.4 1.5S2 10 2 16c0 0 1.6 1.8 4.6 2l.9-1.4M16 5.5c2.8.5 4.4 1.5 4.4 1.5S22 10 22 16c0 0-1.6 1.8-4.6 2l-.9-1.4M8.5 14c0 1-.9 1.8-2 1.8s-2-.8-2-1.8.9-1.8 2-1.8 2 .8 2 1.8zM19.5 14c0 1-.9 1.8-2 1.8s-2-.8-2-1.8.9-1.8 2-1.8 2 .8 2 1.8z" />
  ),
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  brain: (
    <>
      <path d="M9 4a2.6 2.6 0 00-2.6 2.6c0 .3 0 .6.1.9A2.6 2.6 0 005 10c0 1 .5 1.9 1.3 2.4A2.7 2.7 0 006 14c0 1.3.9 2.4 2.1 2.7.1 1.3 1.2 2.3 2.5 2.3.9 0 1.7-.5 2.1-1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 4c1 0 1.8.5 2.3 1.3M9 20V6" strokeLinecap="round" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.5L2.5 20h19L12 3.5z" strokeLinejoin="round" />
      <path d="M12 10v4" strokeLinecap="round" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  frown: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 15.5c1-1.2 2.3-1.8 4-1.8s3 .6 4 1.8" strokeLinecap="round" />
      <circle cx="8.7" cy="9.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15.3" cy="9.5" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  bolt: (
    <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" strokeLinejoin="round" />
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.3l2.6 2.6L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  aperture: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3.5l4.8 8.3M7.2 20l4.8-8.5M4.5 8.8h9.6M19.5 15.2h-9.6M9 3.8l3 5.2M15 20.2l-3-5.2" strokeLinecap="round" />
    </>
  )
};

export default function Icon({ name, size = 18, strokeWidth = 1.8, className = "" }) {
  const isFilled = ["twitter", "telegram", "discord", "whatsapp"].includes(name);
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || null}
    </svg>
  );
}
