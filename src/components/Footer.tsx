import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-base font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <span className="text-blue-600" aria-hidden="true">🛡</span>
              BreachWatch
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Honest cybersecurity tool comparisons. Transparent scoring, no
              hidden bias.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Categories
            </p>
            <ul className="mt-3 space-y-2">
              {[
                { href: '/vpn', label: 'Best VPNs' },
                { href: '/password-managers', label: 'Best Password Managers' },
                { href: '/antivirus', label: 'Best Antivirus' },
                { href: '/2fa-apps', label: 'Best 2FA Apps' },
                { href: '/quiz', label: 'Free Security Quiz' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Legal
            </p>
            <ul className="mt-3 space-y-2">
              {[
                { href: '/about', label: 'About' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/disclosure', label: 'Affiliate Disclosure' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-xs text-gray-500">
            <strong>Affiliate disclosure:</strong> BreachWatch earns commissions
            on some links at no extra cost to you. Our scores are calculated
            algorithmically from documented criteria — commissions never affect
            rankings.{' '}
            <Link href="/disclosure" className="underline hover:text-gray-700">
              Full disclosure →
            </Link>
          </p>
          <p className="mt-3 text-xs text-gray-400">
            © {year} BreachWatch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
