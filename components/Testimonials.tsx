import Image from "next/image";
import { TESTIMONIAL_PLATFORM, testimonials } from "@/data/testimonials";
import { TestimonialRail } from "./TestimonialRail";
import { SectionMark } from "./ui/SectionMark";

/**
 * V — TESTIMONIALS. A second paper spread, pitched one tone deeper than the
 * labors above it, with the laurelled bust from the collection standing over
 * the quotes like a plinth figure.
 */
export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="surface-paper surface-paper-deep relative overflow-hidden border-t border-[var(--rule-light)]"
    >
      <div className="relative z-10 px-[var(--gutter)] pb-20 pt-24 lg:pb-[clamp(6rem,9vw,9rem)] lg:pt-[clamp(6.5rem,10vw,10rem)]">
        <header className="grid grid-cols-1 lg:min-h-[clamp(17rem,25vw,25rem)] lg:grid-cols-12 lg:gap-x-8">
          <SectionMark numeral="V" label="Testimonials" className="lg:col-span-2" />

          <h2
            id="testimonials-title"
            className="font-display mt-10 text-[clamp(2.5rem,11.5vw,4rem)] lg:col-span-7 lg:mt-0 lg:text-[clamp(2.6rem,4.4vw,4.6rem)]"
            data-split
          >
            Words from
            <br />
            amazing clients.
          </h2>

          <p
            className="mt-7 max-w-[32rem] font-serif text-[1.25rem] leading-snug text-ink/70 lg:col-span-6 lg:col-start-3 lg:mt-9 lg:text-[clamp(1.15rem,1.4vw,1.4rem)]"
            data-reveal="up"
          >
            Here’s what some of the people I’ve worked with
            <br className="hidden lg:block" /> have to say about the experience.
          </p>
        </header>

        {/* The museum object — a medallion on phones, the right-hand column of the
            spread on desktop: the laurelled figure, veiled and fading into the paper. */}
        <figure
          aria-hidden="true"
          className="pointer-events-none relative mx-auto mt-14 h-[13.5rem] w-[13.5rem] opacity-90 sm:h-[15.5rem] sm:w-[15.5rem] lg:absolute lg:right-[var(--gutter)] lg:top-[clamp(4rem,6.5vw,6.5rem)] lg:mx-0 lg:mt-0 lg:h-[clamp(18rem,28vw,28rem)] lg:w-[clamp(16rem,24vw,24rem)]"
        >
          <span className="absolute bottom-0 left-1/2 aspect-square w-[86%] -translate-x-1/2 rounded-full border border-[var(--rule-light)] bg-[radial-gradient(circle,rgb(166_157_142/0.22)_0%,transparent_72%)]" />
          <div className="absolute inset-0" data-parallax="4">
            <Image
              src="/assets/testimonials-figure.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 24vw, 50vw"
              className="testimonial-bust object-contain object-bottom"
              data-reveal="image"
            />
          </div>
        </figure>

        <TestimonialRail testimonials={testimonials} platform={TESTIMONIAL_PLATFORM} />
      </div>
    </section>
  );
}
