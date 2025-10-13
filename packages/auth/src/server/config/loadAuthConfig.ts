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
  if (!raw) {
    throw new Error(
      "No auth configuration found. Please export a configuration object from your auth file."
    );
  }

}
