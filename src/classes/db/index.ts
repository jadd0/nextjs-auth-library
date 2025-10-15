import { DatabaseAccountInteractions } from "./databaseAccountInteractions";
import { DatabaseSessionInteractions } from "./databaseSessionInteractions";
import { DatabaseUserInteractions } from "./databaseUserInteractions";

/** General class to instantiate database classes */
export class DatabaseInteractions {
  account: DatabaseAccountInteractions;
  session: DatabaseSessionInteractions;
  user: DatabaseUserInteractions;

  constructor() {
    this.account = new DatabaseAccountInteractions();
    this.session = new DatabaseSessionInteractions();
    this.user = new DatabaseUserInteractions();
  }
}