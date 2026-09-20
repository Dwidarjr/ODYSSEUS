interface SectionMarkProps {
  numeral: string;
  label: string;
  className?: string;
}

/**
 * The roman-numeral "column" that opens every spread: a numeral set between
 * two hairlines, like a capital and base, with a tiny caption below.
 */
export function SectionMark({ numeral, label, className = "" }: SectionMarkProps) {
  return (
    <div className={`flex flex-col items-start ${className}`} data-reveal="fade">
      <span aria-hidden="true" className="flex flex-col items-center">
        <span className="block h-px w-[1.35em] bg-current opacity-70" style={{ fontSize: "2.4rem" }} />
        <span className="font-serif text-[2.4rem] font-light leading-[0.85] tracking-[0.02em]">{numeral}</span>
        <span className="block h-px w-[1.35em] bg-current opacity-70" style={{ fontSize: "2.4rem" }} />
      </span>
      <span className="meta mt-3 opacity-70">{label}</span>
    </div>
  );
}
