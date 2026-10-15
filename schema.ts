import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const snapshots=sqliteTable("snapshots",{owner:text("owner").primaryKey(),payload:text("payload").notNull(),version:integer("version").notNull().default(1)});
