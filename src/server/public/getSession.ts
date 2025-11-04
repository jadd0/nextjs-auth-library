"use server";

import { cookies } from "next/headers";
import { Session } from "@/classes/auth/server/session";
import { parseCookie, verifyJWT } from "@/utils";

/** Function used to read a JWT from a cookie, verify it and return a user Session or null */
export async function getSession(
  req: Request,
  options?: { cookieName: string; secret?: string }
): Promise<Session | null> {
  // Get cookie name and secret from options or environment
  const cookieName = options?.cookieName ?? "auth";
  const secret = options?.secret ?? process.env.AUTH_SECRET ?? "";

  // If no secret is provided, return null (cannot verify token)
  if (!secret) return null;

  // Read the cookies
  const cookieHeader = req.headers.get("cookie") || "";
  const token = parseCookie(cookieHeader)[cookieName];

  if (!token) return null;

  // Verify token
  const verified = await verifyJWT(token, secret);
  if (!verified.ok) return null;

  // Normalise payload into Session type
  const { payload } = verified;
  const userId =
    typeof payload?.sub === "string"
      ? payload.sub
      : typeof payload?.userId === "string"
        ? payload.userId
        : null;

  // If no userId found in payload, return null
  if (!userId) return null;

  // Ensure roles is an array of strings if present
  // TODO: ensure I want to use user roles, maybe remove in future
  const roles = Array.isArray(payload?.roles)
    ? payload.roles.filter((r) => typeof r === "string")
    : undefined;

  return null; //TODO: new Session(userId, roles); if no session etc
}
