export interface Discipline {
  id: string;
  name: string;
  items: string[];
  image: { src: string; alt: string; width: number; height: number };
}

export const disciplines: Discipline[] = [
  {
    id: "frontend",
    name: "Frontend",
    items: ["HTML · CSS · JavaScript", "React · Next.js", "Responsive Layouts"],
    image: {
      src: "/assets/tool-code.png",
      alt: "Marble bust of a youth wearing a carved travelling hat",
      width: 833,
      height: 1162,
    },
  },
  {
    id: "interface",
    name: "Interface",
    items: ["UI / UX", "Design Systems", "Accessibility"],
    image: {
      src: "/assets/tool-design.png",
      alt: "Marble bust crowned with a laurel wreath",
      width: 1073,
      height: 1344,
    },
  },
  {
    id: "backend",
    name: "Backend",
    items: ["APIs & Integrations", "Databases", "WordPress & CMS"],
    image: {
      src: "/assets/tool-business.png",
      alt: "Bearded marble bust of a philosopher",
      width: 1016,
      height: 1487,
    },
  },
  {
    id: "craft",
    name: "Craft",
    items: ["Clean Code", "Performance", "Git & Deployment"],
    image: {
      src: "/assets/tool-numbers.png",
      alt: "Marble bust of a warrior in a crested helmet",
      width: 957,
      height: 1456,
    },
  },
];
