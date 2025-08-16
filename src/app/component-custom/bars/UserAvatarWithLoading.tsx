'use client';

import React, { useState, useEffect } from 'react';
import { UserButton, useUser } from "@clerk/nextjs";

export default function UserAvatarWithLoading() {
  const { isLoaded } = useUser();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      // Small delay to avoid flicker
      const timer = setTimeout(() => setShowLoader(false), 150);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  if (showLoader) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse  " />
    );
  }

  return (
    <div className='  pt-[6px]'>
       <UserButton
         appearance={{
           elements: {
             userButtonAvatarBox: "w-10 h-10 ",
           },
         }}
       />
    </div>
  );
}
