import { auth } from "@/core/singleton";

export class ClientSession {
  constructor() {}

  /** Use this to retrieve the current auth Session for a user.
   * You may want to use this to protect a route.
   */
  async getAuth() {
    if (!auth) {
      throw new Error("Auth module is not initialised");
    }

    const res = await fetch("/api/auth/session", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    // Failed to retrieve session
    if (!res.ok) {
      throw new Error(`Failed to retrieve session: ${res.statusText}`);
    }

    const data = await res.json();
    return data.session;
  }
}