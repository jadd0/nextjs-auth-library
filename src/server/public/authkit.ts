// ! DEPRECATED

import { Auth } from "@/classes/auth/server/auth";
import { DatabaseInteractions } from "@/classes/db";
import { AuthConfig } from "@/shared/types";
import { AuthConfigSchema } from "@/shared/validation";
import { drizzle } from "drizzle-orm/node-postgres";

/** Global exported member for main auth instance */
export let auth: Auth | null = null;
export let databaseConnection: any = null;

/**
 * AuthKit function to initialise authentication with the provided configuration. This keeps the main Auth instance server-side to deter any misuse.
 * @param {AuthConfig} config - The authentication configuration object.
 */
export default function AuthKit(config: AuthConfig) {
  // No config found, throw an error
  if (!config) {
    throw new Error(
      "Auth configuration not found. Please ensure you have an auth config file."
    );
  }

  // Validate config using Zod schema
  const parsed = AuthConfigSchema.safeParse(config);

  // If validation fails, throw an error with details
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `- ${issue.message} (at ${issue.path.join(".")})`)
      .join("\n");
    throw new Error(
      `Invalid auth configuration:\n${issues}\nPlease refer to the documentation for the correct configuration format.`
    );
  }
  // TODO: Ensure this works
  /** Connect to user's database */
  if (config.databaseURL) {
    databaseConnection = drizzle(config.databaseURL);
  } else if (config.databasePool) {
    databaseConnection = drizzle(config.databasePool);
  }

  auth = new Auth(config.providers, config.callbacks);

  // TODO: remove
  console.log("AuthKit initialised with config:", config);
}

/** Global exported member for database interactions */
export const databaseInteractions = new DatabaseInteractions();
