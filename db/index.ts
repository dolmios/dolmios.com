import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { join } from "path";

import * as schema from "@/db/schema";

// Always use local SQLite file (committed to git)
const dbPath = join(process.cwd(), "db", "matchbooks.db");

const client = createClient({
  url: `file:${dbPath}`,
});

export const db = drizzle(client, { schema });
