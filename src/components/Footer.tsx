import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-black/10 bg-bw-light">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-base font-bold text-bw-black transition-colors hover:text-bw-blue"
            >
              <span className="text-bw-blue" aria-hidden="true">CC</span>
              CipherCheck
            </Link>
            <p className="mt-2 text-sm text-bw-gray">
              Honest cybersecurity tool comparisons.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-bw-gray">
              Categories
            </p>
            <ul className="mt-3 space-y-2">
              {[
                { href: '/news', label: 'Security News' },
                { href: '/tools', label: 'Free Security Tools' },
                { href: '/breaches', label: 'Recent Data Breaches' },
                { href: '/vpn', label: 'Best VPNs' },
                { href: '/password-managers', label: 'Best Password Managers' },
                { href: '/antivirus', label: 'Best Antivirus' },
                { href: '/2fa-apps', label: 'Best 2FA Apps' },
                { href: '/quiz', label: 'Free Security Quiz' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-bw-text transition-colors hover:text-bw-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-bw-gray">
              Legal
            </p>
            <ul className="mt-3 space-y-2">
              {[
                { href: '/about', label: 'About' },
                { href: '/how-we-test', label: 'How We Test' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/disclosure', label: 'Funding & Independence' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-bw-text transition-colors hover:text-bw-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-black/10 pt-6">
          <p className="text-xs text-bw-gray">
            <strong>Independence note:</strong> CipherCheck uses direct
            product links, not affiliate links. Scores are calculated from documented
            criteria, not paid placements.{' '}
            <Link href="/disclosure" className="underline hover:text-bw-text">
              Learn more -&gt;
            </Link>
          </p>
          <p className="mt-3 text-xs text-bw-gray">
            &copy; {year} CipherCheck. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
