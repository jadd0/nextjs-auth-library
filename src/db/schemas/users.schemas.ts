import { pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: varchar("username").notNull().unique(),
  email: varchar("email").notNull().unique(),
});
