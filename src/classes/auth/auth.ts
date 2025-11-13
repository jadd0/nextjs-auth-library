import { Sessions } from "./sessions";
import { User } from "./user";
import { PROVIDERS } from "@/shared/constants";
/**
 * Main parent Auth class
 * @class Auth
 * @description This class serves as the main entry point for authentication functionalities. This will be extended by specific implementations for server and client environments.
 *
 */
export class Auth {
  sessions: Sessions;
  providers: (typeof PROVIDERS)[];
  callbacks: any;

  constructor(providers: any[], callbacks: any) {
    this.providers = providers;
    this.callbacks = callbacks;
    this.sessions = new Sessions();
  }

  private retrieveUserByIdentification(
    identificationType: string,
    identificationValue: string
  ): User | null {
    return null;
  }

  hello() {
    return new Response("Hello from Auth class handler!");
  }
}
