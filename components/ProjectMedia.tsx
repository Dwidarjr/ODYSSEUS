import Image from "next/image";
import type { Project } from "@/types/project";

interface ProjectMediaProps {
  project: Project;
  sizes: string;
  className?: string;
  /** Larger type for detail pages. */
  size?: "row" | "hero";
}

/**
 * Renders a project's primary visual in one of three plates:
 *  - cover  : screenshot/photo filling the frame
 *  - cutout : transparent object set on a dark film plate, with the caption
 *  - none   : a typographic plate, so a missing screenshot never looks broken
 */
export function ProjectMedia({ project, sizes, className = "", size = "row" }: ProjectMediaProps) {
  const { image, caption } = project;
  const captionLines = caption?.split("\n") ?? [];
  const big = size === "hero";

  if (image && (image.treatment ?? "cover") === "cover") {
    return (
      <div className={`relative overflow-hidden bg-ink-2 ${className}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          style={image.position ? { objectPosition: image.position } : undefined}
          className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-cinema)] group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <div className={`surface-film relative overflow-hidden bg-ink-2 text-ivory ${className}`}>
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(90%_120%_at_22%_60%,#2a2520_0%,transparent_70%)]" />

      {image ? (
        <div className="absolute inset-y-[-6%] left-[4%] w-[46%] transition-transform duration-[1.6s] ease-[var(--ease-cinema)] group-hover:scale-[1.03]">
          <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-contain object-left opacity-90" />
        </div>
      ) : (
        <div className="absolute inset-y-0 left-[6%] flex flex-col justify-center">
          <span aria-hidden="true" className="meta text-stone">
            Nº {project.number}
          </span>
          <span
            className={`mt-2 font-serif italic leading-none tracking-[0.01em] text-ivory/90 ${
              big ? "text-[clamp(3rem,8vw,7rem)]" : "text-[clamp(2.4rem,4.4vw,4rem)]"
            }`}
          >
            {project.title}
          </span>
        </div>
      )}

      {captionLines.length > 0 ? (
        <p
          className={`absolute right-[7%] top-1/2 -translate-y-1/2 text-right font-serif italic leading-[1.3] text-ivory/90 ${
            big ? "text-[clamp(1.8rem,3.4vw,3rem)]" : "text-[clamp(1.35rem,2vw,1.85rem)]"
          }`}
        >
          {captionLines.map((line, i) => (
            <span key={i} className="block" style={{ paddingRight: i === 0 ? "0.9em" : 0 }}>
              {line}
            </span>
          ))}
        </p>
      ) : (
        !image && (
          <div className="absolute bottom-[12%] right-[6%] hidden flex-col items-end gap-3 text-right sm:flex">
            <span aria-hidden="true" className="block h-px w-10 bg-stone/50" />
            <span className="meta text-stone">{project.category}</span>
          </div>
        )
      )}
    </div>
  );
}
