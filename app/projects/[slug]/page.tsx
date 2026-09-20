import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { MotionController } from "@/components/motion/MotionController";
import { Navigation } from "@/components/Navigation";
import { CaseStudy } from "@/components/case-study/CaseStudy";
import { KIND_LABEL } from "@/components/ProjectItem";
import { ProjectMedia } from "@/components/ProjectMedia";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const title = project.seo?.title ?? project.title;
  const description = project.seo?.description ?? project.description;
  const ogImage = project.seo?.ogImage ?? (project.image?.treatment === "cover" ? project.image.src : "/og.jpg");
  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title, description, url: `/projects/${project.slug}`, images: [ogImage] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <Navigation />
      <main id="main">
        <article>
          <header className="surface-film text-ivory">
            <div className="relative z-10 px-[var(--gutter)] pb-16 pt-36 lg:pb-24 lg:pt-44">
              <Link href="/#work" className="meta inline-flex items-center gap-4 text-stone hover:text-ivory">
                <span aria-hidden="true">←</span>
                <span className="link-draw pb-1">IV — The Labors</span>
              </Link>

              <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-8">
                <p aria-hidden="true" className="font-serif text-[3.5rem] font-light leading-none text-terracotta-soft lg:col-span-2 lg:text-[4.5rem]">
                  {project.number}
                </p>
                <div className="lg:col-span-7">
                  <h1 className="font-display text-[clamp(3rem,12vw,4.2rem)] uppercase lg:text-[clamp(3.5rem,6vw,6.5rem)]" data-split>
                    {project.title}
                  </h1>
                  <p className="mt-6 font-serif text-[1.5rem] italic text-ivory/80">{project.category}</p>
                </div>
                <dl className="space-y-6 lg:col-span-3 lg:pt-4">
                  {project.kind && (
                    <div>
                      <dt className="meta text-stone">Type</dt>
                      <dd className="mt-1 font-serif text-[1.1rem] text-ivory/85">{KIND_LABEL[project.kind]}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="meta text-stone">Technologies</dt>
                    <dd className="mt-1 font-serif text-[1.1rem] text-ivory/85">{project.technologies.join(" / ")}</dd>
                  </div>
                  {(project.liveUrl || project.githubUrl) && (
                    <div>
                      <dt className="meta text-stone">Links</dt>
                      <dd className="mt-2 flex flex-col gap-2">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="meta inline-flex items-center gap-4 text-ivory">
                            <span className="link-draw pb-1">View live</span>
                            <span aria-hidden="true" className="arrow-nudge">→</span>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="meta inline-flex items-center gap-4 text-ivory">
                            <span className="link-draw pb-1">Source</span>
                            <span aria-hidden="true" className="arrow-nudge">→</span>
                          </a>
                        )}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </header>

          <div className="surface-paper">
            <div className="relative z-10 px-[var(--gutter)] py-20 lg:py-28">
              <ProjectMedia
                project={project}
                size="hero"
                sizes="100vw"
                className={`w-full ${project.image?.treatment === "cover" ? "aspect-[16/10] sm:aspect-[2.85/1]" : "aspect-[4/3] sm:aspect-[2.4/1]"}`}
              />
              {project.caseStudy ? (
                <CaseStudy project={project} study={project.caseStudy} />
              ) : (
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8">
                  <p className="meta text-ink/60 lg:col-span-2">The labor</p>
                  <p className="mt-4 max-w-[38rem] font-serif text-[1.35rem] leading-[1.55] text-ink/85 lg:col-span-7 lg:mt-0" data-reveal="up">
                    {project.description}
                  </p>
                </div>
              )}

              {project.gallery.length > 0 && (
                <ul className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2">
                  {project.gallery.map((img) => (
                    <li key={img.src} className="relative overflow-hidden bg-ink-2" style={{ aspectRatio: `${img.width} / ${img.height}` }}>
                      <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" data-reveal="image" />
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-24 flex flex-wrap items-center gap-x-12 gap-y-5 border-t border-[var(--rule-light)] pt-10 lg:mt-32">
                <Link href="/#work" className="meta inline-flex items-center gap-4 text-terracotta">
                  <span aria-hidden="true">←</span>
                  <span className="link-draw pb-1">Back to the labors</span>
                </Link>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="meta inline-flex items-center gap-4 text-ink">
                    <span className="link-draw pb-1">View live</span>
                    <span aria-hidden="true" className="arrow-nudge">→</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <MotionController />
    </>
  );
}
