"use server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function onboardUser() {
  try {
    const user = await currentUser();

    if (!user) {
      return { success: false, error: "No authenticated user found!" };
    }

    const { id, firstName, lastName, imageUrl, emailAddresses } = user;
    const primaryEmail = emailAddresses?.[0]?.emailAddress || "";

    const newUser = await prisma.user.upsert({
      where: { clerkId: id },
      update: {
        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        email: primaryEmail,
      },
      create: {
        clerkId: id,
        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        email: primaryEmail,
      },
    });

    return { success: true, user: newUser, message: "user onboard successful" };
  } catch (error) {
    console.error("Error onboarding user:", error);
    return { success: false, message: "failed to onboard user" };
  }
}
