"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function onboardUser() {
  try {
    const authUser = await currentUser();
    if (!authUser) {
      return { success: false, skipped: true, reason: "UNAUTHENTICATED" };
    }

    const primaryEmail =
      authUser.emailAddresses.find(
        (email) => email.id === authUser.primaryEmailAddressId,
      )?.emailAddress || "";

    const user = await prisma.user.upsert({
      where: { clerkId: authUser.id },
      update: {
        firstName: authUser.firstName || null,
        lastName: authUser.lastName || null,
        imageUrl: authUser.imageUrl || null,
        email: primaryEmail,
      },
      create: {
        clerkId: authUser.id,
        firstName: authUser.firstName || null,
        lastName: authUser.lastName || null,
        imageUrl: authUser.imageUrl || null,
        email: primaryEmail,
      },
    });

    return { success: true, user };
  } catch (error) {
    console.error("Onboarding error:", error);
    return { success: false, error: "Failed to onboard user" };
  }
}

export async function getUserRole() {
  try {
    const user = await requireDbUser();
    return { success: true, role: user.role };
  } catch {
    return { success: false, error: "Failed to fetch role" };
  }
}

async function requireDbUser() {
  const authUser = await currentUser();
  if (!authUser) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { clerkId: authUser.id },
  });

  if (!user) throw new Error("User not found");

  return user;
}
