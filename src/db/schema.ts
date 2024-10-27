import { integer, text, pgTable, boolean } from "drizzle-orm/pg-core";

export const taskTable = pgTable("task", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    // There is no significant difference between text and varchar. I can use either.
    title: text("title").notNull(),
    isComplete: boolean("is_complete").notNull().default(false)
})
