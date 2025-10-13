import constants from "node:constants";
import path from "node:path";
import { access } from "node:fs/promises";

// Possible locations for the auth file
const candidates = [
  "auth.ts",
  "auth.js",
  "src/auth.ts",
  "src/auth.js",
  "app/auth.ts",
  "app/auth.js",
  "lib/auth.ts",
  "lib/auth.js",
];

/** Function used to find a file relating to the beginning of implementation of the auth library */
export async function findAuthFile(): Promise<string | null> {
  const cwd = process.cwd();

  // Check each candidate to see if it exists and is readable
  for (const candidate of candidates) {
    const abs = path.join(cwd, candidate);
    try {
      await access(abs, constants.R_OK);
      return abs;
    } catch {
      // Ignore
    }
  }

  return null;
}
