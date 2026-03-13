'use client'

import { useEffect, useState } from "react";
import { SignUp } from "@clerk/nextjs";
import MainLoader from "@/app/component/loaders/singUpandInloader";

export default function DelayedSignUp() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // simulate loading until Clerk is ready
    const timer = setTimeout(() => setReady(true), 300); // 0.8s delay
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return <MainLoader />;

  return (
     <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl md:p-6 border border-slate-200">
           
    <SignUp
               appearance={{
                 elements: {
                   card: "shadow-none border-none",
                   headerTitle: "text-2xl font-semibold text-slate-800",
                   headerSubtitle: "text-slate-500",
                   formButtonPrimary:
                     "bg-sky-600 hover:bg-sky-700 text-white font-medium transition-all duration-200 rounded-lg",
                   footerActionLink:
                     "text-sky-600 hover:text-sky-700 font-medium",
                   formFieldInput:
                     "rounded-lg border-slate-300 focus:border-sky-500 focus:ring-sky-500",
                 },
               }}
             />
         </div>       
  );
}