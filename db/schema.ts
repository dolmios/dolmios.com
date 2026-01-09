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

export const projects = sqliteTable("projects", {
  description: text("description").notNull(),
  id: text("id").primaryKey(),
  projectType: text("project_type").notNull(), // library, tool, app, etc.
  title: text("title").notNull(),
  url: text("url").notNull(),
  year: text("year").notNull(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
