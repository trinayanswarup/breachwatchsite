export type ComparisonWinner = 'left' | 'right' | 'tie';

export interface ComparisonRow {
  label: string;
  left: string;
  right: string;
  winner: ComparisonWinner;
}

export interface SimpleComparison {
  slug: string;
  title: string;
  description: string;
  categoryHref: string;
  categoryLabel: string;
  leftName: string;
  rightName: string;
  winnerName: string;
  verdict: string;
  leftBestFor: string;
  rightBestFor: string;
  keyDifferences: string[];
  rows: ComparisonRow[];
  related: { href: string; label: string }[];
}

export const simpleComparisons: SimpleComparison[] = [
  {
    slug: 'mullvad-vs-protonvpn',
    title: 'Mullvad vs Proton VPN',
    description: 'Two privacy-first VPNs compared without filler.',
    categoryHref: '/vpn',
    categoryLabel: 'Best VPNs',
    leftName: 'Mullvad',
    rightName: 'Proton VPN',
    winnerName: 'Mullvad',
    verdict:
      'Pick Mullvad if maximum privacy matters most. Pick Proton VPN if you want strong privacy plus a usable free tier.',
    leftBestFor: 'People who want no email signup, anonymous payment options, and minimal account data.',
    rightBestFor: 'People who want a polished VPN ecosystem, Swiss jurisdiction, and a trustworthy free plan.',
    keyDifferences: [
      'Mullvad is stricter about account privacy: no email address is required.',
      'Proton VPN is easier for most beginners and has the better free plan.',
      'Both are strong picks, but Mullvad is the cleaner privacy recommendation.',
    ],
    rows: [
      { label: 'Privacy', left: 'No email signup', right: 'Strong Swiss privacy model', winner: 'left' },
      { label: 'Free plan', left: 'No free tier', right: 'Unlimited free VPN tier', winner: 'right' },
      { label: 'Ease of use', left: 'Simple but bare', right: 'More beginner-friendly', winner: 'right' },
      { label: 'Best pick', left: 'Hardcore privacy', right: 'Privacy plus convenience', winner: 'left' },
    ],
    related: [
      { href: '/vpn', label: 'See all VPN rankings' },
      { href: '/reviews/nordvpn-vs-expressvpn', label: 'NordVPN vs ExpressVPN' },
    ],
  },
  {
    slug: 'surfshark-vs-nordvpn',
    title: 'Surfshark vs NordVPN',
    description: 'Budget VPN versus mainstream VPN brand.',
    categoryHref: '/vpn',
    categoryLabel: 'Best VPNs',
    leftName: 'Surfshark',
    rightName: 'NordVPN',
    winnerName: 'Surfshark',
    verdict:
      'Pick Surfshark for price and unlimited devices. Pick NordVPN if brand maturity matters more than value.',
    leftBestFor: 'Families or users with many devices who want a lower price.',
    rightBestFor: 'Users who want the bigger VPN brand and do not mind paying more.',
    keyDifferences: [
      'Surfshark usually wins on price and device allowance.',
      'NordVPN has stronger brand recognition and a longer standalone reputation.',
      'Privacy-conscious users should remember both sit inside the Nord Security orbit.',
    ],
    rows: [
      { label: 'Price', left: 'Usually cheaper', right: 'Usually higher', winner: 'left' },
      { label: 'Devices', left: 'Unlimited', right: 'Limited plan allowance', winner: 'left' },
      { label: 'Brand maturity', left: 'Younger brand', right: 'More established', winner: 'right' },
      { label: 'Best pick', left: 'Value', right: 'Mainstream comfort', winner: 'left' },
    ],
    related: [
      { href: '/vpn', label: 'See all VPN rankings' },
      { href: '/reviews/nordvpn', label: 'NordVPN full review' },
    ],
  },
  {
    slug: 'expressvpn-vs-vpn-alternatives',
    title: 'ExpressVPN vs VPN Alternatives',
    description: 'When ExpressVPN is worth skipping.',
    categoryHref: '/vpn',
    categoryLabel: 'Best VPNs',
    leftName: 'ExpressVPN',
    rightName: 'Top alternatives',
    winnerName: 'Top alternatives',
    verdict:
      'ExpressVPN is polished, but privacy-focused users get cleaner signals from Mullvad or Proton VPN.',
    leftBestFor: 'Users who want a premium mainstream VPN and simple apps.',
    rightBestFor: 'Users who care more about privacy, transparent pricing, or open source signals.',
    keyDifferences: [
      'ExpressVPN is expensive compared with several strong alternatives.',
      'The Kape ownership history matters for privacy-sensitive buyers.',
      'Mullvad and Proton VPN are better aligned with BreachWatch scoring priorities.',
    ],
    rows: [
      { label: 'Price', left: 'Premium', right: 'Often cheaper', winner: 'right' },
      { label: 'Privacy signal', left: 'Mixed due to ownership context', right: 'Cleaner top picks', winner: 'right' },
      { label: 'Polish', left: 'Very polished', right: 'Varies by provider', winner: 'left' },
      { label: 'Best pick', left: 'Convenience', right: 'Privacy/value', winner: 'right' },
    ],
    related: [
      { href: '/reviews/nordvpn-vs-expressvpn', label: 'NordVPN vs ExpressVPN' },
      { href: '/vpn', label: 'See all VPN rankings' },
    ],
  },
  {
    slug: 'proton-pass-vs-bitwarden',
    title: 'Proton Pass vs Bitwarden',
    description: 'Privacy bundle versus open-source value.',
    categoryHref: '/password-managers',
    categoryLabel: 'Best Password Managers',
    leftName: 'Proton Pass',
    rightName: 'Bitwarden',
    winnerName: 'Bitwarden',
    verdict:
      'Pick Bitwarden for the best overall password manager value. Pick Proton Pass if email aliases are central to your setup.',
    leftBestFor: 'Proton users who want password management and email aliases together.',
    rightBestFor: 'Most people who want a proven, open-source password manager at a low price.',
    keyDifferences: [
      'Bitwarden is more mature and better proven as a standalone password manager.',
      'Proton Pass is compelling if you already live in the Proton ecosystem.',
      'Bitwarden wins on broad value; Proton Pass wins on privacy bundle convenience.',
    ],
    rows: [
      { label: 'Maturity', left: 'Newer', right: 'More established', winner: 'right' },
      { label: 'Privacy extras', left: 'Email aliases built in', right: 'Password vault focused', winner: 'left' },
      { label: 'Free value', left: 'Good', right: 'Excellent', winner: 'right' },
      { label: 'Best pick', left: 'Proton ecosystem', right: 'Most users', winner: 'right' },
    ],
    related: [
      { href: '/reviews/bitwarden', label: 'Bitwarden full review' },
      { href: '/reviews/bitwarden-vs-1password', label: 'Bitwarden vs 1Password' },
    ],
  },
  {
    slug: '1password-vs-keeper',
    title: '1Password vs Keeper',
    description: 'Premium UX versus compliance-heavy password management.',
    categoryHref: '/password-managers',
    categoryLabel: 'Best Password Managers',
    leftName: '1Password',
    rightName: 'Keeper',
    winnerName: '1Password',
    verdict:
      'Pick 1Password for personal and family UX. Pick Keeper when business controls matter more.',
    leftBestFor: 'People who want the most polished password manager experience.',
    rightBestFor: 'Businesses that care about admin controls, compliance, and policy management.',
    keyDifferences: [
      '1Password is easier to recommend to normal users because the UX is cleaner.',
      'Keeper is stronger when compliance and admin controls are the buying reason.',
      'Neither is the cheapest choice; this is a premium comparison.',
    ],
    rows: [
      { label: 'Personal UX', left: 'Excellent', right: 'Good', winner: 'left' },
      { label: 'Business controls', left: 'Strong', right: 'Very strong', winner: 'right' },
      { label: 'Price', left: 'Premium', right: 'Premium', winner: 'tie' },
      { label: 'Best pick', left: 'Individuals/families', right: 'Business teams', winner: 'left' },
    ],
    related: [
      { href: '/password-managers', label: 'See all password managers' },
      { href: '/reviews/bitwarden-vs-1password', label: 'Bitwarden vs 1Password' },
    ],
  },
  {
    slug: 'nordpass-vs-dashlane',
    title: 'NordPass vs Dashlane',
    description: 'Security ecosystem versus bundled premium features.',
    categoryHref: '/password-managers',
    categoryLabel: 'Best Password Managers',
    leftName: 'NordPass',
    rightName: 'Dashlane',
    winnerName: 'NordPass',
    verdict:
      'Pick NordPass if you already use Nord products. Pick Dashlane if you specifically want the extra bundle.',
    leftBestFor: 'Users already inside the Nord ecosystem.',
    rightBestFor: 'Users who want more bundled extras and do not mind the price.',
    keyDifferences: [
      'NordPass is cleaner if you want a simple password manager tied to a security ecosystem.',
      'Dashlane leans harder into bundle features.',
      'Bitwarden still beats both for pure value.',
    ],
    rows: [
      { label: 'Ecosystem', left: 'Nord Security', right: 'Dashlane bundle', winner: 'left' },
      { label: 'Extras', left: 'Moderate', right: 'More bundled features', winner: 'right' },
      { label: 'Value', left: 'Better', right: 'Pricier', winner: 'left' },
      { label: 'Best pick', left: 'Nord users', right: 'Bundle seekers', winner: 'left' },
    ],
    related: [
      { href: '/password-managers', label: 'See all password managers' },
      { href: '/reviews/bitwarden', label: 'Bitwarden full review' },
    ],
  },
  {
    slug: 'windows-defender-vs-paid-antivirus',
    title: 'Windows Defender vs Paid Antivirus',
    description: 'When free built-in protection is enough.',
    categoryHref: '/antivirus',
    categoryLabel: 'Best Antivirus',
    leftName: 'Windows Defender',
    rightName: 'Paid antivirus',
    winnerName: 'Windows Defender',
    verdict:
      'For most Windows 11 users, Defender is enough. Pay only if you need specific extras or lighter performance on older hardware.',
    leftBestFor: 'Most Windows users who keep their system updated.',
    rightBestFor: 'Users who need advanced controls, business features, or specific malware tools.',
    keyDifferences: [
      'Defender is free and already built into Windows.',
      'Paid antivirus can add useful features, but many bundles are bloated.',
      'The biggest security win for many people is still passwords and 2FA, not paid antivirus.',
    ],
    rows: [
      { label: 'Cost', left: 'Free', right: 'Paid', winner: 'left' },
      { label: 'Setup', left: 'Built in', right: 'Install required', winner: 'left' },
      { label: 'Advanced extras', left: 'Limited', right: 'More options', winner: 'right' },
      { label: 'Best pick', left: 'Most users', right: 'Specific needs', winner: 'left' },
    ],
    related: [
      { href: '/antivirus', label: 'See all antivirus rankings' },
      { href: '/password-managers', label: 'Best password managers' },
    ],
  },
  {
    slug: 'eset-vs-bitdefender',
    title: 'ESET vs Bitdefender',
    description: 'Lightweight antivirus versus maximum detection strength.',
    categoryHref: '/antivirus',
    categoryLabel: 'Best Antivirus',
    leftName: 'ESET',
    rightName: 'Bitdefender',
    winnerName: 'ESET',
    verdict:
      'Pick ESET for a lighter, cleaner product. Pick Bitdefender if maximum detection scores matter most.',
    leftBestFor: 'Users who want low system impact and fewer bundle distractions.',
    rightBestFor: 'Users who want very strong detection and a bigger security suite.',
    keyDifferences: [
      'ESET is the cleaner pick for performance-sensitive users.',
      'Bitdefender is stronger if you want a broad security suite.',
      'Both are credible paid options, unlike many noisy antivirus bundles.',
    ],
    rows: [
      { label: 'Performance', left: 'Very light', right: 'Good', winner: 'left' },
      { label: 'Detection', left: 'Strong', right: 'Very strong', winner: 'right' },
      { label: 'Bundle size', left: 'Cleaner', right: 'Bigger suite', winner: 'left' },
      { label: 'Best pick', left: 'Lightweight protection', right: 'Maximum suite coverage', winner: 'left' },
    ],
    related: [
      { href: '/antivirus', label: 'See all antivirus rankings' },
      { href: '/comparisons/windows-defender-vs-paid-antivirus', label: 'Defender vs paid antivirus' },
    ],
  },
  {
    slug: 'malwarebytes-vs-antivirus',
    title: 'Malwarebytes vs Full Antivirus',
    description: 'Second-opinion scanner versus always-on protection.',
    categoryHref: '/antivirus',
    categoryLabel: 'Best Antivirus',
    leftName: 'Malwarebytes',
    rightName: 'Full antivirus',
    winnerName: 'Full antivirus',
    verdict:
      'Use Malwarebytes as a cleanup and second-opinion tool. Use a full antivirus if you need always-on primary protection.',
    leftBestFor: 'Users who want manual scans or cleanup after something suspicious.',
    rightBestFor: 'Users who need default, always-on protection across the system.',
    keyDifferences: [
      'Malwarebytes is excellent as a second layer.',
      'Full antivirus suites are better as the primary always-on shield.',
      'For many users, Windows Defender plus occasional Malwarebytes scans is enough.',
    ],
    rows: [
      { label: 'Primary protection', left: 'Not the best fit', right: 'Designed for it', winner: 'right' },
      { label: 'Cleanup scans', left: 'Excellent', right: 'Varies', winner: 'left' },
      { label: 'Simplicity', left: 'Simple scanner', right: 'More moving parts', winner: 'left' },
      { label: 'Best pick', left: 'Second opinion', right: 'Primary antivirus', winner: 'right' },
    ],
    related: [
      { href: '/antivirus', label: 'See all antivirus rankings' },
      { href: '/comparisons/windows-defender-vs-paid-antivirus', label: 'Defender vs paid antivirus' },
    ],
  },
  {
    slug: 'norton-vs-antivirus-alternatives',
    title: 'Norton 360 vs Antivirus Alternatives',
    description: 'A big bundle compared with cleaner security choices.',
    categoryHref: '/antivirus',
    categoryLabel: 'Best Antivirus',
    leftName: 'Norton 360',
    rightName: 'Cleaner alternatives',
    winnerName: 'Cleaner alternatives',
    verdict:
      'Norton can work, but BreachWatch favors cleaner alternatives with less bundle pressure.',
    leftBestFor: 'Users who want one big security bundle and accept upsells.',
    rightBestFor: 'Users who want lighter software and separate best-in-class tools.',
    keyDifferences: [
      'Norton bundles many features, but that can create noise.',
      'Cleaner alternatives let you choose better tools separately.',
      'A password manager and 2FA often matter more than a massive antivirus suite.',
    ],
    rows: [
      { label: 'Bundle size', left: 'Large', right: 'Smaller/cleaner', winner: 'right' },
      { label: 'Upsell pressure', left: 'Higher', right: 'Lower', winner: 'right' },
      { label: 'Convenience', left: 'One bundle', right: 'Separate tools', winner: 'left' },
      { label: 'Best pick', left: 'All-in-one buyer', right: 'Cleaner setup', winner: 'right' },
    ],
    related: [
      { href: '/antivirus', label: 'See all antivirus rankings' },
      { href: '/tools', label: 'Free security tools' },
    ],
  },
  {
    slug: 'aegis-vs-ente-auth',
    title: 'Aegis vs Ente Auth',
    description: 'Local-first Android 2FA versus encrypted cross-platform sync.',
    categoryHref: '/2fa-apps',
    categoryLabel: 'Best 2FA Apps',
    leftName: 'Aegis',
    rightName: 'Ente Auth',
    winnerName: 'Ente Auth',
    verdict:
      'Pick Aegis for Android-only local control. Pick Ente Auth if you need iOS, desktop, or encrypted sync.',
    leftBestFor: 'Android users who want full local control and encrypted exports.',
    rightBestFor: 'Users who need cross-platform access and private encrypted sync.',
    keyDifferences: [
      'Aegis is excellent but Android-only.',
      'Ente Auth solves sync without giving up end-to-end encryption.',
      'Both are much better than lock-in-heavy 2FA apps.',
    ],
    rows: [
      { label: 'Platforms', left: 'Android only', right: 'Cross-platform', winner: 'right' },
      { label: 'Local control', left: 'Excellent', right: 'Good', winner: 'left' },
      { label: 'Sync', left: 'Manual backup', right: 'Encrypted sync', winner: 'right' },
      { label: 'Best pick', left: 'Android control', right: 'Most users', winner: 'right' },
    ],
    related: [
      { href: '/2fa-apps', label: 'See all 2FA apps' },
      { href: '/password-managers', label: 'Best password managers' },
    ],
  },
  {
    slug: 'google-authenticator-vs-aegis',
    title: 'Google Authenticator vs Aegis',
    description: 'Default 2FA app versus export-friendly Android control.',
    categoryHref: '/2fa-apps',
    categoryLabel: 'Best 2FA Apps',
    leftName: 'Google Authenticator',
    rightName: 'Aegis',
    winnerName: 'Aegis',
    verdict:
      'Pick Aegis on Android. Google Authenticator is simple, but Aegis gives better backup and export control.',
    leftBestFor: 'Users who want the simplest mainstream option.',
    rightBestFor: 'Android users who want encrypted backups and no lock-in.',
    keyDifferences: [
      'Google Authenticator is easy but less flexible.',
      'Aegis is open source and gives stronger export control.',
      'If you are on Android, Aegis is the better long-term choice.',
    ],
    rows: [
      { label: 'Simplicity', left: 'Very simple', right: 'Still simple', winner: 'left' },
      { label: 'Exports', left: 'Limited', right: 'Strong encrypted exports', winner: 'right' },
      { label: 'Open source', left: 'No', right: 'Yes', winner: 'right' },
      { label: 'Best pick', left: 'Basic default', right: 'Android users', winner: 'right' },
    ],
    related: [
      { href: '/2fa-apps', label: 'See all 2FA apps' },
      { href: '/comparisons/aegis-vs-ente-auth', label: 'Aegis vs Ente Auth' },
    ],
  },
  {
    slug: 'microsoft-authenticator-vs-2fa-apps',
    title: 'Microsoft Authenticator vs General 2FA Apps',
    description: 'Work account tool versus personal 2FA app.',
    categoryHref: '/2fa-apps',
    categoryLabel: 'Best 2FA Apps',
    leftName: 'Microsoft Authenticator',
    rightName: 'General 2FA apps',
    winnerName: 'General 2FA apps',
    verdict:
      'Use Microsoft Authenticator when work requires it. For personal accounts, Aegis or Ente Auth is usually cleaner.',
    leftBestFor: 'Work and school accounts tied to Microsoft identity systems.',
    rightBestFor: 'Personal accounts where export, backup, and portability matter.',
    keyDifferences: [
      'Microsoft Authenticator is strong for Microsoft work accounts.',
      'General 2FA apps give more control for personal tokens.',
      'For personal use, avoid getting locked into a workplace-style app.',
    ],
    rows: [
      { label: 'Work accounts', left: 'Excellent', right: 'Varies', winner: 'left' },
      { label: 'Personal control', left: 'Limited', right: 'Better', winner: 'right' },
      { label: 'Portability', left: 'Mixed', right: 'Better with Aegis/Ente', winner: 'right' },
      { label: 'Best pick', left: 'Work requirement', right: 'Personal security', winner: 'right' },
    ],
    related: [
      { href: '/2fa-apps', label: 'See all 2FA apps' },
      { href: '/comparisons/aegis-vs-ente-auth', label: 'Aegis vs Ente Auth' },
    ],
  },
  {
    slug: 'authy-vs-ente-auth',
    title: 'Authy vs Ente Auth',
    description: 'Convenient legacy sync versus export-friendly encrypted sync.',
    categoryHref: '/2fa-apps',
    categoryLabel: 'Best 2FA Apps',
    leftName: 'Authy',
    rightName: 'Ente Auth',
    winnerName: 'Ente Auth',
    verdict:
      'Pick Ente Auth. Authy is convenient, but export limitations make it a bad long-term home for 2FA tokens.',
    leftBestFor: 'Existing Authy users who are not ready to migrate yet.',
    rightBestFor: 'Users who want encrypted sync, exports, and less lock-in.',
    keyDifferences: [
      'Authy convenience comes with migration friction.',
      'Ente Auth is open source and export-friendly.',
      'For new setups, there is little reason to start with Authy now.',
    ],
    rows: [
      { label: 'Sync', left: 'Convenient', right: 'Encrypted and portable', winner: 'right' },
      { label: 'Export control', left: 'Poor', right: 'Strong', winner: 'right' },
      { label: 'Long-term fit', left: 'Weak', right: 'Strong', winner: 'right' },
      { label: 'Best pick', left: 'Existing users', right: 'New setups', winner: 'right' },
    ],
    related: [
      { href: '/2fa-apps', label: 'See all 2FA apps' },
      { href: '/comparisons/aegis-vs-ente-auth', label: 'Aegis vs Ente Auth' },
    ],
  },
];

export function getSimpleComparison(slug: string) {
  return simpleComparisons.find((comparison) => comparison.slug === slug);
}
