import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),

  company: text("company").notNull(),

  role: text("role").notNull(),

  status: text("status").notNull(),

  notes: text("notes"),

  createdAt: timestamp("created_at").defaultNow(),
});

export type Job = typeof jobs.$inferSelect;