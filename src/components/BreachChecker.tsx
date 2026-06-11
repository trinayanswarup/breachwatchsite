'use client';

import { useState, FormEvent } from 'react';
import BreachResult from './BreachResult';

type CheckState = 'idle' | 'loading' | 'done' | 'error';

export default function BreachChecker() {
  const [password, setPassword] = useState('');
  const [state, setState] = useState<CheckState>('idle');
  const [matchCount, setMatchCount] = useState(0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!password.trim()) return;

    setState('loading');
    setMatchCount(0);

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-1', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase();

      const prefix = hashHex.slice(0, 5);
      const suffix = hashHex.slice(5);

      const response = await fetch(`/api/breach-checker?prefix=${prefix}`);

      if (!response.ok) {
        setState('error');
        return;
      }

      const text = await response.text();
      let count = 0;

      for (const line of text.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        const colonIdx = trimmed.indexOf(':');
        if (colonIdx === -1) continue;
        const lineSuffix = trimmed.slice(0, colonIdx);
        if (lineSuffix === suffix) {
          count = parseInt(trimmed.slice(colonIdx + 1), 10);
          break;
        }
      }

      setMatchCount(count);
      setState('done');
    } catch {
      setState('error');
    }
  }

  function handleReset() {
    setPassword('');
    setState('idle');
    setMatchCount(0);
  }

  return (
    <div>
      {state !== 'done' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password-input"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Enter a password to check
            </label>
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter any password…"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
              disabled={state === 'loading'}
            />
          </div>

          <button
            type="submit"
            disabled={state === 'loading' || !password.trim()}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {state === 'loading' ? 'Checking…' : 'Check this password'}
          </button>
        </form>
      )}

      {state === 'loading' && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-5">
          <span
            className="inline-block h-5 w-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin"
            aria-hidden="true"
          />
          <p className="text-gray-600 text-sm">
            Checking against 900 million leaked passwords…
          </p>
        </div>
      )}

      {state === 'done' && (
        <>
          <BreachResult count={matchCount} />
          <button
            type="button"
            onClick={handleReset}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
          >
            Check another password
          </button>
        </>
      )}

      {state === 'error' && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="font-medium text-amber-800">
            Could not reach the breach database right now.
          </p>
          <p className="mt-1 text-sm text-amber-700">
            This is a temporary issue with the external API. Please try again in
            a moment.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-3 text-sm font-medium text-amber-800 underline hover:text-amber-900 transition-colors"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
