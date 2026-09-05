"use client";
import { footerColumns } from "../data/content";
import Link from 'next/link';
import Image from 'next/image';
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow" aria-hidden="true" />

      <div className="container footer__top reveal">
        <div className="footer__brand">
          <Link href="/" className="footer__logo">
            <Image src="/images/logo-navbar.png" width={48} height={48} alt="AURUM GOLD EA Gold Expert Advisor logo" className="footer__logo-mark" />
            <span className="footer__logo-text">
              AURUM<span className="footer__logo-thin">GOLD EA</span>
            </span>
          </Link>
        </div>

        <div className="footer__columns">
          {footerColumns.map((col) => (
            <div className="footer__col" key={col.heading}>
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>
                      <span>{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer__strip">
        <div className="container footer__strip-row">
          <div className="footer__legal">
            <span>© {new Date().getFullYear()} AURUM GOLD EA</span>
            <span className="footer__legal-sep" aria-hidden="true" />
            <a href="https://get.aurum-goldea.com" className="footer__legal-link">aurum-goldea.com</a>
            <span className="footer__legal-sep" aria-hidden="true" />
            <span>All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
