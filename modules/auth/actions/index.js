"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function onboardUser() {
  const authUser = await currentUser();

  if (!authUser) {
    return { success: false, skipped: true };
  }

  const primaryEmail = authUser.emailAddresses?.find(
    (email) => email?.id === authUser.primaryEmailAddressId,
  )?.emailAddress;

  if (
    !primaryEmail ||
    typeof primaryEmail !== "string" ||
    primaryEmail.trim() === ""
  ) {
    return { success: false, error: "No valid email address found" };
  }

  const cleanEmail = primaryEmail.trim();

  try {
    return await prisma.user.upsert({
      where: { clerkId: authUser.id },
      update: {
        firstName: authUser.firstName ?? null,
        lastName: authUser.lastName ?? null,
        imageUrl: authUser.imageUrl ?? null,
        email: cleanEmail,
      },
      create: {
        clerkId: authUser.id,
        email: cleanEmail,
        firstName: authUser.firstName ?? null,
        lastName: authUser.lastName ?? null,
        imageUrl: authUser.imageUrl ?? null,
      },
    });
  } catch (error) {
    console.error("Database error during user upsert:", error);
    return { success: false, error: "Database operation failed" };
  }
}

export async function getUserRole() {
  try {
    const user = await requireDbUser();
    return { success: true, role: user.role };
  } catch (error) {
    console.error("Error fetching user role:", error);
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
