"use client";
import { useEffect, useState } from "react";
import { navLinks } from "../data/content";
import Icon from "./Icon";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import "./Navbar.css";

export default function Navbar() {
  const path = usePathname(); const router = useRouter();;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (path !== "/") {
      setActiveHash("");
      return;
    }
    const sections = navLinks
      .filter((l) => l.href.includes("#"))
      .map((l) => document.querySelector(`#${l.href.split("#")[1]}`))
      .filter(Boolean);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHash(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [path]);

  function isActive(href) {
    if (href.includes("#")) {
      return path === "/" && activeHash === `#${href.split("#")[1]}`;
    }
    return path === href;
  }

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__row">
        <Link href="/" className="nav__logo" onClick={() => setOpen(false)}>
          <span className="nav__logo-mark-wrap">
            <Image src="/images/logo-navbar.png" width={48} height={48} alt="AURUM GOLD EA Gold Expert Advisor logo" className="nav__logo-mark"/>
          </span>
            <span className="nav__logo-copy">
              <span className="nav__logo-text">
                AURUM<span className="nav__logo-thin">GOLD EA</span>
              </span>
            </span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav__link ${isActive(link.href) ? "is-active" : ""}`}
            >
              <Icon name={link.icon} size={15} strokeWidth={1.9} className="nav__link-icon" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="nav__actions">
          <span className="nav__divider" aria-hidden="true" />
          <Link href="/pricing#pricing" className="btn btn--gold nav__cta">
            Get Started
            <Icon name="trend" size={15} strokeWidth={2.1} />
          </Link>
          <button
            className={`nav__burger ${open ? "is-open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`nav__mobile ${open ? "is-open" : ""}`}>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="nav__mobile-link" onClick={() => setOpen(false)}>
            <Icon name={link.icon} size={17} strokeWidth={1.8} />
            {link.label}
          </Link>
        ))}
        <Link href="/pricing#pricing" className="btn btn--gold" onClick={() => setOpen(false)}>
          Get Started
        </Link>
      </div>
    </header>
  );
}
