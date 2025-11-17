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

    // This gives the developer the option to how long they wish the sessions for datbabase persistant storage to last for
    z
      .object({
        idleTTL: z.int().optional(),
        absoluteTTL: z.int().optional(),
      })
      .default({ idleTTL: 900, absoluteTTL: 32400 }), // idleTTL = 15 mins, absoluteTTL = 9 hours
  ],

  /** Either a database pool, or a database URL */
  db: z.union([z.string().url(), DatabasePoolConfigSchema]),
  providers: z.array(z.any()).default([]), // TODO: refine this with proper type
  callbacks: CallbacksSchema,
});
