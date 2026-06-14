const baseUrl = process.env.SMOKE_BASE_URL ?? 'http://localhost:3000';

const checks = [
  {
    path: '/',
    mustInclude: ['Top picks by category', 'Mullvad', 'Bitwarden', 'Windows Defender', 'Aegis Authenticator'],
  },
  {
    path: '/quiz',
    mustInclude: ['Free Security Risk Quiz', 'Do you reuse the same password'],
  },
  {
    path: '/vpn',
    mustInclude: ['Best VPNs of 2026', 'Evidence checked', 'Mullvad', 'VPN comparison'],
  },
  {
    path: '/reviews/nordvpn',
    mustInclude: ['NordVPN Review 2026', 'Evidence checked', 'How NordVPN scores'],
  },
  {
    path: '/breach-checker',
    mustInclude: ['password', 'Have I Been Pwned'],
  },
];

async function fetchText(pathname) {
  const response = await fetch(new URL(pathname, baseUrl));
  if (!response.ok) {
    throw new Error(`${pathname} returned ${response.status}`);
  }
  return response.text();
}

for (const check of checks) {
  const html = await fetchText(check.path);
  for (const expected of check.mustInclude) {
    if (!html.includes(expected)) {
      throw new Error(`${check.path} did not include "${expected}"`);
    }
  }
  console.log(`ok ${check.path}`);
}

console.log(`Smoke check passed against ${baseUrl}`);
