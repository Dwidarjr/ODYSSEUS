/**
 * Project content model.
 *
 * Shaped so a future CMS / database row can map onto it 1:1. Fields marked
 * "phase 2" are already honoured by the UI where relevant, so the admin
 * dashboard only needs to start writing them.
 */
export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * "cover"  — a screenshot / photograph filling its frame.
   * "cutout" — a transparent object (e.g. a statue) placed on a dark plate.
   */
  treatment?: "cover" | "cutout";
  /** CSS object-position used when the frame crops the image, e.g. "50% 0%". */
  position?: string;
}

/** A captioned screenshot plate inside a case study. */
export interface CaseStudyPlate extends ProjectImage {
  caption: string;
  /** Frame aspect ratio, e.g. "16 / 9". Defaults to the image's own ratio. */
  aspect?: string;
  /** Spans both columns of the plate grid. */
  wide?: boolean;
}

export interface CaseStudySection {
  id: string;
  numeral: string;
  /** Tiny caption under the numeral, e.g. "Website". */
  label: string;
  title: string;
  intro: string;
  points?: string[];
  /** Ordered process, rendered as numbered steps. */
  steps?: { title: string; text: string }[];
  plates?: CaseStudyPlate[];
  /** "supporting" sections are set slightly quieter than primary ones. */
  emphasis?: "primary" | "supporting";
}

export interface CaseStudy {
  overview: string[];
  facts: { label: string; value: string }[];
  role: string[];
  roleNote?: string;
  sections: CaseStudySection[];
  stack: { name: string; note: string }[];
  scope?: string;
}

export type ProjectKind = "concept" | "client" | "personal";

export type ProjectStatus = "published" | "draft";

export interface ProjectSeo {
  title?: string;
  description?: string;
  ogImage?: string;
}

export interface Project {
  id: string;
  slug: string;
  /** Display number, e.g. "01". */
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  /** Primary image. When absent the UI renders a typographic plate instead. */
  image?: ProjectImage;
  /** Short editorial line set over the image plate, e.g. "Small Ideas. Big Lessons." */
  caption?: string;
  gallery: ProjectImage[];
  /** Only rendered when present — never an empty "view live" button. */
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  /** Presented as a label, e.g. "Concept project". */
  kind?: ProjectKind;
  /** Long-form content for the project page. */
  caseStudy?: CaseStudy;
  /** phase 2 — manual ordering from the dashboard. */
  order: number;
  /** phase 2 — drafts are filtered out of every public query. */
  status: ProjectStatus;
  /** phase 2 — per-project SEO overrides. */
  seo?: ProjectSeo;
}
