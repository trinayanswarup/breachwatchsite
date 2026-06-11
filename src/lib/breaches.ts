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
    advice.push('Change reused passwords immediately and check old passwords for known leaks.');
  }

  if (exposed.has('email addresses')) {
    advice.push('Watch for phishing emails and enable 2FA on important accounts.');
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
