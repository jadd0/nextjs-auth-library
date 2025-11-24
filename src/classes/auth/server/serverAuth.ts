import { authConfig } from "@/core/singleton";
import { ServerEmailPassword } from "./serverEmailPassword";

export class ServerAuth {
  providers: {
    emailPassword?: any;
    googgle?: any;
  } = {};
  
  constructor() {
    for (const provider of authConfig.providers) {
      if (provider === "emailPassword") {
        this.providers.emailPassword = new ServerEmailPassword();
      }
    }
  }

}
