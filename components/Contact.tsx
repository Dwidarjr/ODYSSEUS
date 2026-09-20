import Image from "next/image";
import { site } from "@/data/site";
import { GitHubIcon, GlobeIcon, LinkedInIcon, MailIcon } from "./ui/Icons";
import { SectionMark } from "./ui/SectionMark";

const display = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const links = [
  { label: site.contact.email, href: `mailto:${site.contact.email}`, Icon: MailIcon, external: false },
  { label: display(site.contact.linkedin), href: site.contact.linkedin, Icon: LinkedInIcon, external: true },
  { label: display(site.contact.github), href: site.contact.github, Icon: GitHubIcon, external: true },
  { label: display(site.contact.website), href: site.contact.website, Icon: GlobeIcon, external: true },
];

/** VI — THE NEXT HORIZON. Calm, spacious; Alexandria's lighthouse on the horizon. */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="horizon-title"
      className="surface-paper relative overflow-hidden lg:min-h-[clamp(36rem,40vw,52rem)]"
    >
      {/* Desktop horizon plate */}
      <div className="absolute inset-x-0 bottom-0 hidden aspect-[2170/725] lg:block" data-reveal="fade">
        <Image
          src="/assets/horizon-wide.png"
          alt="Sepia photograph of Qaitbay fort and the lighthouse on Alexandria's harbour beneath a pale sun"
          fill
          sizes="100vw"
          className="object-cover object-right [mask-image:linear-gradient(to_bottom,transparent,#000_22%)]"
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 px-[var(--gutter)] pb-16 pt-24 lg:grid-cols-12 lg:gap-x-8 lg:pb-[clamp(6rem,9vw,9rem)] lg:pt-[clamp(6.5rem,10vw,10rem)]">
        <SectionMark numeral="VI" label="Contact" className="lg:col-span-2" />

        <div className="mt-10 lg:col-span-8 lg:mt-0">
          <h2
            id="horizon-title"
            className="font-display text-[clamp(2.7rem,12vw,4rem)] lg:whitespace-nowrap lg:text-[clamp(3rem,4.4vw,4.6rem)]"
            data-split
          >
            The Next <span className="max-lg:block">Horizon</span>
          </h2>
          <p className="mt-5 font-serif text-[1.75rem] leading-tight text-ink/85 lg:text-[clamp(1.5rem,2vw,2rem)]" data-reveal="up">
            Let’s build <br className="sm:hidden" />
            something.
          </p>
          <p className="mt-4 max-w-[26rem] font-serif text-[1.15rem] leading-snug text-ink/65" data-reveal="up">
            Websites, web applications and digital products —
            <br className="hidden sm:block" /> ideas ready to become real.
          </p>

          {/* Mobile horizon plate */}
          <div className="relative -mx-[var(--gutter)] mt-12 aspect-[1536/1000] lg:hidden" data-reveal="fade">
            <Image
              src="/assets/horizon-lighthouse.png"
              alt="Qaitbay fort and the lighthouse of Alexandria before a pale sun"
              fill
              sizes="100vw"
              className="object-contain [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]"
            />
          </div>

          <ul className="mt-12 space-y-4 lg:mt-10" data-reveal="up">
            {links.map(({ label, href, Icon, external }) => (
              <li key={href}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group inline-flex items-center gap-5 font-serif text-[1.15rem] text-ink/85 transition-colors hover:text-ink"
                >
                  <Icon className="h-4 w-4 text-ink/80" />
                  <span className="link-draw">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p
          className="meta mt-14 justify-self-end text-ink/60 lg:absolute lg:right-[var(--gutter)] lg:top-[clamp(6.5rem,10vw,10rem)] lg:mt-0"
          data-reveal="fade"
        >
          New
          <br />
          ideas
          <br />
          always
          <br />
          ahead.
        </p>
      </div>
    </section>
  );
}
