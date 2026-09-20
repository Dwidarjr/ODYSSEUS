import Image from "next/image";
import { disciplines } from "@/data/disciplines";
import { SectionMark } from "./ui/SectionMark";

// Hairline dividers per position: stacked on phones, 2×2 on tablets, a row of four on desktop.
const DIVIDERS = [
  "",
  "border-t sm:border-t-0 sm:border-l",
  "border-t sm:pt-12 lg:border-t-0 lg:border-l lg:pt-2",
  "border-t sm:border-l sm:pt-12 lg:pt-2 lg:border-t-0",
];

/** III — THE TOOLS. Four busts hung like a small museum collection. */
export function Tools() {
  return (
    <section id="tools" aria-labelledby="tools-title" className="surface-film overflow-hidden text-ivory">
      <div className="px-[var(--gutter)] pb-20 pt-24 lg:pb-[clamp(6rem,9vw,9rem)] lg:pt-[clamp(6.5rem,10vw,10rem)]">
        <header className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8">
          <SectionMark numeral="III" label="Skills" className="lg:col-span-2" />
          <h2
            id="tools-title"
            className="font-display mt-10 text-[clamp(3rem,13vw,4rem)] lg:col-span-6 lg:mt-0 lg:text-[clamp(3rem,4.4vw,4.6rem)]"
            data-split
          >
            The <span className="max-lg:block">Tools</span>
          </h2>
          <p className="meta hidden text-stone lg:col-span-4 lg:block lg:justify-self-end" data-reveal="fade">
            Same values.
            <br />
            Different times.
          </p>
        </header>

        <ul className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:mt-[clamp(4rem,6vw,6.5rem)] lg:grid-cols-4" data-stagger>
          {disciplines.map((d, i) => (
            <li
              key={d.id}
              className={`group flex flex-col items-start border-[var(--rule-dark)] py-10 sm:items-center sm:px-6 sm:text-center lg:py-2 ${DIVIDERS[i]}`}
              data-reveal="up"
            >
              <div className="relative h-[clamp(9.5rem,40vw,12rem)] w-[70%] max-w-[15rem] sm:h-[clamp(11rem,18vw,15rem)] sm:w-full">
                <Image
                  src={d.image.src}
                  alt={d.image.alt}
                  fill
                  sizes="(min-width: 1024px) 18vw, (min-width: 640px) 40vw, 60vw"
                  className="object-contain object-left-bottom transition-transform duration-[1.4s] ease-[var(--ease-cinema)] group-hover:scale-[1.035] sm:object-bottom"
                />
              </div>
              <h3 className="serif-caps mt-8 text-[1.15rem] tracking-[0.3em] text-ivory lg:mt-10">{d.name}</h3>
              <ul className="mt-4 space-y-1 font-serif text-[1.05rem] leading-snug text-stone">
                {d.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <p className="meta mt-6 text-stone lg:hidden" data-reveal="fade">
          Same values.
          <br />
          Different times.
        </p>
      </div>
    </section>
  );
}
