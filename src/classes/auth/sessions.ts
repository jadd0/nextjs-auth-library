import { DatabaseSessionInteractions } from "@/db/interfaces/databaseSessionInteractions";
import { Session } from "./session";
import { NewSession } from "@/db/schemas";

/**
 * @class Sessions
 * @description Represents a blueprint for an object encapsulating user sessions in the authentication system.
 * @property {Map<string, Session>} sessions - A map storing active sessions with their IDs.
 */
export class Sessions {
  /** Main property containing the user sessions */
  sessions: Map<string, Session>; // string "id" is directly equivalent to the database ID for a user's Session

  constructor() {
    this.sessions = new Map<string, Session>();
  }

  /** Private method to generate a random ID string */
  private generateSessionId(): string {
    return Math.random().toString(36).substring(2);
  }

  /** Create a new session and store it */
  async createSession(user: any): Promise<Session> {
    // Create Session object
    const session = new Session(user);

    // Insert new session into Sessions database table
    const result = await DatabaseSessionInteractions.createSession({
      sessionToken: session.sessionToken,
      userId: user.id,
      expires: new Date(), // TODO: implement properly
    });

    if (!result) {
      throw new Error(
        "An error occured whilst attempting to create a database authentication session for the user with ID: " +
          user.id
      );
    }

    // Append the new Session to the Sessions map
    this.sessions.set(result.id, session);

    return session;
  }

  /** Retrieve a session by its ID */
  getSession(sessionId: string): Session | null {
    return this.sessions.get(sessionId) || null;
  }

  /** Delete a session by its ID */
  deleteSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }
}
