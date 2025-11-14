import z from "zod";
import { AuthConfigSchema } from "../validation";

/** Auth config type used for validation */
export type AuthConfig = z.infer<typeof AuthConfigSchema>;
