/* eslint-disable no-console */
import { db } from "@/db";
import { matchbooks, projects } from "@/db/schema";

const exampleMatchbooks = [
  {
    city: "New York",
    country: "USA",
    date: "2024-01-15",
    description: "Classic matchbook from a downtown Manhattan steakhouse.",
    id: "nyc-steakhouse",
    primaryImage: "/matchbooks/temp-1.jpeg",
    secondaryImage: "/matchbooks/temp-2.jpeg",
    state: "NY",
    title: "NYC Steakhouse",
  },
  {
    city: "Los Angeles",
    country: "USA",
    date: "2024-02-20",
    description: "Vintage matchbook from a Hollywood supper club.",
    id: "la-supper-club",
    primaryImage: "/matchbooks/temp-1.jpeg",
    secondaryImage: "/matchbooks/temp-2.jpeg",
    state: "CA",
    title: "Hollywood Supper Club",
  },
  {
    city: "Chicago",
    country: "USA",
    date: "2024-03-10",
    description: "Matchbook from a famous Chicago jazz lounge.",
    id: "chicago-jazz",
    primaryImage: "/matchbooks/temp-1.jpeg",
    secondaryImage: "/matchbooks/temp-2.jpeg",
    state: "IL",
    title: "Chicago Jazz Lounge",
  },
  {
    city: "San Francisco",
    country: "USA",
    date: "2024-04-05",
    description: "Matchbook from a Bay Area seafood restaurant.",
    id: "sf-seafood",
    primaryImage: "/matchbooks/temp-1.jpeg",
    secondaryImage: "/matchbooks/temp-2.jpeg",
    state: "CA",
    title: "SF Seafood House",
  },
  {
    city: "Miami",
    country: "USA",
    date: "2024-05-12",
    description: "Matchbook from a Miami Beach cocktail bar.",
    id: "miami-beach-bar",
    primaryImage: "/matchbooks/temp-1.jpeg",
    secondaryImage: "/matchbooks/temp-2.jpeg",
    state: "FL",
    title: "Miami Beach Bar",
  },
];

const exampleProjects = [
  {
    description:
      "A Stitches-like CSS-in-JS library with CSS variables for instant theme switching, built-in multi-theme support, and Next.js App Router integration. Type-safe, performant, and actively maintained.",
    id: "stoop",
    projectType: "CSS-in-JS Library",
    title: "Stoop",
    url: "https://stoop.dolmios.com/",
    year: "2026",
  },
  {
    description:
      "A companion UI component library for Stoop, providing pre-built, type-safe React components with built-in theming support. Ships with accessible, customizable components for rapid application development.",
    id: "stoop-ui",
    projectType: "UI Library",
    title: "Stoop UI",
    url: "https://www.npmjs.com/package/stoop-ui",
    year: "2026",
  },
  {
    description:
      "A comprehensive ESLint configuration for modern JavaScript and TypeScript projects. Features TypeScript support, React best practices, accessibility rules, Next.js optimization, and automatic project structure detection.",
    id: "eslint-config-dolmios",
    projectType: "ESLint Config",
    title: "ESLint Config",
    url: "https://github.com/dolmios/eslint-config-dolmios",
    year: "2022",
  },
  {
    description:
      "A comprehensive directory of short-term rental software helping vacation rental businesses discover, compare, and select the most suitable platforms. Features AI-powered recommendations and detailed platform comparisons.",
    id: "hoststack",
    projectType: "Web App",
    title: "HostStack",
    url: "https://hoststack.app/",
    year: "2025",
  },
  {
    description:
      "An open-source web-based UI component library for HostStack. Provides reusable components and design patterns for building consistent interfaces across the HostStack ecosystem.",
    id: "hoststack-ui",
    projectType: "UI Library",
    title: "HostStack UI",
    url: "https://github.com/hoststack/ui",
    year: "2025",
  },
  {
    description:
      "A curated film camera collection and online store delivering vintage cameras across Australia. Features carefully selected 35mm and medium format cameras that are personally tested and approved for use.",
    id: "artefact35",
    projectType: "E-Commerce",
    title: "Artefact35",
    url: "http://a35.dolmios.com/",
    year: "2016",
  },
  {
    description:
      "A React component library, designed for Consolia's internal projects and design system. Features modern design patterns, TypeScript-first development, light/dark mode theming, and comprehensive responsive utilities.",
    id: "consolia-ui",
    projectType: "UI Library",
    title: "Consolia UI",
    url: "https://github.com/consolia-io/ui",
    year: "2025",
  },
  {
    description:
      "Real-time NYC Alternate Side Parking tracking web app built with Next.js and Supabase. Features automatic ASP zone detection, parking session management with reminders, and visual map display of parking zones. Still working on this when I find time, mostly it's an experiment using NYC Open Data.",
    id: "sweeptime",
    projectType: "Web App",
    title: "Sweeptime",
    url: "https://github.com/dolmios/sweeptime",
    year: "2026",
  },
];

async function seed(): Promise<void> {
  try {
    // Clear existing data
    await db.delete(matchbooks);
    await db.delete(projects);

    // Insert example matchbooks
    await db.insert(matchbooks).values(exampleMatchbooks);

    // Insert example projects
    await db.insert(projects).values(exampleProjects);

    console.log("Seeded database with 5 example matchbooks and 8 projects");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Run seed
seed()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
