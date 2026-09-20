"use client";

import { useLayoutEffect } from "react";

/**
 * Forces a route to open at the very top.
 *
 * The site sets `scroll-behavior: smooth` for the in-page anchors, which makes
 * the router's own scroll reset animate — and that animation gets cancelled by
 * the images and scroll animations settling on the new page, leaving it at the
 * previous page's offset. An explicit instant scroll on mount is unaffected.
 */
export function ScrollToTop() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null;
}
