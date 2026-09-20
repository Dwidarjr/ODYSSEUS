import { projects } from "@/data/projects";
import type { Project } from "@/types/project";

/**
 * Project repository. Every consumer goes through these async functions, so
 * swapping the static array for a database or API call is a change here only.
 */
function published(list: Project[]): Project[] {
  return list.filter((p) => p.status === "published").sort((a, b) => a.order - b.order);
}

export async function getProjects(): Promise<Project[]> {
  return published(projects);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return published(projects).filter((p) => p.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return published(projects).find((p) => p.slug === slug);
}

export async function getProjectSlugs(): Promise<string[]> {
  return published(projects).map((p) => p.slug);
}
