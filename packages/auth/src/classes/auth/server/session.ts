import { User } from "./user";

/**
 * @class Session
 * @description Represents a user session in the authentication system for server-side operations.
 * @property {User | null} user - The authenticated user associated with the session, or null if unauthenticated.
 * @property {Date} authenticationTime - The timestamp when the session was created or last authenticated.
 */
export class Session {
  user: User | null;
  authenticationTime: Date | null = new Date();
  // TODO: add expiry time?

  constructor(user?: User | null) {
    this.user = user;
  }

  /** Used to retrieve the authentication state of a user */
  isAuthenticated(): boolean {
    return this.user !== null;
  }

  /** Used to retrieve the user */
  getUser(): User | null {
    return this.user;
  }

  /** Used to set the user */
  setUser(user: User | null): void {
    this.user = user;
    this.authenticationTime = new Date();
  }

  /** Used to unauthenticate the user */
  unauthenticate(): void {
    this.user = null;
    this.authenticationTime = null;

    // TODO: Add logic to clear tokens and session in db?
  }

  /** Used to retrieve the authentication time (when the session was created or last authenticated) */
  getAuthenticationTime(): Date {
    return this.authenticationTime;
  }
}
