'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

const LOWER = 'abcdefghijkmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const NUMBERS = '23456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{};:,.?';

const breachSteps = [
  'Change the exposed password',
  'Change reused passwords on other sites',
  'Turn on 2FA for the account',
  'Check recent account activity',
  'Watch for phishing messages',
  'Use a password manager going forward',
];

const twoFaSteps = [
  'Save backup codes somewhere offline',
  'Add a second 2FA device where supported',
  'Export or back up authenticator tokens',
  'Confirm account recovery email is secure',
  'Remove old phones you no longer use',
  'Print recovery codes for critical accounts',
];

const vpnSituations = [
  'I use public WiFi often',
  'I travel or work from hotels/airports',
  'I want to hide traffic from my internet provider',
  'I need safer browsing on shared networks',
  'I expect a VPN to stop phishing or malware',
];

function randomInt(max: number) {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return values[0] % max;
}

function shuffle(text: string[]) {
  const result = [...text];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function generatePassword(length: number, useSymbols: boolean) {
  const groups = [LOWER, UPPER, NUMBERS, ...(useSymbols ? [SYMBOLS] : [])];
  const allChars = groups.join('');
  const password = groups.map((group) => group[randomInt(group.length)]);

  while (password.length < length) {
    password.push(allChars[randomInt(allChars.length)]);
  }

  return shuffle(password).join('');
}

export default function ToolsWorkbench() {
  const [passwordLength, setPasswordLength] = useState(18);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [breachDone, setBreachDone] = useState<string[]>([]);
  const [twoFaDone, setTwoFaDone] = useState<string[]>([]);
  const [vpnAnswers, setVpnAnswers] = useState<string[]>([]);

  const vpnResult = useMemo(() => {
    const expectsTooMuch = vpnAnswers.includes('I expect a VPN to stop phishing or malware');
    const usefulCount = vpnAnswers.filter((answer) => answer !== 'I expect a VPN to stop phishing or malware').length;

    if (expectsTooMuch && usefulCount === 0) {
      return 'A VPN is not the fix for that. Start with passwords, 2FA, updates, and safer browsing habits.';
    }

    if (usefulCount >= 2) {
      return 'A VPN is useful for you, mainly for network privacy on shared or untrusted WiFi.';
    }

    if (usefulCount === 1) {
      return 'A VPN can help sometimes, but it is probably not your first security priority.';
    }

    return 'You probably do not need a VPN first. Fix password reuse and 2FA before spending money.';
  }, [vpnAnswers]);

  function toggleValue(value: string, current: string[], setCurrent: (next: string[]) => void) {
    setCurrent(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  function handleGenerate() {
    setPassword(generatePassword(passwordLength, useSymbols));
    setCopied(false);
  }

  async function handleCopy() {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
  }

  return (
    <section className="border-t border-black/10 bg-bw-light px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 max-w-3xl">
          <h2 className="text-[22px] font-bold text-bw-black">More free tools</h2>
          <p className="mt-2 text-[14px] leading-6 text-bw-gray">
            Simple browser-safe utilities. No accounts, no saved personal data, no fake dashboards.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[3px] border border-black/10 bg-white p-5">
            <h3 className="text-[18px] font-bold text-bw-black">Password generator</h3>
            <p className="mt-2 text-[13px] leading-5 text-bw-gray">
              Generates locally in your browser.
            </p>
            <div className="mt-4 rounded-[3px] border border-black/10 bg-bw-light px-3 py-3 font-mono text-[15px] text-bw-black break-all">
              {password || 'Click Generate to create a password'}
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="text-[13px] font-medium text-bw-text">
                Length: {passwordLength}
                <input
                  type="range"
                  min="12"
                  max="32"
                  value={passwordLength}
                  onChange={(event) => setPasswordLength(Number(event.target.value))}
                  className="mt-2 block w-full sm:w-48"
                />
              </label>
              <label className="flex items-center gap-2 text-[13px] text-bw-text">
                <input
                  type="checkbox"
                  checked={useSymbols}
                  onChange={(event) => setUseSymbols(event.target.checked)}
                />
                Symbols
              </label>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleGenerate}
                className="rounded-[3px] bg-bw-blue px-4 py-2 text-[13px] font-semibold text-white hover:bg-bw-blue-dark"
              >
                Generate
              </button>
              <button
                type="button"
                onClick={handleCopy}
                disabled={!password}
                className="rounded-[3px] border border-bw-blue px-4 py-2 text-[13px] font-semibold text-bw-blue hover:bg-bw-light"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="rounded-[3px] border border-black/10 bg-white p-5">
            <h3 className="text-[18px] font-bold text-bw-black">VPN need checker</h3>
            <p className="mt-2 text-[13px] leading-5 text-bw-gray">
              Checks whether a VPN solves your actual problem.
            </p>
            <div className="mt-4 space-y-2">
              {vpnSituations.map((item) => (
                <label key={item} className="flex gap-2 text-[13px] text-bw-text">
                  <input
                    type="checkbox"
                    checked={vpnAnswers.includes(item)}
                    onChange={() => toggleValue(item, vpnAnswers, setVpnAnswers)}
                    className="mt-0.5"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
            <p className="mt-4 rounded-[3px] border border-bw-blue/30 bg-blue-50 px-4 py-3 text-[13px] font-medium leading-5 text-bw-black">
              {vpnResult}
            </p>
            <p className="mt-3 text-[12px] leading-5 text-bw-gray">
              Most users should prioritize a password manager and 2FA first. If you have
              already done that, or you travel frequently, compare the{' '}
              <Link href="/vpn" className="font-semibold text-bw-blue underline hover:text-bw-blue-dark">
                VPNs worth considering
              </Link>
              .
            </p>
          </div>

          <ChecklistCard
            title="Breach response checklist"
            description="Use this right after a breach notice or suspicious login."
            items={breachSteps}
            checked={breachDone}
            onToggle={(item) => toggleValue(item, breachDone, setBreachDone)}
          />

          <ChecklistCard
            title="2FA recovery checklist"
            description="Make sure 2FA protects you without locking you out."
            items={twoFaSteps}
            checked={twoFaDone}
            onToggle={(item) => toggleValue(item, twoFaDone, setTwoFaDone)}
          />
        </div>
      </div>
    </section>
  );
}

interface ChecklistCardProps {
  title: string;
  description: string;
  items: string[];
  checked: string[];
  onToggle: (item: string) => void;
}

function ChecklistCard({ title, description, items, checked, onToggle }: ChecklistCardProps) {
  return (
    <div className="rounded-[3px] border border-black/10 bg-white p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-[18px] font-bold text-bw-black">{title}</h3>
          <p className="mt-2 text-[13px] leading-5 text-bw-gray">{description}</p>
        </div>
        <p className="shrink-0 rounded-[3px] bg-bw-light px-2 py-1 text-[12px] font-semibold text-bw-text">
          {checked.length}/{items.length}
        </p>
      </div>
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <label key={item} className="flex gap-2 text-[13px] text-bw-text">
            <input
              type="checkbox"
              checked={checked.includes(item)}
              onChange={() => onToggle(item)}
              className="mt-0.5"
            />
            <span className={checked.includes(item) ? 'text-bw-gray line-through' : ''}>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
