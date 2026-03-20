"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#010038] text-white z-50 px-4">
      
      <div className="max-w-md w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-500/20 p-3 rounded-full">
            <AlertTriangle className="text-red-400 w-6 h-6" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">
          Something went wrong
        </h2>

        {/* Optional debug (only in dev) */}
        {process.env.NODE_ENV === "development" && (
          <p className="text-xs text-red-300 mb-4 break-words">
            {error.message}
          </p>
        )}
  
      </div>
    </div>
  );
}