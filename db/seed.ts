/* eslint-disable no-console */
import { db } from "@/db";
import { matchbooks } from "@/db/schema";

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

async function seed(): Promise<void> {
  try {
    // Clear existing data
    await db.delete(matchbooks);

    // Insert example matchbooks
    await db.insert(matchbooks).values(exampleMatchbooks);

    console.log("✅ Seeded database with 5 example matchbooks");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
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
