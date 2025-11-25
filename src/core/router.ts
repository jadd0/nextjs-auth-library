import { NextResponse } from "next/server";
import { serverAuth } from "@/core/singleton";

/**
 * Core auth router used by all HTTP entrypoints.
 * Works with standard Web Request/Response.
 */
export async function routeAuthRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const method = req.method;

  const body = await req.json().catch(() => ({}));
  const path = url.pathname; // e.g. /api/auth/provider/emailPassword/login

  // Split, remove empty, `api`, and `auth`
  const segments = path
    .split("/")
    .filter((s) => s.length > 0 && s !== "api" && s !== "auth");

  console.log("HELLO FROM ROUTE HANDLER", segments);

  // Handle different routes based on the path

  // segments[0] -> "provider"
  // segments[1] -> "emailPassword"
  // segments[2] -> "login"

  // Provider handler
  switch (segments[0]) {
    case "provider":
      switch (segments[1]) {
        case "emailPassword":
          // Ensure the email-password provider is configured
          if (!serverAuth.providers.emailPassword) {
            throw new Error("Email/password provider not configured");
          }

          // TODO: improve error handling and responses
          // Handle email-password provider routes
          switch (segments[2]) {
            // START: LOGIN

            // Handle login route
            case "login":
              if (method === "POST") {
                // Call the server auth email-password login method
                let result;
                try {
                  result = await serverAuth.providers.emailPassword.login(
                    body.email,
                    body.password
                  );
                } catch (err) {
                  return NextResponse.json(
                    { message: "Invalid email or password" },
                    { status: 401 }
                  );
                }

                // Return response with session cookie set
                const res = NextResponse.json(
                  {
                    message: "Login successful",
                    user: result.user,
                    session: result.session,
                  },
                  { status: 200 }
                );

                // Set session cookie for the user
                res.headers.set("Set-Cookie", result.cookie);
                return res;
              } else {
                // Method not allowed
                return NextResponse.json(
                  { message: "Method not allowed" },
                  { status: 405 }
                );
              }

            // END

            // START: REGISTER

            // Handle register route
            case "register":
              if (method === "POST") {
                // Call the server auth email-password register method
                let result;
                try {
                  result = await serverAuth.providers.emailPassword.register(
                    body.email,
                    body.password
                  );
                } catch (err) {
                  return NextResponse.json(
                    { message: "An issue occured whilst trying to register the user. Ensure all datafields are as expected." },
                    { status: 401 }
                  );
                }

                // Return response with session cookie set
                const res = NextResponse.json(
                  {
                    message: "Registration successful",
                    user: result.user,
                    session: result.session,
                  },
                  { status: 200 }
                );

                // Set session cookie for the user
                res.headers.set("Set-Cookie", result.cookie);
                return res;
              } else {
                // Method not allowed
                return NextResponse.json(
                  { message: "Method not allowed" },
                  { status: 405 }
                );
              }

            // END
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
