

import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-emerald-50 z-50">
     <div className="relative flex items-center justify-center w-40 h-40">

        {/* outer glow ring */}
        <div className="absolute w-full h-full rounded-full border-4 border-blue-500/30"></div>

        {/* spinning ring */}
        <div className="absolute w-full h-full rounded-full border-4 border-transparent border-t-blue-400 border-r-blue-300 animate-spin"></div>

        {/* second spinning ring */}
        <div className="absolute w-28 h-28 rounded-full border-4 border-transparent border-b-green-400 border-l-green-300 animate-spin [animation-duration:1.6s]"></div>

        {/* center glow */}
        <div className="absolute w-20 h-20 rounded-full bg-blue-500/10 blur-xl"></div>

        {/* logo */}
        <Image
          src="/ChatGPT Image 10 Μαρ 2026, 04_35_50 μμ.png"
          alt="logo"
          width={140}
          height={140}
          className="relative z-10"
        />

      </div>

    </div>
  );
}