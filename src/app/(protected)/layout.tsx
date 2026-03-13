import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { signIn } from "./action";
import ClientProtected from "./compoents/ClientProtected";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const { userId, sessionId } = await auth();

  // 🚨 Redirect early if not signed in
    
  if (!userId) {
    redirect("/sign-in");
  }

  try {
    const user = await currentUser();
   
    if (!user) {
      throw new Error("User not found");
    }

    const email = user.emailAddresses[0]?.emailAddress ?? "";
    const username = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

    await signIn(user.id, email, username);
  } catch (err) {
    // 🛡 Revoke session only if there's a session and an error
    if (sessionId) {
      try {
        const clerkclient = await clerkClient();
        clerkclient.sessions.revokeSession(sessionId);
      } catch (revokeError) {
        console.error("Failed to revoke session:", revokeError);
      }
    }

    console.error("Onboarding failed:", err);
    throw new Error(`Oops, something went wrong: ${(err as Error).message}`);
  }

  return <ClientProtected>{children}</ClientProtected>;
}
