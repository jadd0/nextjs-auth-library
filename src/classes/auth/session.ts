import { generateSessionToken } from "@/utils/session/generateSessionToken";
import { User } from "@/db/schemas";

/**
 * @class Session
 * @description Represents a blueprint for an object encapsulating user sessions in the authentication system.
 * @property {User | null} user - The authenticated user associated with the session, or null if unauthenticated.
 * @property {Date} authenticationTime - The timestamp when the session was created or last authenticated.
 */
export class Session {
  // START: CREATE

  user: User | null;
  sessionToken: string;
  expires: Date;
  authenticationTime: Date = new Date();
  lastRetrievedTime: Date | null = null;

  constructor(user: User) {
    this.user = user || null;
    this.sessionToken = generateSessionToken();
    this.expires = expires;
  }

  // END: CREATE

  // START: READ

  /** Used to retrieve the authentication state of a user */
  getIsAuthenticated(): boolean {
    return this.user !== null;

    // TODO: implement proper auth logic here
  }

  /** Used to retrieve the user */
  getUser(): User | null {
    return this.user;
  }

  /** Used to retrieve the expiry time */
  getExpires(): Date {
    return this.expires;
  }

  /** Used to retrieve the authentication time (when the session was created or last authenticated) */
  getAuthenticationTime(): Date  {
    // TODO: chagne null to whatever
    return this.authenticationTime;
  }

  // END: READ

  // START: UPDATE

  /** Used to rotate session */

  rotateSession(): Session {


    return this;
  }

  // END: UPDATE

  // START: DELETE
  // END: DELETE
}
