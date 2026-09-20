import Link from "next/link";
import type { Project } from "@/types/project";
import { ProjectItem } from "./ProjectItem";
import { SectionMark } from "./ui/SectionMark";

/** IV — THE LABORS. Consumes project data only; knows nothing about its source. */
export function Work({ projects }: { projects: Project[] }) {
  return (
    <section id="work" aria-labelledby="labors-title" className="surface-paper">
      <div className="relative z-10 px-[var(--gutter)] pb-20 pt-24 lg:pb-[clamp(6rem,9vw,9rem)] lg:pt-[clamp(6.5rem,10vw,10rem)]">
        <header className="grid grid-cols-[1fr_auto] lg:grid-cols-12 lg:gap-x-8">
          <SectionMark numeral="IV" label="Work" className="lg:col-span-2" />
          <Link
            href="/#contact"
            className="meta self-start text-right text-ink/70 transition-colors hover:text-ink lg:order-last lg:col-span-4 lg:justify-self-end"
            data-reveal="fade"
          >
            Ideas
            <br />
            into
            <br />
            real things. <span aria-hidden="true" className="arrow-nudge">→</span>
          </Link>
          <h2
            id="labors-title"
            className="font-display col-span-2 mt-10 text-[clamp(3rem,13vw,4rem)] lg:col-span-6 lg:mt-0 lg:text-[clamp(3rem,4.4vw,4.6rem)]"
            data-split
          >
            The Labors
          </h2>
        </header>

        <div className="mt-14 lg:mt-[clamp(3.5rem,5vw,5.5rem)] lg:pl-[calc((100%-22rem)/12+2rem)]">
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
