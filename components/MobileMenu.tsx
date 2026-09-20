"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { navItems, site } from "@/data/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./ui/Icons";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previous = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    // Wait a frame for the panel to become visible before it can take focus.
    const focusTimer = window.setTimeout(
      () => panel?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true }),
      60
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panel) return;
      // Keep focus inside the menu (the toggle button lives in the header).
      const toggle = document.querySelector<HTMLElement>('[aria-controls="mobile-menu"]');
      const focusables = [
        ...(toggle ? [toggle] : []),
        ...panel.querySelectorAll<HTMLElement>("a[href]"),
      ];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      previous?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      inert={!open}
      className={`surface-film fixed inset-0 z-[55] flex flex-col bg-ink px-[var(--gutter)] pb-10 pt-32 text-ivory transition-[opacity,visibility] duration-700 ease-[var(--ease-cinema)] lg:hidden ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <nav aria-label="Mobile" className="flex flex-1 flex-col items-center">
        <ul className="flex flex-col items-center gap-9">
          {navItems.map((item, i) => (
            <li
              key={item.href}
              className="transition-[opacity,transform] duration-700 ease-[var(--ease-cinema)]"
              style={{
                transitionDelay: open ? `${150 + i * 70}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(14px)",
              }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className="serif-caps link-draw pb-1 text-[1.35rem] tracking-[0.3em]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col items-center gap-6 text-center">
          <p className="meta text-stone">
            A code
            <br />
            odyssey
          </p>
          <span aria-hidden="true" className="h-px w-10 bg-stone/60" />
          <ul className="flex items-center gap-7 text-ivory/85">
            <li>
              <a href={site.contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInIcon className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a href={site.contact.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHubIcon className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} aria-label="Email">
                <MailIcon className="h-4 w-4" />
              </a>
            </li>
          </ul>
          <p className="mt-4 font-serif text-sm text-stone">
            © {site.year} {site.name}. Built with purpose.
          </p>
        </div>
      </nav>
    </div>
  );
}
