import Link from 'next/link';

export interface ShortlistItem {
  name: string;
  label: string;
  href: string;
}

interface CategoryShortlistProps {
  title: string;
  description: string;
  items: ShortlistItem[];
}

export default function CategoryShortlist({
  title,
  description,
  items,
}: CategoryShortlistProps) {
  return (
    <section className="border-t border-black/10 px-5 py-10">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-bw-black">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-bw-gray">{description}</p>
        <div className="mt-6 space-y-2">
          {items.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-start gap-3 rounded-[3px] border border-black/10 bg-white px-4 py-3 transition-colors hover:border-bw-blue"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[3px] bg-bw-blue text-[12px] font-bold text-white">
                {index + 1}
              </span>
              <span>
                <span className="font-semibold text-bw-black group-hover:text-bw-blue">
                  {item.name}
                </span>
                <span className="text-bw-gray"> - {item.label}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
