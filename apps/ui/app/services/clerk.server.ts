import { createClerkClient } from "@clerk/remix/api.server";

import { env } from "../config/environment.server";

export const clerkClient = createClerkClient({ secretKey: env.CLERK_SECRET_KEY });
