import { auth, authConfig, emailPasswordProvider } from "@/core/singleton";
import { DatabaseSessionInteractions } from "@/db/interfaces/databaseSessionInteractions";
import { DEFAULT_IDLE_TTL } from "@/shared/constants";
import { generateSessionCookie } from "@/utils/session";

export class ServerEmailPassword {
  provider: typeof emailPasswordProvider;
  constructor() {
    this.provider = emailPasswordProvider;
  }

  /** Use this to log a user in via Email and Password */
  async login(email: string, password: string) {
    // Attempt to log the user in via the provider
    const user = await this.provider.login(email, password);

    // Invalid email/password combination
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Create a session for the logged-in user
    const session = await auth.sessions.createSession(user);    

    // Generate session cookie 
    const cookie = generateSessionCookie("session", session.getSessionToken(), authConfig.idleTTL || DEFAULT_IDLE_TTL);

    return { user, session, cookie };
  }
}
