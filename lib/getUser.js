import { db } from "./prisma";

/**
 * Looks up the internal DB user record by Clerk userId.
 * Use this shared helper in server actions to avoid redundant
 * user.findUnique calls on every request.
 */
export async function getUserByClerkId(clerkUserId) {
  return db.user.findUnique({
    where: { clerkUserId },
  });
}
