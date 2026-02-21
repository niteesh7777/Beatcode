import React from "react";
import Navbar from "@/components/navbar";
import { getUserRole } from "@/modules/auth/actions";

const RootLayout = async ({ children }) => {
  const roleResult = await getUserRole();
  const role = roleResult?.success ? roleResult.role : null;
  return (
    <main className="w-full min-h-screen">
      <Navbar userRole={role} />
      <div className="absolute inset-0 -z-40 h-full w-full bg-background dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)] dark:bg-size-[16px_16px] bg-[radial-gradient(#dadde2_1px,transparent_1px)] bg-size-[16px_16px]"></div>
      <div className="pt-24">{children}</div>
    </main>
  );
};

export default RootLayout;
