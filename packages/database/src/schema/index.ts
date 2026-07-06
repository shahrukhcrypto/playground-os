import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const projectVersions = pgTable('project_versions', {
  id: serial('id').primaryKey(),
  projectId: serial('project_id').notNull(),
  snapshot: text('snapshot').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
