/* eslint-disable no-console */
import { sql } from "drizzle-orm";

import { db } from "@/db";

async function createSchema(): Promise<void> {
  try {
    console.log("Creating database schema...");

    // Drop existing tables if they exist
    await db.run(sql`DROP TABLE IF EXISTS matchbooks`);
    await db.run(sql`DROP TABLE IF EXISTS projects`);

    // Create matchbooks table using Drizzle
    await db.run(sql`
      CREATE TABLE matchbooks (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        date TEXT NOT NULL,
        primary_image TEXT NOT NULL,
        secondary_image TEXT NOT NULL,
        city TEXT,
        state TEXT,
        country TEXT,
        established TEXT,
        street TEXT
      )
    `);

    // Create projects table
    await db.run(sql`
      CREATE TABLE projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        year TEXT NOT NULL,
        project_type TEXT NOT NULL,
        url TEXT NOT NULL
      )
    `);

    console.log("Database schema created!");
  } catch (error) {
    console.error("Schema creation failed:", error);
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
