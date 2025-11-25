import { NextResponse } from "next/server";
import { routeProviderRequest } from "./providers";

/** Used to handle the first segment route */
export async function routeMainAuthRequest(
  segments: string[],
  method: string,
  body: any
): Promise<Response> {
  // Provider handler
  switch (segments[0]) {
    case "provider":
      return await routeProviderRequest(segments, method, body);

    default:
      return NextResponse.json({ message: "Route not found" }, { status: 404 });
  }
}
