import type { AuthConfig } from "@/shared/validation";
import loadAuthConfig from "../config/loadAuthConfig";
import { Session } from "@/classes/auth/server/session";
import { Auth } from "@/classes/auth/server/auth";

let instance: AuthConfig | undefined;

export async function getAuthConfig(): Promise<Session> {
  if (!instance) {
    const config = await loadAuthConfig();
    instance = new Auth();
  }
}
