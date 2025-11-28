import { serverSession } from "@/core/singleton"

/** Type representing the session returned by getSession */
export type GetSessionType = Awaited<ReturnType<typeof serverSession.getSession>>;