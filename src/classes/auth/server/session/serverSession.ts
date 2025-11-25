import { auth } from "@/core/singleton";
import z from "zod";

export class ServerSession {
  constructor() {}

  /** Use this to get a session by its token, called from route handler after being invoked by clientSession */
  getSession(token: string) {
    // Basic validation
    if (z.string().min(1).parse(token).length === 0) {
      throw new Error("Token is required");
    }

    // Attempt to retrieve the session by its token
    const session = auth.sessions.getSessionByToken(token);

    // Session not found
    if (!session) {
      throw new Error("Session not found or invalid token");
    }

    return session;
  }
}
