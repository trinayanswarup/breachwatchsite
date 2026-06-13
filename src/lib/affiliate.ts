export const affiliateLinks: Record<string, string> = {
  nordvpn: 'PLACEHOLDER',
  expressvpn: 'PLACEHOLDER',
  surfshark: 'PLACEHOLDER',
  mullvad: 'https://mullvad.net',
  protonvpn: 'PLACEHOLDER',
  bitwarden: 'https://bitwarden.com',
  onepassword: 'PLACEHOLDER',
  dashlane: 'PLACEHOLDER',
  nordpass: 'PLACEHOLDER',
  keeper: 'PLACEHOLDER',
  protonpass: 'PLACEHOLDER',
  malwarebytes: 'PLACEHOLDER',
  bitdefender: 'PLACEHOLDER',
  norton: 'PLACEHOLDER',
  eset: 'PLACEHOLDER',
};

export function buildAffiliateUrl(
  href: string,
  product: string,
  category: string,
  pageType: string
): string {
  if (!href || href === 'PLACEHOLDER') {
    return `/reviews/${product}`;
  }

  void category;
  void pageType;
  return href;
}


