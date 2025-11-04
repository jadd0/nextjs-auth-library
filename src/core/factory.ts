import type { AuthConfig } from "@/index";
import { getAuthInstance } from "./singleton";

// Web API Request/Response are standard in Next route handlers
type WebHandler = (req: Request) => Promise<Response> | Response;

// The public factory that developers call in src/auth.ts
export default function AuthKit(config: AuthConfig) {
  // Ensure the instance is created lazily and reused
  let ready: Promise<ReturnType<typeof getAuthInstance>> | null = null;
  const ensure = () => (ready ??= getAuthInstance(config));

  // TODO: implement proper factory methods

  const GET: WebHandler = async (req) => {
    const auth = await ensure();
    // Delegate: authorisation endpoint handler (e.g., /api/auth/authorize)
    return auth.handleAuthorise(req);
  };

  const POST: WebHandler = async (req) => {
    const auth = await ensure();
    // Delegate: callback/token exchange endpoint handler
    return auth.handleCallback(req);
  };

  // Usable in middleware (Edge/Node) and in server components/actions
  const auth = async (req?: Request) => {
    const auth = await ensure();
    return auth.getSession(req);
  };

  const signIn = async (providerId: string, options?: unknown) => {
    const auth = await ensure();
    return auth.startSignIn(providerId, options);
  };

  const signOut = async (options?: unknown) => {
    const auth = await ensure();
    return auth.signOut(options);
  };

  return {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
  };
}
