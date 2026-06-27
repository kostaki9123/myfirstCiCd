'use client'

import { useEffect, useState } from "react";
import { SignIn } from "@clerk/nextjs";
import MainLoader from "@/app/component/loaders/singUpandInloader";

export default function DelayedSignIn() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // simulate loading until Clerk is ready
    const timer = setTimeout(() => setReady(true), 800); // 0.8s delay
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return <MainLoader />;

  return (  
<SignIn
  appearance={{
    layout: {
      logoImageUrl: "/ChatGPT Image 10 Μαρ 2026, 04_35_50 μμ.png",
      logoPlacement: "inside",
    },
    variables: {
      colorBackground: "#1a1951",
    },
    elements: { 
      logoBox: "w-32 h-32 mx-auto",
      logoImage: "w-full h-full object-contain",
      rootBox: "bg-[#1a1951] w-full rounded-lg flex items-center justify-center",
      cardBox: "bg-[#1a1951] shadow-none",
      card: "shadow-none border-none bg-[#1a1951]",
      footer: "bg-[#1a1951]",
      main: "bg-[#1a1951]",
      headerTitle: "text-2xl font-semibold text-white", 
      headerSubtitle: "text-[#b4b4c0]",

      // Google button
      socialButtonsBlockButton: "bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-xl transition-all duration-200",
      socialButtonsBlockButtonText: "text-white font-medium",
      socialButtonsBlockButtonArrow: "text-white",
      dividerLine: "bg-white/20",
      dividerText: "text-[#b4b4c0] text-sm",

      // Form fields - matched to dark theme
      formFieldLabel: "text-[#b4b4c0] text-sm font-medium",
      formFieldInput: "bg-white/10 border border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-200",
      formFieldInputShowPasswordButton: "text-white/50 hover:text-white",

      // Sign in button
      formButtonPrimary: "bg-[#0356BC] hover:bg-[#0466D9] rounded-xl font-medium transition-all duration-200 active:scale-[0.98]",

      // Footer
      footerActionLink: "text-sky-400 hover:text-sky-300 font-medium",
      footerActionText: "text-[#b4b4c0]",

      // Error & helper text
      formFieldErrorText: "text-red-400 text-xs",
      formFieldHintText: "text-white/40 text-xs",

      // Identifier field (email row)
      identityPreviewText: "text-white",
      identityPreviewEditButton: "text-sky-400 hover:text-sky-300",
    }
  }} 
/>
   
  );
}

