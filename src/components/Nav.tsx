'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/vpn', label: 'VPN' },
  { href: '/password-managers', label: 'Password Managers' },
  { href: '/antivirus', label: 'Antivirus' },
  { href: '/2fa-apps', label: '2FA Apps' },
  { href: '/breach-checker', label: 'Breach Checker' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors"
        >
          <span className="text-blue-600" aria-hidden="true">🛡</span>
          BreachWatch
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/quiz"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Take the quiz →
          </Link>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen ? 'true' : 'false'}
          aria-label="Toggle menu"
        >
          <span aria-hidden="true" className="text-xl">
            {menuOpen ? '✕' : '☰'}
          </span>
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quiz"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Take the quiz →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
