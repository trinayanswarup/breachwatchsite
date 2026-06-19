import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BreachChecker from '@/components/BreachChecker';

export const metadata: Metadata = {
  title: 'Has My Password Been Leaked? Free Password Checker | CipherCheck',
  description:
    'Check if your password appeared in a data breach — instantly and privately. We never see your password. Uses the Have I Been Pwned database of 900 million leaked passwords.',
};

export default function BreachCheckerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">

        <section className="bg-gradient-to-b from-blue-50 to-white px-4 pt-10 pb-8">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-bw-black sm:text-4xl">
              Check If Your Password Has Been Exposed in a Data Breach
            </h1>
            <p className="mt-4 text-lg text-bw-text">
              Enter any password to instantly check whether it has appeared in a known
              data breach. Your password never leaves your browser.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-2xl px-4 py-8 space-y-8">

          <div className="rounded-[3px] border border-blue-200 bg-bw-light p-4">
            <div className="flex gap-3">
              <span className="text-lg shrink-0" aria-hidden="true">🔒</span>
              <div>
                <p className="font-semibold text-blue-900 text-sm">How your privacy is protected</p>
                <p className="mt-1 text-sm text-bw-blue-dark">
                  Your password is never sent anywhere. Only the first 5 characters of a
                  one-way hash are checked — it is mathematically impossible to reverse
                  this into your password. We use the{' '}
                  <a
                    href="https://haveibeenpwned.com/Passwords"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-900"
                  >
                    Have I Been Pwned Passwords API
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[3px] border border-black/10 bg-white p-6 shadow-sm">
            <BreachChecker />
          </div>

          <section>
            <h2 className="text-xl font-bold text-bw-black">
              How does the breach check work?
            </h2>
            <div className="mt-4 space-y-3 text-bw-text text-sm leading-relaxed">
              <p>
                When you click &ldquo;Check this password&rdquo;, your browser converts it
                into a SHA-1 hash — a fixed-length fingerprint — entirely locally. Only
                the first five characters of that hash are ever sent to our server, which
                then queries the Have I Been Pwned database.
              </p>
              <p>
                This technique is called <strong>k-anonymity</strong>. HIBP holds over 900
                million hashed passwords from real data breaches. Because we only send a
                5-character prefix, the server cannot determine which password you checked
                — there are thousands of hashes starting with the same five characters.
              </p>
              <p>
                Your full hash is never transmitted. Your password in plain text never
                leaves your device.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-bw-black">
              What should I do if my password was found?
            </h2>
            <div className="mt-4 space-y-3 text-bw-text text-sm leading-relaxed">
              <p>
                Change it immediately on every site where you use it. Then stop reusing
                passwords. The most practical way to do that is with a password manager,
                which generates a unique random password for every account so you never
                have to remember them.
              </p>
              <p>
                <Link
                  href="/password-managers"
                  className="font-medium text-bw-blue hover:text-bw-blue-dark underline"
                >
                  See our password manager comparison →
                </Link>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-bw-black">
              Should I also enable two-factor authentication?
            </h2>
            <div className="mt-4 space-y-3 text-bw-text text-sm leading-relaxed">
              <p>
                Yes. A strong unique password protects you if a site&rsquo;s database is
                leaked. Two-factor authentication protects you even if someone already has
                your password — they still can&rsquo;t log in without your second factor.
                Together they cover your two biggest account-security risks.
              </p>
              <p>
                <Link
                  href="/2fa-apps"
                  className="font-medium text-bw-blue hover:text-bw-blue-dark underline"
                >
                  See our 2FA app comparison →
                </Link>
              </p>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}

