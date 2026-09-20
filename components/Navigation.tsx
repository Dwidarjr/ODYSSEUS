"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { navItems, site } from "@/data/site";
import { MobileMenu } from "./MobileMenu";

/**
 * Fixed editorial navigation. It uses `mix-blend-mode: difference`, so the same
 * ivory type reads on the dark spreads and inverts to ink on the paper spreads.
 */
export function Navigation() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* The HD mark sits outside the blended header so its marble keeps its colour.
          The name link below extends underneath it, so clicking the mark goes home. */}
      <div aria-hidden="true" className="pointer-events-none fixed left-[var(--gutter)] top-[22px] z-[61] lg:top-[26px]">
        <Image
          src="/assets/logo.webp"
          alt=""
          width={103}
          height={96}
          preload
          className="logo-mark h-9 w-auto lg:h-10"
        />
      </div>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] text-ivory mix-blend-difference">
        <div className="flex items-start justify-between px-[var(--gutter)] pt-6 lg:items-center lg:pt-8">
          <Link
            href="/#home"
            className="meta-lg pointer-events-auto -ml-1 py-1 pl-[3.25rem] leading-[1.5] tracking-[0.28em] lg:pl-[3.6rem] lg:tracking-[0.32em]"
            aria-label={`${site.name} — home`}
            onClick={close}
          >
            <span className="block lg:inline">Hossam</span>
            <span className="lg:ml-[0.6em]">Dwidar</span>
          </Link>

          <nav aria-label="Primary" className="pointer-events-auto hidden lg:block">
            <ul className="flex gap-[clamp(2rem,4vw,4.25rem)]">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="meta link-draw pb-1 opacity-80 transition-opacity hover:opacity-100">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="meta hidden items-center gap-4 opacity-80 lg:flex">
            {site.location}
            <span aria-hidden="true" className="block h-px w-12 bg-current opacity-70" />
          </p>

          <button
            type="button"
            className="pointer-events-auto -mr-2 -mt-1 flex h-10 w-10 flex-col items-end justify-center gap-[7px] p-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-px w-6 bg-current transition-transform duration-500 ease-[var(--ease-cinema)] ${open ? "translate-y-[4px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px bg-current transition-all duration-500 ease-[var(--ease-cinema)] ${open ? "w-6 -translate-y-[4px] -rotate-45" : "w-4"}`}
            />
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={close} />
    </>
  );
}
