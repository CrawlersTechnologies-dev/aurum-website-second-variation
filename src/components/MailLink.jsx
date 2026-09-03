"use client";

const EMAIL = "support@aurum-goldea.com";
const SUBJECT = "AURUM Inquiry";

function buildMailto() {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`;
}

function buildGmailCompose() {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: EMAIL,
    su: SUBJECT
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export default function MailLink({ className, children }) {
  const mailto = buildMailto();

  const handleClick = (e) => {
    e.preventDefault();
    const started = Date.now();
    window.location.href = mailto;

    // Some browsers / embedded webviews ignore mailto. Fall back to Gmail compose.
    window.setTimeout(() => {
      if (document.hasFocus() && Date.now() - started < 2000) {
        window.open(buildGmailCompose(), "_blank", "noopener,noreferrer");
      }
    }, 600);
  };

  return (
    <a href={mailto} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
