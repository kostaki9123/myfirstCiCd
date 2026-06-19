'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { CiHome } from 'react-icons/ci'
import { GrSchedule } from 'react-icons/gr'
import { IoMdCreate } from 'react-icons/io'
import { LuWallet } from 'react-icons/lu'
import { LucideMapPinned } from 'lucide-react'

const Navbarphone = () => {
  const pathname = usePathname()
  const id = pathname.split('/').pop()

  const navItems = [
    { href: `/home/${id}`, icon: <CiHome />, label: 'Home' },
    { href: `/plan/${id}`, icon: <IoMdCreate />, label: 'Plan' },
    { href: '/', icon: <LucideMapPinned size={24} />, label: 'Map', isCenter: true },
    { href: `/itinerary/${id}`, icon: <GrSchedule />, label: 'Itinerary' },
    { href: `/budget/${id}`, icon: <LuWallet />, label: 'Budget' },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full px-3 pb-3 535:hidden">
      <div className="relative flex h-16 items-center justify-around rounded-3xl border border-white/10 bg-[#07114f]/95 shadow-2xl backdrop-blur-md">
        {navItems.map((item) => {
          const isActive = item.isCenter
            ? pathname === '/'
            : pathname === item.href

          if (item.isCenter) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="relative flex flex-1 justify-center"
              >
                <div className="absolute w-16 -top-8 flex flex-col items-center">
                           
                </div>
              </Link>
            )
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-1 items-center justify-center"
            >
              <div
                className={`
                  flex flex-col items-center justify-center gap-1
                  rounded-xl px-3 py-2 transition-all duration-200
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/10 to-emerald-500/10 text-emerald-400'
                      : 'text-white/60 hover:text-white'
                  }
                `}
              >
                <span className="text-[22px]">{item.icon}</span>
                <span className="text-[10px] font-medium leading-none">
                  {item.label}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Navbarphone