import { Session } from "./session";
import { User } from "./user";
import { PROVIDERS } from "@/shared/constants";
/**
 * Main server-side Auth class
 * @class Auth
 * @description This class serves as the main entry point for authentication functionalities.
 *
 * @
 */
export class Auth {
  session: Session;
  providers: (typeof PROVIDERS)[];
  callbacks: any;

  constructor(providers: any[], callbacks: any) {
    this.providers = providers;
    this.callbacks = callbacks;
  }

  private retrieveUserByIdentification(identificationType: string, identificationValue: string): User | null {
    return null
  }

  createSession(providerType: (typeof PROVIDERS)[number], user: User) {
    this.session = new Session(user);
  }
}
