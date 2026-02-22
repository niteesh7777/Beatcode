import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { UserRole } from "@prisma/client";

const Navbar = ({ userRole }) => {
  return (
    <nav className="fixed left-1/2 top-2 z-50 w-full max-w-5xl -translate-x-1/2 px-2 sm:top-4 sm:px-4">
      <div className="rounded-xl border border-gray-400/20 bg-white/10 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-200 hover:bg-white/15 sm:rounded-2xl dark:border-white/10 dark:bg-black/10 dark:shadow-black/20 dark:hover:bg-black/15">
        <div className="pointer-events-none absolute inset-0 " />

        <div className="flex items-center justify-between px-3 py-3 sm:px-6 sm:py-4">
          <Link href={"/"} className="flex min-w-0 items-center gap-2">
            <Image
              src={"/beatcode-logo.png"}
              alt="beatcode logo"
              width={36}
              height={36}
              className="h-8 w-8 rounded-md dark:bg-gray-100 sm:h-9 sm:w-9"
            />
            <h1 className="truncate text-lg font-bold text-amber-500 dark:text-amber-400 sm:text-xl">
              Beat
              <span className="text-foreground ml-1">Code</span>
            </h1>
          </Link>

          <div className="hidden md:flex items-center justify-center gap-x-5">
            <Link
              href="/problems"
              className="text-sm font-medium text-zinc-700 transition-colors hover:text-amber-600 dark:text-zinc-300 dark:hover:text-amber-400"
            >
              Problems
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-zinc-700 transition-colors hover:text-amber-600 dark:text-zinc-300 dark:hover:text-amber-400"
            >
              About
            </Link>
            <Link
              href="/profile"
              className="text-sm font-medium text-zinc-700 transition-colors hover:text-amber-600 dark:text-zinc-300 dark:hover:text-amber-400"
            >
              Profile
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <ModeToggle />
            <SignedIn>
              {userRole && userRole === UserRole.ADMIN && (
                <Link href={"/create-problem"}>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className="border-gray-400/20 bg-white/35 px-2 backdrop-blur-sm hover:bg-white/65 sm:px-3 dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/15"
                  >
                    <span className="sm:hidden">Create</span>
                    <span className="hidden sm:inline">Create Problem</span>
                  </Button>
                </Link>
              )}
              <UserButton />
            </SignedIn>

            <SignedOut>
              <div className="flex items-center gap-2">
                <SignInButton>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden text-sm font-medium hover:bg-white/35 sm:inline-flex dark:hover:bg-white/10"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    size="sm"
                    className="bg-amber-500 px-3 text-sm font-medium text-white hover:bg-amber-600 sm:px-4"
                  >
                    <span className="sm:hidden">Join</span>
                    <span className="hidden sm:inline">Sign Up</span>
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
