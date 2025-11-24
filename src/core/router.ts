import { NextResponse } from "next/server";
import { serverAuth } from "@/core/singleton";

/**
 * Core auth router used by all HTTP entrypoints.
 * Works with standard Web Request/Response.
 */
export async function routeAuthRequest(
  req: Request
): Promise<Response> {
  const url = new URL(req.url); 
  const method = req.method;

  const body = await req.json().catch(() => ({}));
  const path = url.pathname; // e.g. /api/auth/provider/emailPassword/login

  // Split, remove empty, `api`, and `auth`
  const segments = path
    .split("/")
    .filter((s) => s.length > 0 && s !== "api" && s !== "auth");

  // Handle different routes based on the path

  // segments[0] -> "provider"
  // segments[1] -> "emailPassword"
  // segments[2] -> "login"

  // Provider handler
  switch (segments[0]) {
    case "provider":
      switch (segments[1]) {
        case "emailPassword":
          // Handle email-password provider routes
          switch (segments[2]) {
            // Handle login route
            case "login":
              if (method === "POST") {
                // Call the server auth email-password login method
                const { user, session, cookie } =
                  await serverAuth.providers.emailPassword.login(
                    body.email,
                    body.password
                  );

                // Return response with session cookie set
                const res = NextResponse.json(
                  { message: "Login successful", user, session },
                  { status: 200 }
                );

                // Set session cookie for the user
                res.headers.set("Set-Cookie", cookie);
                return res;
              } else {
                // Method not allowed
                return NextResponse.json(
                  { message: "Method not allowed" },
                  { status: 405 }
                );
              }
            default:
              return NextResponse.json(
                { message: "Route not found" },
                { status: 404 }
              );
          }
        default:
          return NextResponse.json(
            { message: "Provider not found" },
            { status: 404 }
          );
      }

    default:
      return NextResponse.json({ message: "Route not found" }, { status: 404 });
  }
}
