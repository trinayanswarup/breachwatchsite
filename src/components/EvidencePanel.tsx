import type { EvidenceCategory } from '@/data/evidence';
import { evidenceByCategory } from '@/data/evidence';

interface EvidencePanelProps {
  category: EvidenceCategory;
  productId?: string;
}

export default function EvidencePanel({ category, productId }: EvidencePanelProps) {
  const categoryEvidence = evidenceByCategory[category];
  const productEvidence = productId
    ? categoryEvidence.products[productId]
    : undefined;
  const evidence = productEvidence ?? categoryEvidence;

  return (
    <aside className="mt-5 rounded-[3px] border border-black/10 bg-white p-4 text-left shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-blue">
        Evidence checked
      </p>
      <p className="mt-2 text-[13px] leading-5 text-bw-text">{evidence.summary}</p>
      <p className="mt-2 text-[12px] text-bw-gray">Checked: {evidence.checkedAt}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {evidence.links.slice(0, 4).map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[3px] border border-black/10 px-2.5 py-1 text-[12px] font-semibold text-bw-blue hover:border-bw-blue"
          >
            {link.label}
          </a>
        ))}
      </div>
    </aside>
  );
}
