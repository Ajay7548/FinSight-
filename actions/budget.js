"use server";

import { db } from "@/lib/prisma";
import { getUserByClerkId } from "@/lib/getUser";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getCurrentBudget(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await getUserByClerkId(userId);
    if (!user) throw new Error("User not found");

    // Run budget fetch and expense aggregation in parallel
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const [budget, expenses] = await Promise.all([
      db.budget.findFirst({ where: { userId: user.id } }),
      db.transaction.aggregate({
        where: {
          userId: user.id,
          type: "EXPENSE",
          date: { gte: startOfMonth, lte: endOfMonth },
          accountId,
        },
        _sum: { amount: true },
      }),
    ]);

    return {
      budget: budget ? { ...budget, amount: budget.amount.toNumber() } : null,
      currentExpenses: expenses._sum.amount ? expenses._sum.amount.toNumber() : 0,
    };
  } catch (error) {
    console.error("Error fetching budget:", error);
    throw error;
  }
}

export async function updateBudget(amount) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await getUserByClerkId(userId);
    if (!user) throw new Error("User not found");

    const budget = await db.budget.upsert({
      where: { userId: user.id },
      update: { amount },
      create: { userId: user.id, amount },
    });

    revalidatePath("/dashboard");
    return {
      success: true,
      data: { ...budget, amount: budget.amount.toNumber() },
    };
  } catch (error) {
    console.error("Error updating budget:", error);
    return { success: false, error: error.message };
  }
}
