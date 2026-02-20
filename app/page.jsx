import { UserButton } from "@clerk/nextjs";
import { onboardUser } from "@/modules/auth/actions";

export default async function Home() {
  await onboardUser();
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full ">
      <UserButton />
    </div>
  );
}
