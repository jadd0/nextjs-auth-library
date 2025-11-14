import z from "zod";
import { AuthConfigSchema, DatabasePoolConfigSchema } from "../validation";

/** Auth config type used for validation */
export type AuthConfig = z.infer<typeof AuthConfigSchema>;

/** Database Pool type */
export type DatabasePoolConfig = z.infer<typeof DatabasePoolConfigSchema>;
