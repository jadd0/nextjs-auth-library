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

/** Full config schema */
export const AuthConfigSchema = z.object({
  options: z
    .object({
      strategy: z.enum(["jwt", "database"]),
    })
    .default({ strategy: "database" }),
  databasePool: z.any().optional(), // TODO: refine this with proper type
  databaseURL: z.any().optional(), // TODO: refine this with proper type
  providers: z.array(z.any()).default([]),
  callbacks: CallbacksSchema,
});

// Export the TS type

/** Auth config type used for validation */
export type AuthConfig = z.infer<typeof AuthConfigSchema>;
