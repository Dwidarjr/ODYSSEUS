/**
 * Client reviews, taken verbatim from the Khamsat profile where each of these
 * projects was delivered. The reviews were written in Arabic: `quote` is the
 * English translation that appears on the page and `original` keeps the words
 * as the client wrote them, so the source is never lost.
 *
 * Nothing here is written for the portfolio — names, services and ratings are
 * exactly as the platform records them.
 */
export interface Testimonial {
  id: string;
  /** As shown on the client's profile. */
  name: string;
  /** Set when the name is not in latin script, so it keeps its own direction. */
  nameLang?: "ar";
  /** The service that was delivered. */
  service: string;
  quote: string;
  original: string;
  rating: number;
}

/** No profile URL is recorded in the project, so the platform is named, not linked. */
export const TESTIMONIAL_PLATFORM = "Khamsat";

export const testimonials: Testimonial[] = [
  {
    id: "elsherbiny",
    name: "Elsherbiny M.",
    service: "WordPress maintenance & technical fixes",
    quote:
      "It was an honour to work with engineer Hossam — the height of professionalism, quick to respond, and the work was done with great precision. I strongly recommend him for solving the problem.",
    original:
      "تشرفت بالتعامل مع المهندس حسام قمة في الاحترافية والتجاوب السريع وانجاز للعمل بدقة عالية انصح بشدة في حل المشكلة بالتعامل معه",
    rating: 5,
  },
  {
    id: "mona",
    name: "Mona A.",
    service: "Professional WordPress site, responsive on every screen",
    quote:
      "Amazing. I thank him for the design — I loved it, and it expressed what I wanted, professionally. I recommend him to anyone who wants professionalism and a unique design. It isn’t the first time, and I’ll come back to you again and again. Fast delivery, fast communication, quality that can’t be topped.",
    original:
      "رررهيب واشكره على التصميم اعجبني مره وعبر ما اريد باحترافيه انصح لمن اراد التعامل معه باحترافيه والتصميم الفريد ليست المره الاولى وسأعود اليك مرار وقت التسليم سريع التواصل سريع الجوده لا يعلى عليها",
    rating: 5,
  },
  {
    id: "mojarad-ehsas",
    name: "مجرد إحساس ل.",
    nameLang: "ar",
    service: "Professional WordPress site, responsive on every screen",
    quote: "Hardworking and so helpful. Thank you.",
    original: "مجتهد ومعاون جداً شكراً لك",
    rating: 5,
  },
  {
    id: "yasser",
    name: "Yasser A.",
    service: "Professional WordPress site, responsive on every screen",
    quote: "Wonderful, Hossam — you gave it your effort and more. May God give you strength.",
    original: "رائع حسام، سويت جهدك وزيادة … الله يعطيك العافية",
    rating: 5,
  },
];
