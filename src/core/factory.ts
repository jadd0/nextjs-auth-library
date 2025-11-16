import type { AuthConfig } from "@/index";
import { db, getAuthInstance } from "./singleton";

// Web API Request/Response are standard in Next route handlers
type WebHandler = (req: Request) => Promise<Response> | Response;

// The public factory that developers call in src/auth.ts
export default function AuthKit(config: AuthConfig) {
  // Ensure the instance is created lazily and reused
  let ready: ReturnType<typeof getAuthInstance> | null = null;
  const ensure = () => (ready ??= getAuthInstance(config));

  // TODO: implement proper factory methods

  const GET: WebHandler = async (req) => {
    const auth = await ensure();
    // Delegate: authorisation endpoint handler (e.g., /api/auth/authorize)
    console.log("GET handler called");
    return auth.hello();
    // return auth.handleAuthorise(req);
  };

  const POST: WebHandler = async (req) => {
    const auth = await ensure();
    // Delegate: callback/token exchange endpoint handler
    console.log("GET handler called");

    return auth.hello();
  };

  // Usable in middleware (Edge/Node) and in server components/actions
  const auth = async (req?: Request) => {
    const auth = await ensure();
    return auth.hello();
  };

  const signIn = async (providerId: string, options?: unknown) => {
    const auth = await ensure();
    return auth.hello();
  };

  const signOut = async (options?: unknown) => {
    const auth = await ensure();
    return auth.hello();
  };

  return {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    db
  };
}
