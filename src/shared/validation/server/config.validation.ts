import { z } from "zod";

/** Runtime validation: is a function */
const IsFunction = z.custom<Function>((v) => typeof v === "function", {
  message: "Expected a function",
});

/** Callbacks schema using function check */
const CallbacksSchema = z
  .object({
    authorise: IsFunction.optional(),
  })
  .default({});

/** Schema to validate database as a pool (alternate as URL defined inside AuthConfigSchema) */
export const DatabasePoolConfigSchema = z.object({
  user: z.string(),
  host: z.string(),
  password: z.string(),
  database: z.string(),
  port: z.number(),
});

/** Full config schema */
export const AuthConfigSchema = z.object({
  options: [
    z
      .object({
        strategy: z.enum(["jwt", "database"]),
      })
      .default({ strategy: "database" }),
  ],

  /** Either a database pool, or a database URL */
  db: z.union([z.string().url(), DatabasePoolConfigSchema]),

  providers: z.array(z.any()).default([]), // TODO: refine this with proper type
  callbacks: CallbacksSchema,

  // This gives the developer the option to how long they wish the sessions for datbabase persistant storage session to last for
  idleTTL: z.number().nullable(),
  absoluteTTL: z.number().nullable(), // TODO: make so if have one must have other 
});
