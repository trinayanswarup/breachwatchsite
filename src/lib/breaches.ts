export interface HIBPBreach {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  AddedDate: string;
  PwnCount: number;
  DataClasses: string[];
  IsVerified: boolean;
}

export interface BreachSeverity {
  label: 'Critical' | 'Large' | 'Medium' | 'Small';
  className: string;
}

export interface BreachActionLink {
  href: string;
  label: string;
}

export function formatBreachCount(count: number): string {
  if (count >= 1_000_000_000) return `${(count / 1_000_000_000).toFixed(1)}B`;
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${Math.round(count / 1_000)}K`;
  return count.toLocaleString();
}

export function formatBreachDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getBreachSeverity(count: number): BreachSeverity {
  if (count >= 100_000_000) {
    return { label: 'Critical', className: 'bg-red-100 text-red-700' };
  }

  if (count >= 10_000_000) {
    return { label: 'Large', className: 'bg-orange-100 text-orange-700' };
  }

  if (count >= 1_000_000) {
    return { label: 'Medium', className: 'bg-amber-100 text-amber-700' };
  }

  return { label: 'Small', className: 'bg-gray-100 text-bw-text' };
}

export function getBreachAdvice(dataClasses: string[]): string[] {
  const exposed = new Set(dataClasses.map((item) => item.toLowerCase()));
  const advice: string[] = [];

  if (exposed.has('passwords')) {
    advice.push('Change this password and any other account that reused it.');
  }

  if (
    exposed.has('government issued ids') ||
    exposed.has('social security numbers') ||
    exposed.has('passport numbers') ||
    exposed.has('drivers licenses')
  ) {
    advice.push('Freeze or monitor credit files and watch for identity theft attempts.');
  }

  if (
    exposed.has('health insurance information') ||
    exposed.has('medical records') ||
    exposed.has('insurance information')
  ) {
    advice.push('Contact your insurer and watch for unfamiliar medical claims or benefit notices.');
  }

  if (exposed.has('email addresses') || exposed.has('names')) {
    advice.push(
      exposed.has('passwords')
        ? 'Expect targeted phishing and turn on 2FA for important accounts.'
        : 'Watch for targeted phishing; no password reset is needed unless passwords were exposed or reused.'
    );
  }

  if (exposed.has('phone numbers')) {
    advice.push('Be alert for SMS phishing and SIM-swap attempts.');
  }

  if (exposed.has('credit cards') || exposed.has('payment histories')) {
    advice.push('Monitor bank statements and card activity for unfamiliar charges.');
  }

  if (exposed.has('ip addresses') || exposed.has('physical addresses')) {
    advice.push('Treat follow-up messages as higher risk because attackers may personalize them.');
  }

  if (advice.length === 0) {
    advice.push('Review exposed data types and change credentials on any affected account.');
  }

  return advice.slice(0, 3);
}

export function getBreachActionLinks(dataClasses: string[]): BreachActionLink[] {
  const exposed = new Set(dataClasses.map((item) => item.toLowerCase()));
  const links: BreachActionLink[] = [];

  if (exposed.has('passwords')) {
    links.push(
      { href: '/breach-checker', label: 'Check a password' },
      { href: '/password-managers', label: 'Compare password managers' }
    );
  }

  if (exposed.has('email addresses') || exposed.has('phone numbers')) {
    links.push({ href: '/quiz', label: 'Find your biggest account risk' });
  }

  if (
    exposed.has('government issued ids') ||
    exposed.has('social security numbers') ||
    exposed.has('passport numbers') ||
    exposed.has('drivers licenses') ||
    exposed.has('health insurance information') ||
    exposed.has('medical records') ||
    exposed.has('insurance information')
  ) {
    links.push({ href: '/breaches', label: 'Review breach response basics' });
  }

  return links
    .filter((link, index, all) => all.findIndex((item) => item.href === link.href) === index)
    .slice(0, 2);
}
