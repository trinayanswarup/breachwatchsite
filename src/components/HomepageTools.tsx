'use client';

import { useState } from 'react';
import BreachChecker from '@/components/BreachChecker';

interface DnsResult {
  ip: string;
  isp?: string;
  country_name?: string;
}

interface StrengthResult {
  score: number;
  label: string;
  labelColor: string;
  barColor: string;
  tips: string[];
}

function analysePassword(pw: string): StrengthResult {
  const tips: string[] = [];
  let score = 0;

  if (pw.length >= 20) score += 30;
  else if (pw.length >= 16) score += 22;
  else if (pw.length >= 12) score += 14;
  else if (pw.length >= 8) score += 6;
  else tips.push('Use at least 12 characters');

  if (/[a-z]/.test(pw)) score += 10;
  else tips.push('Add lowercase letters');

  if (/[A-Z]/.test(pw)) score += 10;
  else tips.push('Add uppercase letters');

  if (/[0-9]/.test(pw)) score += 15;
  else tips.push('Add numbers');

  if (/[^a-zA-Z0-9]/.test(pw)) score += 20;
  else tips.push('Add symbols such as ! @ # $ %');

  if (/(.)\1{2,}/.test(pw)) {
    score = Math.max(0, score - 10);
    tips.push('Avoid repeating the same character');
  }

  if (/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(pw)) {
    score = Math.max(0, score - 10);
    tips.push('Avoid sequential characters like abc or 123');
  }

  if (/^(?:password|qwerty|letmein|welcome|admin|login|iloveyou|monkey|dragon|master)/i.test(pw)) {
    score = Math.max(0, score - 20);
    tips.push('Avoid common passwords');
  }

  const clamped = Math.min(100, Math.max(0, score));

  let label: string;
  let labelColor: string;
  let barColor: string;

  if (clamped >= 75) {
    label = 'Strong';
    labelColor = 'text-green-700';
    barColor = 'bg-green-500';
  } else if (clamped >= 50) {
    label = 'Good';
    labelColor = 'text-yellow-700';
    barColor = 'bg-yellow-400';
  } else if (clamped >= 25) {
    label = 'Weak';
    labelColor = 'text-orange-700';
    barColor = 'bg-orange-400';
  } else {
    label = 'Very weak';
    labelColor = 'text-red-700';
    barColor = 'bg-red-500';
  }

  return { score: clamped, label, labelColor, barColor, tips };
}

function DnsLeakTool() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [result, setResult] = useState<DnsResult | null>(null);

  async function runTest() {
    setStatus('loading');
    try {
      const res = await fetch('https://api.ipleak.net/json/');
      if (!res.ok) throw new Error('bad response');
      const data = (await res.json()) as DnsResult;
      setResult(data);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="flex flex-col gap-3 border border-black/15 bg-white p-5">
      <div>
        <h3 className="text-[15px] font-bold text-bw-black tracking-tight">DNS Leak Test</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-bw-text">
          Shows your current IP, ISP, and country. Useful for checking whether a VPN is actually routing your traffic.
        </p>
      </div>

      {status === 'idle' && (
        <button
          type="button"
          onClick={runTest}
          className="mt-1 self-start rounded-none border border-bw-blue px-4 py-2 text-[13px] font-bold text-bw-blue hover:bg-bw-light transition-colors uppercase tracking-wide"
        >
          Run test
        </button>
      )}

      {status === 'loading' && (
        <div className="flex items-center gap-2 text-[13px] text-bw-gray">
          <span
            className="inline-block h-4 w-4 rounded-full border-2 border-bw-blue border-t-transparent animate-spin"
            aria-hidden="true"
          />
          Fetching...
        </div>
      )}

      {status === 'done' && result && (
        <div className="space-y-1.5 rounded-none border border-black/10 bg-bw-light p-4">
          <p className="text-[13px] text-bw-text">
            <span className="font-semibold">IP:</span> {result.ip}
          </p>
          {result.isp && (
            <p className="text-[13px] text-bw-text">
              <span className="font-semibold">ISP:</span> {result.isp}
            </p>
          )}
          {result.country_name && (
            <p className="text-[13px] text-bw-text">
              <span className="font-semibold">Country:</span> {result.country_name}
            </p>
          )}
          <button
            type="button"
            onClick={() => { setStatus('idle'); setResult(null); }}
            className="mt-2 text-[12px] text-bw-gray underline hover:text-bw-text transition-colors"
          >
            Run again
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-none border border-amber-200 bg-amber-50 p-4 text-[13px] text-amber-800">
          Could not reach the test endpoint.{' '}
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="underline hover:text-amber-900 transition-colors"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

function PasswordStrengthTool() {
  const [password, setPassword] = useState('');
  const result = password ? analysePassword(password) : null;

  return (
    <div className="flex flex-col gap-3 border border-black/15 bg-white p-5">
      <div>
        <h3 className="text-[15px] font-bold text-bw-black tracking-tight">Password Strength Checker</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-bw-text">
          Scored locally in your browser on length, variety, and common patterns. Nothing is sent anywhere.
        </p>
      </div>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Type a password to check..."
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        className="rounded-none border border-black/20 px-3 py-2 text-[13px] text-bw-black placeholder-bw-gray focus:border-bw-blue focus:outline-none focus:ring-1 focus:ring-bw-blue/20 transition-colors"
      />

      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className={`text-[13px] font-semibold ${result.labelColor}`}>{result.label}</span>
            <span className="text-[12px] text-bw-gray">{result.score}/100</span>
          </div>
          <div className="h-1.5 w-full rounded-none bg-black/10">
            <div
              className={`h-full rounded-none transition-all ${result.barColor}`}
              style={{ width: `${result.score}%` }}
            />
          </div>
          {result.tips.length > 0 && (
            <ul className="space-y-1 pt-1">
              {result.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-1.5 text-[12px] text-bw-gray">
                  <span aria-hidden="true" className="mt-px shrink-0">+</span>
                  {tip}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function InlineBreachChecker() {
  return (
    <div className="flex flex-col gap-3 border border-black/15 bg-white p-5">
      <div>
        <h3 className="text-[15px] font-bold text-bw-black tracking-tight">Have I Been Pwned</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-bw-text">
          Checks against 900 million leaked passwords using k-anonymity. Only the first 5 characters of your SHA-1 hash are ever sent.
        </p>
      </div>
      <BreachChecker />
    </div>
  );
}

export default function HomepageTools() {
  return (
    <section className="border-b border-black/15 bg-gray-50 px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/15 pb-4">
          <div>
            <h2 className="text-[24px] font-bold text-bw-black tracking-tight">
              Free Security Tools
            </h2>
            <p className="mt-2 text-[14px] text-bw-gray">
              Practical checks you can run immediately. No account required.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <DnsLeakTool />
          <PasswordStrengthTool />
          <InlineBreachChecker />
        </div>
      </div>
    </section>
  );
}
