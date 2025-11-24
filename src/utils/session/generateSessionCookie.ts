import { authConfig } from "@/core/singleton";

/**
 * Generates cookie options for a secure, HttpOnly session cookie
 */
export function generateSessionCookie(
  name: string,
  value: string,
  maxAgeSeconds: number,
  secure = true
) {
  return {
    name,
    value,
    httpOnly: true, // Not accessible via JS
    secure, // Only send over HTTPS
    sameSite: authConfig.sameSite, // CSRF protection
    path: "/", // Send to all app routes
    maxAge: maxAgeSeconds, // TTL in seconds
  };
}
