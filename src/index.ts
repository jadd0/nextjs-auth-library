export * from "./server/index.js";
import { AuthConfig } from "./shared/types/config.types.js";

/** Used in a user's "auth.ts" or corresponding file to assist them with authentication setup */
export type { AuthConfig };

/** Main entry point to library */
export { default as AuthKit } from "./server/public/authkit.js";
