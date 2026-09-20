import type { CaseStudy as CaseStudyData, Project } from "@/types/project";
import { SectionMark } from "../ui/SectionMark";
import { CaseStudyPlate } from "./CaseStudyPlate";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

/** Label column + content column, on the same 12-col grid as the homepage spreads. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-12 lg:gap-x-8">
      <p className="meta pt-1 text-ink/60 lg:col-span-2" data-reveal="fade">
        {label}
      </p>
      <div className="lg:col-span-10">{children}</div>
    </div>
  );
}

/** The long-form body of a project page, rendered entirely from `project.caseStudy`. */
export function CaseStudy({ project, study }: { project: Project; study: CaseStudyData }) {
  let plateIndex = 0;

  return (
    <>
      {/* ---------- Overview ---------- */}
      <div className="mt-16 lg:mt-24">
        <Row label="Overview">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-10 lg:gap-x-8">
            <div className="space-y-6 font-serif text-[1.3rem] leading-[1.55] text-ink/85 lg:col-span-6">
              {study.overview.map((p, i) => (
                <p key={i} data-reveal="up">
                  {p}
                </p>
              ))}
            </div>
            <dl className="lg:col-span-4" data-reveal="up">
              {study.facts.map((f) => (
                <div key={f.label} className="border-t border-[var(--rule-light)] py-3.5 last:border-b">
                  <dt className="meta text-ink/50">{f.label}</dt>
                  <dd className="mt-1 font-serif text-[1.1rem] leading-snug text-ink/85">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Row>
      </div>

      {/* ---------- Role ---------- */}
      <div className="mt-20 lg:mt-28">
        <Row label="What I built">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8" data-reveal="up">
            {study.role.map((r, i) => (
              <li
                key={r}
                className="flex items-baseline gap-4 border-t border-[var(--rule-light)] py-3.5 font-serif text-[1.12rem] text-ink/85"
              >
                <span className="meta w-6 shrink-0 text-terracotta">{String(i + 1).padStart(2, "0")}</span>
                {r}
              </li>
            ))}
          </ul>
          {study.roleNote && (
            <p className="mt-8 max-w-[40rem] font-serif text-[1.15rem] italic leading-[1.5] text-ink/65" data-reveal="up">
              {study.roleNote}
            </p>
          )}
        </Row>
      </div>

      {/* ---------- Chapters ---------- */}
      {study.sections.map((section) => {
        const supporting = section.emphasis === "supporting";
        return (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            className="mt-24 border-t border-[var(--rule-light)] pt-16 lg:mt-32 lg:pt-20"
          >
            <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-8">
              <SectionMark numeral={section.numeral} label={section.label} className="lg:col-span-2" />
              <div className="lg:col-span-6">
                <h2
                  id={`${section.id}-title`}
                  className={`font-display ${
                    supporting ? "text-[clamp(2rem,8vw,2.6rem)] lg:text-[clamp(2rem,2.8vw,2.8rem)]" : "text-[clamp(2.3rem,9vw,3rem)] lg:text-[clamp(2.4rem,3.4vw,3.4rem)]"
                  }`}
                  data-split
                >
                  {section.title}
                </h2>
                <p className="mt-7 font-serif text-[1.25rem] leading-[1.55] text-ink/85" data-reveal="up">
                  {section.intro}
                </p>
              </div>
              {section.points && (
                <ul className="lg:col-span-4 lg:pt-2" data-reveal="up">
                  {section.points.map((pt) => (
                    <li
                      key={pt}
                      className="border-t border-[var(--rule-light)] py-3 font-serif text-[1.05rem] leading-snug text-ink/75 last:border-b"
                    >
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {section.steps && (
              <ol className="mt-14 grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:ml-[calc((100%-22rem)/12*2+4rem)] lg:grid-cols-4 lg:gap-x-8">
                {section.steps.map((step, i) => (
                  <li key={step.title} className="border-t border-ink/30 pt-5" data-reveal="up">
                    <span className="font-serif text-[1.9rem] font-light leading-none text-terracotta">{ROMAN[i]}</span>
                    <p className="serif-caps mt-4 text-[1rem] tracking-[0.22em]">{step.title}</p>
                    <p className="mt-2 font-serif text-[1.05rem] leading-snug text-ink/70">{step.text}</p>
                  </li>
                ))}
              </ol>
            )}

            {section.plates && section.plates.length > 0 && (
              <div
                className={`mt-14 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:mt-16 ${
                  supporting ? "lg:ml-[calc((100%-22rem)/12*2+4rem)]" : ""
                }`}
              >
                {section.plates.map((plate) => (
                  <CaseStudyPlate
                    key={plate.src}
                    plate={plate}
                    index={++plateIndex}
                    sizes={plate.wide ? "(min-width: 1024px) 90vw, 100vw" : "(min-width: 768px) 45vw, 100vw"}
                  />
                ))}
              </div>
            )}
          </section>
        );
      })}

      {/* ---------- Technologies ---------- */}
      <section aria-labelledby="stack-title" className="mt-24 border-t border-[var(--rule-light)] pt-16 lg:mt-32 lg:pt-20">
        <Row label="Technologies">
          <h2 id="stack-title" className="sr-only">
            Technologies used in {project.title}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:gap-x-8" data-reveal="up">
            {study.stack.map((s) => (
              <li key={s.name} className="grid grid-cols-[9rem_1fr] items-baseline gap-4 border-t border-[var(--rule-light)] py-4">
                <span className="serif-caps text-[0.95rem] tracking-[0.18em]">{s.name}</span>
                <span className="font-serif text-[1.05rem] leading-snug text-ink/70">{s.note}</span>
              </li>
            ))}
          </ul>
          {study.scope && (
            <p className="mt-14 max-w-[44rem] font-serif text-[clamp(1.4rem,2.2vw,1.9rem)] italic leading-[1.4] text-ink/85" data-reveal="up">
              {study.scope}
            </p>
          )}
        </Row>
      </section>
    </>
  );
}
