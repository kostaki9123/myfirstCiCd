'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { GoArrowRight } from "react-icons/go";


const OpenInBrowserBanner = () => {
  const [isInAppBrowser, setIsInAppBrowser] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent || ''
    const isInstagram = ua.includes('Instagram')
    const isFacebook = ua.includes('FBAN') || ua.includes('FBAV')
    const isTikTok = ua.includes('musical_ly') || ua.includes('TikTok')

    if (isInstagram || isFacebook || isTikTok) {
      setIsInAppBrowser(true)
    }
  }, [])

  if (!isInAppBrowser) return null

  return (
   <div className="fixed top-0 left-0 right-0 z-[9999] max-h-14
   border-white/10 bg-gradient-to-r from-[#0B1F6A] via-[#1747A6] to-[#0B1F6A] backdrop-blur-xl text-white text-sm px-5 py-4 flex items-center justify-between shadow-lg">
  {/* Logo on the left */}
 {/* Logo */}
 
<div className="flex items-center  gap-2 shrink-0">
  <Link
    href="/"
    className="relative w-[180px] md:ml-5 flex items-center "
  >
    
    <Image
      src="/ChatGPT Image 10 Μαρ 2026, 04_35_50 μμ.png"
      alt="Trip Planner Logo"
      width={90}
      height={90}
      className="object-contain mt-2 absolute left-0 md:left-3"
    />

    <div className="absolute left-16 md:left-20">
      <h3 className="text-xl font-semibold tracking-tight text-white">
        Tripaki
      </h3>

     
    </div>
  </Link>
</div>  

  {/* Message on the right */}
        <div className="  flex items-center   justify-end gap-2  w-[300px]  py-3 ">
        <GoArrowRight className=' text-2xl' />
        
            <p className="text-[11px] leading-tight text-center  font-medium">
             Tap  <span className="rounded-md px-2 py-1 font-bold">
                  •••
                </span>
             then <strong>"Open in browser"</strong>
            </p>
        </div>

</div>
  )
}

export default OpenInBrowserBanner