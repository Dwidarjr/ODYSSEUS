import Image from "next/image";
import Link from "next/link";
import { navItems, site } from "@/data/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./ui/Icons";

export function Footer() {
  return (
    <footer className="surface-film text-ivory">
      <div className="relative z-10 px-[var(--gutter)] pb-10 pt-16 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:items-start">
          <p className="meta-lg leading-[2.1] text-ivory/85">
            <Image src="/assets/logo.webp" alt="" width={103} height={96} className="logo-mark mb-5 block h-12 w-auto" />
            {site.name}
            <br />
            <span className="text-stone">{site.role}</span>
            <br />
            <span className="text-stone">{site.location}</span>
          </p>

          <p className="serif-caps text-left text-[0.95rem] leading-[2] tracking-[0.38em] text-stone md:text-center">
            {site.motto[0]}
            <br />
            {site.motto[1]}
            <span aria-hidden="true" className="mt-3 block h-px w-10 bg-stone/50 md:mx-auto" />
          </p>

          <div className="flex flex-col gap-8 md:items-end">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-6 gap-y-3 xl:gap-x-8">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="meta link-draw pb-1 text-ivory/75 hover:text-ivory">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ul className="flex gap-6 text-ivory/70">
              <li>
                <a href={site.contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-ivory">
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a href={site.contact.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-ivory">
                  <GitHubIcon className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} aria-label="Email" className="hover:text-ivory">
                  <MailIcon className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--rule-dark)] pt-7 font-serif text-[0.95rem] text-stone sm:flex-row sm:justify-between">
          <p>© {site.year} {site.name}.</p>
          <p>Built with purpose.</p>
        </div>
      </div>
    </footer>
  );
}
