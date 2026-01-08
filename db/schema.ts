import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const matchbooks = sqliteTable("matchbooks", {
  city: text("city"),
  country: text("country"),
  date: text("date").notNull(),
  description: text("description").notNull(),
  id: text("id").primaryKey(),
  primaryImage: text("primary_image").notNull(),
  secondaryImage: text("secondary_image").notNull(),
  state: text("state"),
  title: text("title").notNull(),
});

export type Matchbook = typeof matchbooks.$inferSelect;
export type NewMatchbook = typeof matchbooks.$inferInsert;
