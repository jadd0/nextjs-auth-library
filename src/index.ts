export * from "./server/index.js";
import { AuthConfig } from "./shared/types/config.types.js";

/** Used in a user's "auth.ts" or corresponding file to assist them with authentication setup */
export type { AuthConfig };
export { default as getAuthConfig } from "./server/internal/getAuthConfig";
