import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { MotionController } from "@/components/motion/MotionController";
import { Navigation } from "@/components/Navigation";
import { Tools } from "@/components/Tools";
import { Work } from "@/components/Work";
import { site } from "@/data/site";
import { getFeaturedProjects } from "@/lib/projects";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.contact.email}`,
  jobTitle: site.role,
  knowsAbout: ["Web development", "Frontend development", "Full-stack development", "React", "Next.js", "WordPress"],
  address: { "@type": "PostalAddress", addressLocality: "Alexandria", addressCountry: "EG" },
  sameAs: [site.contact.linkedin, site.contact.github],
};

export default async function Home() {
  const projects = await getFeaturedProjects();

  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Tools />
        <Work projects={projects} />
        <Journey />
        <Contact />
      </main>
      <Footer />
      <MotionController />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
