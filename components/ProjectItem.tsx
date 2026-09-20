import Link from "next/link";
import type { Project, ProjectKind } from "@/types/project";
import { ProjectMedia } from "./ProjectMedia";

export function ProjectLinks({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-9 gap-y-3 ${className}`}>
      <Link href={`/projects/${project.slug}`} className="meta inline-flex items-center gap-4 text-terracotta">
        <span className="link-draw pb-1">View project</span>
        <span aria-hidden="true" className="arrow-nudge">
          →
        </span>
      </Link>
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="meta inline-flex items-center gap-4 text-current">
          <span className="link-draw pb-1">View live</span>
          <span aria-hidden="true" className="arrow-nudge">
            →
          </span>
        </a>
      )}
    </div>
  );
}

export const KIND_LABEL: Record<ProjectKind, string> = {
  concept: "Concept project",
  client: "Client project",
  personal: "Personal project",
};

/** One labor: numeral, caption block and a wide plate. Purely data-driven. */
export function ProjectItem({ project }: { project: Project }) {
  return (
    <article
      className="grid grid-cols-[3.25rem_1fr] gap-x-4 gap-y-8 border-t border-[var(--rule-light)] py-12 first:border-t-0 first:pt-0 md:grid-cols-[4.5rem_1fr] lg:grid-cols-[minmax(4rem,7%)_minmax(15rem,30%)_1fr] lg:gap-x-[clamp(1.5rem,3vw,3.5rem)] lg:border-t-0 lg:py-[clamp(1.25rem,2.2vw,2rem)]"
      aria-labelledby={`project-${project.slug}`}
      data-reveal="up"
    >
      <p aria-hidden="true" className="font-serif text-[2.6rem] font-light leading-none tracking-[0.04em] text-terracotta lg:text-[clamp(2.4rem,3vw,3.1rem)]">
        {project.number}
      </p>

      <div className="pt-1">
        <h3 id={`project-${project.slug}`} className="serif-caps text-[1.35rem] tracking-[0.14em] lg:text-[clamp(1.2rem,1.5vw,1.5rem)]">
          <Link href={`/projects/${project.slug}`} className="link-draw">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 font-serif text-[1.12rem] leading-snug text-ink/80">{project.category}</p>
        <p className="font-serif text-[1.12rem] leading-snug text-ink/60">{project.technologies.join(" / ")}</p>
        {project.kind && <p className="meta mt-4 text-ink/50">{KIND_LABEL[project.kind]}</p>}
        <ProjectLinks project={project} className="mt-7" />
      </div>

      <Link
        href={`/projects/${project.slug}`}
        className="group col-span-2 block lg:col-span-1"
        aria-label={`View ${project.title}`}
        tabIndex={-1}
      >
        <ProjectMedia
          project={project}
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="aspect-[16/10] w-full sm:aspect-[2.2/1] lg:aspect-[3.7/1]"
        />
      </Link>
    </article>
  );
}
