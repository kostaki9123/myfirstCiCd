import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignIn, SignInButton, UserButton } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "tripaki",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <ClerkProvider>
    <html lang="en">
      <body
      
      >
        <header className="border-2 border-lime-600 absolute top-0 left-0 right-0 h-16 flex justify-end px-4 ">
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton showName />
            </SignedIn>
        </header>
        {children}
        <Analytics />
      </body>
    </html>
  </ClerkProvider>
  );
}
