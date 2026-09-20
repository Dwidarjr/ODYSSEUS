export const site = {
  name: "Hossam Dwidar",
  url: "https://dwidarjr.space",
  role: "Web Developer",
  title: "Hossam Dwidar — Web Developer",
  description:
    "Portfolio of Hossam Dwidar — a web developer from Alexandria, Egypt, building websites and web applications with modern web technologies.",
  location: "Alexandria, Egypt",
  age: 26,
  year: 2026,
  yearRoman: "MMXXVI",
  motto: ["Disciplina", "Omnia Vincit"],
  contact: {
    email: "dwidarjr@gmail.com",
    linkedin: "https://www.linkedin.com/in/dwidarjr/",
    github: "https://github.com/Dwidarjr",
  },
} as const;

export const navItems = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
] as const;
