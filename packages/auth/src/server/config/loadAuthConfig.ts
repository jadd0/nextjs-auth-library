import { AuthConfigSchema } from "@/shared/validation";
import { findAuthFile } from "./findAuthFile";

/** Function to validate and impose logic for loading auth file */
export default async function loadAuthConfig() {
  const file = await findAuthFile();

  // Attempts to dynamically import the file if it exists
  const mod = file ? await import(file) : null;

  // No file found, throw an error
  if (!mod) {
    throw new Error(
      "No auth configuration file found. Please create an auth.js or auth.ts file in your project root."
    );
  }

  // Support both `export default` and `export const auth = ...`
  const raw = mod.default ?? mod.auth ?? mod;

  // No export found in the file, throw an error
  if (!raw || typeof raw !== "object") {
    throw new Error(
      "No auth configuration found. Please export a configuration object from your auth file."
    );
  }

  // Validate config using Zod schema
  const parsed = AuthConfigSchema.safeParse(raw);

  // If validation fails, throw an error with details
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `- ${issue.message} (at ${issue.path.join(".")})`)
      .join("\n");
    throw new Error(
      `Invalid auth configuration:\n${issues}\nPlease refer to the documentation for the correct configuration format.`
    );
  }

  return parsed.data;
}
