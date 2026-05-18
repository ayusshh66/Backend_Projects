import { integer, pgTable, varchar, text, boolean,timestamp } from "drizzle-orm/pg-core";


export const usersTable = pgTable("users", {
  id: integer("Todo_Id").primaryKey().generatedAlwaysAsIdentity(),
  description: text("Todos").notNull(),
  completed: boolean("Complete_status").default(false),
  createdAt : timestamp("Created_At").defaultNow().notNull(),
});


