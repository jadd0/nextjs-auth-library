import { Session } from "./session";

/**
 * @class Sessions
 * @description Represents a blueprint for an object encapsulating user sessions in the authentication system.
 * @property {Map<string, Session>} sessions - A map storing active sessions with their IDs.
 */
export class Sessions {
  /** Main property containing the user sessions */
  sessions: Map<string, Session>;

  constructor() {
    this.sessions = new Map<string, Session>();
  }

  /** Private method to generate a random ID string */
  private generateSessionId(): string {
    return Math.random().toString(36).substring(2);
  }

  /** Create a new session and store it */
  createSession(user: any): Session {
    const session = new Session(user);
    this.sessions.set(this.generateSessionId(), session);
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
