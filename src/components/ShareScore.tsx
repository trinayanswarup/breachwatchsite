'use client';

import { useState } from 'react';

const SITE_URL = 'https://breachwatchsite.com';

export interface ShareScoreProps {
  score: number;
}

export default function ShareScore({ score }: ShareScoreProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${SITE_URL}/score/${score}`;
  const redditTitle = `I got ${score}/5 on this free security quiz — how does yours compare?`;
  const redditSubmitUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(redditTitle)}`;

  async function handleCopy() {
    try {
      const urlToCopy =
        typeof window !== 'undefined'
          ? `${window.location.origin}/score/${score}`
          : shareUrl;
      await navigator.clipboard.writeText(urlToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — no-op
    }
  }

  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
      <p className="mb-3 text-sm font-semibold text-gray-700">Share your score</p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={handleCopy}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <span aria-hidden="true">{copied ? '✓' : '🔗'}</span>
          {copied ? 'Link copied!' : 'Copy link'}
        </button>
        <a
          href={redditSubmitUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        >
          <span aria-hidden="true">↑</span>
          Share on Reddit
        </a>
      </div>
    </div>
  );
}
