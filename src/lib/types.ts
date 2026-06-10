export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  website: string;
  affiliateUrl: string;
  scores: Record<string, number>;
  pricing: {
    monthly: number;
    annual: number;
    currency: string;
  };
  highlights: string[];
  verdict: string;
  bestFor: string;
}

export interface Criterion {
  id: string;
  name: string;
  weight: number;
  description: string;
  higherIsBetter: boolean;
}

export interface ScoringCriteria {
  vpn: Criterion[];
  'password-manager': Criterion[];
  antivirus: Criterion[];
  '2fa-apps': Criterion[];
}
