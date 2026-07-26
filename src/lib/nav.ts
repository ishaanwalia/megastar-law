import { practiceAreas } from "@/lib/firm-data";

export const mainNav = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  {
    title: "Practice Areas",
    href: "/practice-areas",
    items: practiceAreas.map((area) => ({
      title: area.title,
      href: `/practice-areas/${area.slug}`,
      description: area.summary,
    })),
  },
  { title: "Contact", href: "/contact" },
];
