'use client';

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
   <html>
      <body>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-transparent text-white px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              500 – Internal Server Error
            </h1>
      
            <p className="text-lg md:text-xl font-medium max-w-xl">
              Something went wrong on our end.
            </p>
      
            <p className="text-md md:text-lg font-normal max-w-xl text-white/80">
              Our developers have been notified and are working to fix the issue.
            </p>
      
            <p className="text-md md:text-lg font-normal max-w-xl text-white/70">
              We appreciate your patience. Please try again later.
            </p>
      
            <Button className="bg-black hover:bg-white hover:text-black transition-colors">
              Try Again
            </Button>
          </div>
      </body>
    </html>
  );
}
