export interface FreshnessNoteProps {
  children: string;
}

export default function FreshnessNote({ children }: FreshnessNoteProps) {
  return (
    <p className="mt-4 inline-block rounded-[3px] bg-bw-light px-3 py-2 text-[12px] font-medium text-bw-gray">
      Last updated: June 14, 2026. {children}
    </p>
  );
}
