import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./component-custom/bars/navbar";
 
export const metadata: Metadata = {
  title: "Tripaki - Your Personal Trip Planner",
  description: "Tripaki is a trip planning app that helps you organize your journeys.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "48x48" },
    ],
    apple: "/apple-touch-icon.png",
  },
};


  export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)
  {
      
    return (
    <ClerkProvider 
    signInUrl="/sign-in"
    signUpUrl="/sign-up"
    >
      <html lang="en" translate="no" className="bg-[#010038]">
        <body
        className="bg-[#010038] "
          id="datepicker-portal"
        >       
          <Navbar withtripname={false} withoutHumburger={true}/>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
    );
  }
