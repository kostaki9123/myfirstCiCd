  import type { Metadata } from "next";
  import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
  import { ClerkProvider } from "@clerk/nextjs";
  import Navbar from "./component-custom/bars/navbar";
 
 
  export const metadata : Metadata = {
  title: "Tripaki - Your Personal Trip Planner",
  description: "Tripaki is a trip planning app that helps you organize your journeys. Create destinations, connect them with transportation, build your itinerary with places to stay and visit, and manage your travel budget in one place.",
  openGraph: {
    title: "Tripaki - Your Personal Trip Planner",
    description: "Tripaki is a trip planning app that helps you organize your journeys. Create destinations, connect them with transportation, build your itinerary with places to stay and visit, and manage your travel budget in one place.",
     url: "https://yourdomain.com",
    siteName: "Tripaki",
    images: [
      {
        url: "/Tripaki-logo-transparent.png",
        width: 1200,
        height: 630 ,
      },
    ],
    locale: "en_US",
    type: 'website',
  },
 
}


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
      <html lang="en" className="bg-[#010038]">
        <body
        className="bg-[#010038]  "
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
