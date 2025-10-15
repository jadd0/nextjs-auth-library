import type { AuthConfig } from "@/shared/validation";
import loadAuthConfig from "../config/loadAuthConfig";
import { Session } from "@/classes/auth/server/session";
import { Auth } from "@/classes/auth/server/auth";
import { DatabaseInteractions } from "@/classes/db";
import { drizzle } from "drizzle-orm/node-postgres";

export let auth: AuthConfig | undefined;
export let databaseConnection: any = null;

export async function getAuthConfig(): Promise<Auth> {
  if (!auth) {
    const config = await loadAuthConfig();

    if (!config) {
      console.error(
        "Auth configuration not found. Please ensure you have an auth config file."
      );
      return;
    }

    /** Connect to user's database */
    if (config.databaseURL) {
      databaseConnection = drizzle(config.databaseURL);
    }

    else if (config.databasePool) {
      databaseConnection = drizzle(config.databasePool);
    }

    auth = new Auth();
  }

  return auth;
}

/** Global exported member for database interactions */
export const databaseInteractions = new DatabaseInteractions();

/** Init auth */
getAuthConfig();
