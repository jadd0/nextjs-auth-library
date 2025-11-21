import { DatabaseSessionInteractions } from "@/db/interfaces/databaseSessionInteractions";
import { Session } from "./session";
import { Session as DatabaseSession } from "@/db/schemas";
import { DatabaseUserInteractions } from "@/db/interfaces/databaseUserInteractions";
import { generateSessionToken } from "@/utils/session/generateSessionToken";

/**
 * @class Sessions
 * @description Represents a blueprint for an object encapsulating user sessions in the authentication system.
 * @property {Map<string, Session>} sessions - A map storing active sessions with their IDs.
 */
export class Sessions {
  // START: CREATE

  /** Main property containing the user sessions */
  sessions: Map<string, Session>; // string "id" is directly equivalent to the database ID for a user's Session

  constructor() {
    this.sessions = new Map<string, Session>();
  }

  /** Create a new session and store it */
  async createSession(user: any): Promise<Session> {
    // Generate a unique Session token
    const sessionToken = generateSessionToken();

    // Insert new session into Sessions database table
    const result = await DatabaseSessionInteractions.createSession({
      sessionToken: sessionToken,
      userId: user.id,
    });

    // DB error occurred
    if (!result) {
      throw new Error(
        "An error occured whilst attempting to create a database authentication session for the user with ID: " +
          user.id
      );
    }

    // Create server Session object
    const session = new Session({
      id: result.id,
      user,
      createdAt: result.createdAt,
      sessionToken,
    });

    // Append the new Session to the Sessions map
    this.sessions.set(result.id, session);

    return session;
  }

  // END: CREATRE

  // START: READ

  /** Retrieve a session by its ID */
  getSession(sessionId: string): Session | null {
    return this.sessions.get(sessionId) || null;
  }

  // END: READ

  // START: UPDATE

  /** Method used to append database User Sessions to a server-friendly map */
  async appendDatabaseSessions(databaseSessions: DatabaseSession[]) {
    // Progmatically append each User to a Session object
    databaseSessions.forEach(async (session) => {
      // Retrieve the user assosciated with the session userId
      const user = await DatabaseUserInteractions.getUserById(session.userId);

      if (!user) {
        throw new Error(
          "There has been an error whilst attempting to retrieve user with ID " +
            session.userId +
            " for the session with ID " +
            session.id +
            " when attempting to append database Session to server Session map."
        );
      }

      // Append the session to the map
      this.sessions.set(
        session.id,
        new Session({
          id: session.id,
          user,
          createdAt: session.createdAt,
          sessionToken: session.sessionToken,
        })
      );
    });
  }

  // END: UPDATE

  // START: DELETE

  /** Delete a session by its ID */
  deleteSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // END: DELETE
}
