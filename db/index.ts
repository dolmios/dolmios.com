import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { join } from "path";

import * as schema from "@/db/schema";

// Use Turso if configured, otherwise fall back to local SQLite
const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

let client;

if (tursoUrl && tursoAuthToken) {
  // Production: Use Turso
  client = createClient({
    authToken: tursoAuthToken,
    url: tursoUrl,
  });
} else {
  // Development: Use local SQLite file
  const dbPath = join(process.cwd(), "db", "matchbooks.db");

  client = createClient({
    url: `file:${dbPath}`,
  });
}

export const db = drizzle(client, { schema });
