import { NextRequest, NextResponse } from "next/server";
import { serverAuth } from "@/core/singleton";

/** Path handler for interal routing of requests. This alleviates the developer of having to handle auth routes with unnecessary boilerplate */
export default async function handler(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  const method = req.method;

  const body = await req.json().catch(() => ({}));
  const path = url.pathname;

  // This splits the path into segments and removes api and auth, because those are handled already
  const splitPath = path.split("/").filter((segment) => segment.length > 1);

  // Handle different routes based on the path

  // Provider handler
  switch (splitPath[0]) {
    case "provider":
      switch (splitPath[1]) {
        case "emailPassword":
          // Handle email-password provider routes
          switch (splitPath[2]) {
            // Handle login route
            case "login":
              if (method === "POST") {
                // Call the server auth email-password login method
                const { user, session, cookie } =
                  await serverAuth.providers.emailPassword.login(body.email, body.password);
                
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
