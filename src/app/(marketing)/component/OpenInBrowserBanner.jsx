'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { GoArrowRight } from "react-icons/go";


const OpenInBrowserBanner = () => {
  const [isInAppBrowser, setIsInAppBrowser] = useState(true)

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
   <div className="fixed top-0 left-0 right-0 z-[999] bg-[#010038] text-white text-sm px-5 py-4 flex items-center justify-between shadow-lg">
  {/* Logo on the left */}
  <div className="flex items-center gap-2 shrink-0 ">
              <Link
                   href="/"
                   className="relative w-[150px] md:ml-5 flex justify-center items-center "
                 >
                   <Image
                     src="/ChatGPT Image 10 Μαρ 2026, 04_35_50 μμ.png"
                     alt="Trip Planner Logo"
                     width={90}
                     height={90}
                     className="object-contain mt-2 absolute left-0 md:left-3"
                   />
                 
                   <h3 className="mt-1 text-xl font-semibold tracking-tight text-white absolute left-16 md:left-20">
                     Tripaki
                   </h3>
                </Link>
  </div>

  {/* Message on the right */}
        <div className="  flex items-center justify-end gap-2  bg-yellow-500/10  w-[300px]  py-3">
        <GoArrowRight className=' text-2xl' />
            <span className="text-base">🌐</span>
            <p className="text-[11px] leading-tight text-center  font-medium">
            Tap <strong>···</strong> then <strong>"Open in browser"</strong>
            </p>
        </div>

</div>
  )
}

export default OpenInBrowserBanner