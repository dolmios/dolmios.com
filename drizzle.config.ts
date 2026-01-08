import type { Config } from "drizzle-kit";

export default {
  dbCredentials: {
    url: "./db/matchbooks.db",
  },
  dialect: "sqlite",
  out: "./drizzle",
  schema: "./db/schema.ts",
  strict: true,
  verbose: true,
} satisfies Config;
