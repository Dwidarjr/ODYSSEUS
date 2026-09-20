import Image from "next/image";
import type { CaseStudyPlate as Plate } from "@/types/project";

interface CaseStudyPlateProps {
  plate: Plate;
  index: number;
  sizes: string;
}

/**
 * A screenshot hung like a catalogue plate: hairline frame, plate number and
 * caption. Cropped plates link to the full, uncropped screenshot.
 */
export function CaseStudyPlate({ plate, index, sizes }: CaseStudyPlateProps) {
  const aspect = plate.aspect ?? `${plate.width} / ${plate.height}`;
  const cropped = Boolean(plate.aspect);
  const number = String(index).padStart(2, "0");

  return (
    <figure className={plate.wide ? "md:col-span-2" : undefined} data-reveal="up">
      <a
        href={plate.src}
        target="_blank"
        rel="noreferrer"
        className="group relative block overflow-hidden bg-white shadow-[0_0_0_1px_rgb(18_17_15/0.1)]"
        style={{ aspectRatio: aspect }}
        aria-label={`Open full screenshot: ${plate.caption}`}
      >
        <Image
          src={plate.src}
          alt={plate.alt}
          fill
          sizes={sizes}
          style={{ objectPosition: plate.position ?? "50% 0%" }}
          className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-cinema)] group-hover:scale-[1.015]"
        />
      </a>
      <figcaption className="mt-4 flex items-baseline justify-between gap-6">
        <span className="flex items-baseline gap-4">
          <span className="meta whitespace-nowrap text-ink/50">Pl. {number}</span>
          <span className="font-serif text-[1.05rem] italic text-ink/80">{plate.caption}</span>
        </span>
        {cropped && (
          <a
            href={plate.src}
            target="_blank"
            rel="noreferrer"
            aria-label={`Full screen: ${plate.caption}`}
            className="meta shrink-0 text-ink/50 hover:text-ink"
          >
            <span className="link-draw hidden pb-0.5 sm:inline">Full screen</span> <span aria-hidden="true">↗</span>
          </a>
        )}
      </figcaption>
    </figure>
  );
}
