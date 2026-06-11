'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/news', label: 'News' },
  { href: '/tools', label: 'Tools' },
  { href: '/breaches', label: 'Breaches' },
  { href: '/vpn', label: 'VPNs' },
  { href: '/password-managers', label: 'Password Managers' },
  { href: '/antivirus', label: 'Antivirus' },
  { href: '/2fa-apps', label: '2FA Apps' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black/10">
      <nav
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <span className="bg-bw-blue text-white text-[13px] font-bold px-1.5 py-0.5 rounded-sm" aria-hidden="true">
            BW
          </span>
          <span className="text-[20px] font-bold text-bw-black">BreachWatch</span>
        </Link>

        {/* Desktop links + buttons */}
        <div className="hidden items-center gap-5 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] text-bw-gray hover:text-bw-black transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2">
            <Link
              href="/quiz"
              className="text-[13px] font-medium px-3.5 py-1.5 rounded-[3px] border border-bw-blue text-bw-blue bg-white hover:bg-bw-light transition-colors"
            >
              Quiz
            </Link>
            <Link
              href="/breach-checker"
              className="text-[13px] font-medium px-3.5 py-1.5 rounded-[3px] bg-bw-blue text-white hover:bg-bw-blue-dark transition-colors"
            >
              Breach Checker
            </Link>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex items-center justify-center p-2 text-bw-gray md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <span aria-hidden="true" className="text-xl">{menuOpen ? '✕' : '☰'}</span>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-black/10 px-5 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 text-sm rounded-[3px] text-bw-gray hover:text-bw-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quiz"
              onClick={() => setMenuOpen(false)}
              className="mt-2 px-3 py-2.5 text-sm font-medium text-center rounded-[3px] border border-bw-blue text-bw-blue"
            >
              Quiz
            </Link>
            <Link
              href="/breach-checker"
              onClick={() => setMenuOpen(false)}
              className="mt-1 px-3 py-2.5 text-sm font-medium text-center rounded-[3px] bg-bw-blue text-white hover:bg-bw-blue-dark transition-colors"
            >
              Breach Checker
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
