/* eslint-disable no-console */
import { sql } from "drizzle-orm";

import { db } from "@/db";

async function createSchema(): Promise<void> {
  try {
    console.log("🔄 Creating database schema...");

    // Create matchbooks table using Drizzle
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS matchbooks (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        date TEXT NOT NULL,
        primary_image TEXT NOT NULL,
        secondary_image TEXT NOT NULL,
        city TEXT,
        state TEXT,
        country TEXT
      )
    `);

    console.log("✅ Database schema created!");
  } catch (error) {
    console.error("❌ Schema creation failed:", error);
    throw error;
  }
}

createSchema()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
