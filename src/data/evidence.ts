export type EvidenceCategory = 'vpn' | 'password-manager' | 'antivirus' | '2fa-apps';

export interface EvidenceLink {
  label: string;
  url: string;
}

export interface ProductEvidence {
  checkedAt: string;
  summary: string;
  links: EvidenceLink[];
}

export interface CategoryEvidence {
  checkedAt: string;
  summary: string;
  links: EvidenceLink[];
  products: Record<string, ProductEvidence>;
}

export const evidenceByCategory: Record<EvidenceCategory, CategoryEvidence> = {
  vpn: {
    checkedAt: 'June 14, 2026',
    summary:
      'VPN scores are based on published privacy policies, audit pages, jurisdiction, pricing, and reliability signals.',
    links: [
      { label: 'Privacy Guides VPN criteria', url: 'https://www.privacyguides.org/en/vpn/' },
      { label: 'Mullvad audit posts', url: 'https://mullvad.net/en/blog/tag/audits' },
      { label: 'NordVPN audit history', url: 'https://nordvpn.com/blog/nordvpn-audit/' },
      { label: 'Proton VPN security audits', url: 'https://protonvpn.com/blog/security-audit' },
    ],
    products: {
      mullvad: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on no-email account creation, no-logs policy, open-source clients, and third-party audit history.',
        links: [
          { label: 'Mullvad no-logging policy', url: 'https://mullvad.net/en/help/no-logging-data-policy' },
          { label: 'Mullvad app audits', url: 'https://mullvad.net/en/blog/tag/audits' },
          { label: 'Mullvad pricing', url: 'https://mullvad.net/en/pricing' },
        ],
      },
      protonvpn: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on Swiss jurisdiction, open-source clients, no-logs claims, audits, and the free tier.',
        links: [
          { label: 'Proton VPN no-logs policy', url: 'https://protonvpn.com/support/no-logs-vpn' },
          { label: 'Proton VPN audits', url: 'https://protonvpn.com/blog/security-audit' },
          { label: 'Proton VPN pricing', url: 'https://protonvpn.com/pricing' },
        ],
      },
      surfshark: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on no-logs audit claims, unlimited device policy, ownership, pricing, and user reliability patterns.',
        links: [
          { label: 'Surfshark no-logs audit', url: 'https://surfshark.com/blog/no-logs-audit' },
          { label: 'Surfshark pricing', url: 'https://surfshark.com/pricing' },
        ],
      },
      nordvpn: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on audit history, Panama jurisdiction, the 2018 server incident, pricing, and reliability signals.',
        links: [
          { label: 'NordVPN audit history', url: 'https://nordvpn.com/blog/nordvpn-audit/' },
          { label: 'NordVPN server incident response', url: 'https://nordvpn.com/blog/official-response-datacenter-breach/' },
          { label: 'NordVPN pricing', url: 'https://nordvpn.com/pricing/' },
        ],
      },
      expressvpn: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on audit claims, British Virgin Islands jurisdiction, Kape ownership context, and pricing.',
        links: [
          { label: 'ExpressVPN audits', url: 'https://www.expressvpn.com/trust' },
          { label: 'ExpressVPN pricing', url: 'https://www.expressvpn.com/order' },
          { label: 'Kape acquisition announcement', url: 'https://www.expressvpn.com/blog/expressvpn-joins-kape/' },
        ],
      },
    },
  },
  'password-manager': {
    checkedAt: 'June 14, 2026',
    summary:
      'Password manager scores are based on security model, auditability, open-source status, pricing, platform support, and reliability signals.',
    links: [
      { label: 'Bitwarden security audits', url: 'https://bitwarden.com/help/is-bitwarden-audited/' },
      { label: '1Password security assessments', url: 'https://support.1password.com/security-assessments/' },
      { label: 'Proton Pass security model', url: 'https://proton.me/pass/security' },
    ],
    products: {
      bitwarden: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on open-source clients, Cure53 audit history, free tier, self-hosting, and platform support.',
        links: [
          { label: 'Bitwarden audits', url: 'https://bitwarden.com/help/is-bitwarden-audited/' },
          { label: 'Bitwarden pricing', url: 'https://bitwarden.com/pricing/' },
          { label: 'Bitwarden self-hosting', url: 'https://bitwarden.com/help/install-on-premise-linux/' },
        ],
      },
      protonpass: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on open-source clients, Proton security model, SimpleLogin aliases, Swiss jurisdiction, and pricing.',
        links: [
          { label: 'Proton Pass security', url: 'https://proton.me/pass/security' },
          { label: 'Proton Pass pricing', url: 'https://proton.me/pass/pricing' },
        ],
      },
      '1password': {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on Secret Key architecture, security assessments, platform coverage, pricing, and proprietary code tradeoffs.',
        links: [
          { label: '1Password security model', url: 'https://support.1password.com/secret-key-security/' },
          { label: '1Password security assessments', url: 'https://support.1password.com/security-assessments/' },
          { label: '1Password pricing', url: 'https://1password.com/pricing' },
        ],
      },
      keeper: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on compliance credentials, platform support, pricing, and closed-source tradeoffs.',
        links: [
          { label: 'Keeper compliance', url: 'https://www.keepersecurity.com/security.html' },
          { label: 'Keeper pricing', url: 'https://www.keepersecurity.com/pricing' },
        ],
      },
      nordpass: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on encryption design, audit claims, pricing, platform support, and Nord Security ownership.',
        links: [
          { label: 'NordPass security', url: 'https://nordpass.com/features/security/' },
          { label: 'NordPass pricing', url: 'https://nordpass.com/pricing/' },
        ],
      },
      dashlane: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on zero-knowledge claims, bundled VPN/dark web monitoring, pricing, and platform support.',
        links: [
          { label: 'Dashlane security', url: 'https://www.dashlane.com/security' },
          { label: 'Dashlane pricing', url: 'https://www.dashlane.com/pricing' },
        ],
      },
    },
  },
  antivirus: {
    checkedAt: 'June 14, 2026',
    summary:
      'Antivirus scores are based on public lab results, performance impact, privacy posture, pricing, and false-positive signals.',
    links: [
      { label: 'AV-TEST Windows consumer results', url: 'https://www.av-test.org/en/antivirus/home-windows/' },
      { label: 'Microsoft Windows Security', url: 'https://www.microsoft.com/en-us/windows/comprehensive-security' },
      { label: 'Bitdefender security products', url: 'https://www.bitdefender.com' },
    ],
    products: {
      windows_defender: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on AV-TEST protection/performance/usability results, zero cost, and built-in Windows trust boundary.',
        links: [
          { label: 'AV-TEST Windows consumer results', url: 'https://www.av-test.org/en/antivirus/home-windows/' },
          { label: 'Microsoft Windows Security', url: 'https://www.microsoft.com/en-us/windows/comprehensive-security' },
        ],
      },
      eset: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on AV-TEST performance results, EU/Slovak jurisdiction, clean product scope, and pricing.',
        links: [
          { label: 'AV-TEST Windows consumer results', url: 'https://www.av-test.org/en/antivirus/home-windows/' },
          { label: 'ESET pricing', url: 'https://www.eset.com/us/home/free-trial/' },
        ],
      },
      bitdefender: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on AV-TEST results, Romanian jurisdiction, pricing, and product privacy posture.',
        links: [
          { label: 'AV-TEST Windows consumer results', url: 'https://www.av-test.org/en/antivirus/home-windows/' },
          { label: 'Bitdefender pricing', url: 'https://www.bitdefender.com/solutions/' },
        ],
      },
      malwarebytes: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on second-opinion scanning, malware cleanup positioning, free on-demand scanning, and pricing.',
        links: [
          { label: 'Malwarebytes products', url: 'https://www.malwarebytes.com/premium' },
          { label: 'Malwarebytes free scanner', url: 'https://www.malwarebytes.com/mwb-download' },
        ],
      },
      norton: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on lab results, bundle pricing, Norton Crypto history, and privacy tradeoffs.',
        links: [
          { label: 'AV-TEST Windows consumer results', url: 'https://www.av-test.org/en/antivirus/home-windows/' },
          { label: 'Norton pricing', url: 'https://us.norton.com/pricing' },
          { label: 'Norton Crypto FAQ', url: 'https://support.norton.com/sp/en/us/home/current/solutions/v138388461' },
        ],
      },
    },
  },
  '2fa-apps': {
    checkedAt: 'June 14, 2026',
    summary:
      '2FA app scores are based on backup/recovery, open-source status, export capability, reliability signals, and ease of setup.',
    links: [
      { label: 'Aegis Authenticator', url: 'https://getaegis.app' },
      { label: 'Ente Auth', url: 'https://ente.io/auth/' },
      { label: 'Google Authenticator help', url: 'https://support.google.com/accounts/answer/1066447' },
    ],
    products: {
      aegis: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on open-source code, encrypted local backups, export capability, and Android-only scope.',
        links: [
          { label: 'Aegis website', url: 'https://getaegis.app' },
          { label: 'Aegis source code', url: 'https://github.com/beemdevelopment/Aegis' },
        ],
      },
      ente_auth: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on open-source code, end-to-end encrypted sync, export support, and cross-platform clients.',
        links: [
          { label: 'Ente Auth', url: 'https://ente.io/auth/' },
          { label: 'Ente source code', url: 'https://github.com/ente-io/ente' },
        ],
      },
      google_authenticator: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on Google account sync, export limitations, ease of use, and closed-source tradeoffs.',
        links: [
          { label: 'Google Authenticator help', url: 'https://support.google.com/accounts/answer/1066447' },
        ],
      },
      microsoft_authenticator: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on Microsoft account integration, backup limitations, export limitations, and work-account requirements.',
        links: [
          { label: 'Microsoft Authenticator', url: 'https://www.microsoft.com/en-us/security/mobile-authenticator-app' },
        ],
      },
      authy: {
        checkedAt: 'June 14, 2026',
        summary:
          'Evidence focuses on no token export, Twilio ownership/breach context, multi-device sync, and lock-in risk.',
        links: [
          { label: 'Authy app', url: 'https://authy.com' },
          { label: 'Twilio 2022 incident update', url: 'https://www.twilio.com/en-us/blog/august-2022-social-engineering-attack' },
        ],
      },
    },
  },
};
