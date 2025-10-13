import { readFile } from "node:fs/promises";
import { findAuthFile } from "./findAuthFile";

/** Function used to read the contents of an authentication file */
export async function loadAuthFile(): Promise<{
  path: string;
  content: string;
} | null> {
  const abs = await findAuthFile();
  if (!abs) return null;

  const content = await readFile(abs, "utf-8");
  return { path: abs, content };
}
