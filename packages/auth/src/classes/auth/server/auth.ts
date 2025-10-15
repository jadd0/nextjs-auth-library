import { Session } from "./session";

/**
 * Main server-side Auth class
 * @class Auth
 * @description This class serves as the main entry point for authentication functionalities.
 * 
 * @
 */
export class Auth {
  session: Session;
  providers: any[];
  callbacks: any;

  constructor() {}
}