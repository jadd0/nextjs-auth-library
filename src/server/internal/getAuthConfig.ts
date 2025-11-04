// ! DEPRECATED

import type { AuthConfig } from "@/shared/types";
import loadAuthConfig from "../config/loadAuthConfig";
import { Session } from "@/classes/auth/server/session";
import { Auth } from "@/classes/auth/server/auth";
import { DatabaseInteractions } from "@/classes/db";
import { drizzle } from "drizzle-orm/node-postgres";

export let auth: Auth | null = null;
export let databaseConnection: any = null;

export default async function getAuthConfig(): Promise<Auth> {
  if (!auth) {
    const config: AuthConfig = await loadAuthConfig();

    if (!config) {
      console.error(
        "Auth configuration not found. Please ensure you have an auth config file."
      );
      return;
    }

    /** Connect to user's database */
    if (config.databaseURL) {
      databaseConnection = drizzle(config.databaseURL);
    } else if (config.databasePool) {
      databaseConnection = drizzle(config.databasePool);
    }

    auth = new Auth(config.providers, config.callbacks);
  }

  return auth;
}

/** Global exported member for database interactions */
export const databaseInteractions = new DatabaseInteractions();
