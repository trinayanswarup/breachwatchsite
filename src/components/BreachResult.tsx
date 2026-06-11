import Link from 'next/link';

export interface BreachResultProps {
  count: number;
}

export default function BreachResult({ count }: BreachResultProps) {
  const found = count > 0;

  return (
    <div className="mt-6 space-y-4">
      {found ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-2xl" aria-hidden="true">⚠️</span>
            <div>
              <p className="font-semibold text-red-800 text-lg">
                This password has been exposed
              </p>
              <p className="mt-1 text-red-700 text-sm">
                It appeared in{' '}
                <strong>{count.toLocaleString()}</strong>{' '}
                {count === 1 ? 'known data breach' : 'known data breaches'}.
                Anyone using this password is at risk.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-2xl" aria-hidden="true">✅</span>
            <div>
              <p className="font-semibold text-green-800 text-lg">
                This password has not appeared in any known data breaches
              </p>
              <p className="mt-1 text-green-700 text-sm">
                No matches found across 900 million leaked passwords.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm text-blue-800">
          {found ? (
            <>
              <strong>A password manager generates unique unguessable passwords for every site</strong>
              {' — '}
              <Link
                href="/password-managers"
                className="underline hover:text-blue-900 transition-colors"
              >
                see our recommendations →
              </Link>
            </>
          ) : (
            <>
              <strong>Good — but are you reusing this password on multiple sites?</strong>
              {' '}A password manager ensures every account has a unique password
              {' — '}
              <Link
                href="/password-managers"
                className="underline hover:text-blue-900 transition-colors"
              >
                see our recommendations →
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
