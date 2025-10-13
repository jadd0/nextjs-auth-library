// TODO: type properly
/** Authorisation type to validate user and return defined data about them */
export type Authorise = (
  // A context object to be passed in (eg: requst, env...)
  ctx: unknown,
  // User supplied credentials (eg: form data)
  credentials: unknown
) => Promise<{ userId: string } | null>; // TODO: change in future to allow more user data
