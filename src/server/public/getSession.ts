"use server";

import { cookies } from "next/headers";
import type { Session } from "../index";

export async function getSession(): Promise<Session | null> {
  const c = cookies();
  const uid = c.get("uid")?.value;
  if (!uid) return null;
  return { userId: uid, roles: ["user"] };
}
