import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="surface-film flex min-h-[100svh] flex-col items-center justify-center px-[var(--gutter)] text-center text-ivory">
      <p className="meta text-stone">Error · CDIV</p>
      <h1 className="font-display mt-6 text-[clamp(2.6rem,8vw,5rem)] uppercase">Lost at sea</h1>
      <p className="mt-5 font-serif text-[1.3rem] italic text-ivory/75">Even Odysseus took the long way home.</p>
      <Link href="/" className="meta mt-12 inline-flex items-center gap-4 text-ivory">
        <span aria-hidden="true">←</span>
        <span className="link-draw pb-1">Return home</span>
      </Link>
    </main>
  );
}
