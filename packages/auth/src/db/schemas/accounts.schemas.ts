import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { id } from "zod/locales";
import { users } from "./users.schemas";
import { PROVIDERS } from "@/shared/constants";

const providerEnum = pgEnum("provider", PROVIDERS);

export const accounts = pgTable(
  "accounts",
  {
    /** Reference to user table id;
     * Used as a composite primary key with provider to ensure uniqueness
     */
    userId: varchar("userId")
      .notNull()
      .references(() => users.id),

    /** The type of authentication relating to the account, ie: oidc, oauth */
    type: varchar("type").notNull(),

    /** The type of provider liked with the account */
    provider: providerEnum("provider").notNull(),

    /** The id related to the provider used to make the account;
     *  Used for third party connections */
    providerAccountId: varchar("providerAccountId"),

    /** The refresh token used for the acount */
    refreshToken: varchar("refreshToken"),

    /** The access token used for the acount */
    accessToken: varchar("accessToken"),

    /** A unix timestamp used to express when the access token expires;
     * Used for third party connections
     */
    expiresAt: integer("expiresAt"),

    /** The id token used for the account */
    idToken: text("idToken"),

    /** The scope of the access token */
    scope: varchar("scope"),

    /** The type of the token */
    tokenType: varchar("tokenType"),

    /** A timestamp explaining when the account connection was created */
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => ({
    /** Composite primary key consisting of user ID (foreign key to users table) and the provider used to  */
    pk: primaryKey({ columns: [table.userId, table.provider] }),
  })
);
