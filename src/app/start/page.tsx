// app/app/page.tsx

import Image from "next/image";
import Link from "next/link";
import { Globe, Apple, Smartphone, ArrowRight } from "lucide-react";

export default function AppLinksPage() {
  return (
    <main className="min-h-screen bg-[#010038] text-white px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-md text-center">
        <Image
          src="/ChatGPT Image 10 Μαρ 2026, 04_35_50 μμ.png"
          alt="Tripaki logo"
          width={90}
          height={90}
          className="mx-auto mb-5 rounded-3xl"
          priority
        />

        <h1 className="text-4xl font-extrabold mb-3">
          Tripaki<span className="text-blue-400">.travel</span>
        </h1>

        <p className="text-white/70 mb-8">
          Plan your trips, routes, itinerary and budget — all in one place.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="flex items-center justify-between rounded-2xl bg-blue-500 px-5 py-4 font-bold hover:bg-blue-400 transition"
          >
            <span className="flex items-center gap-3">
              <Globe />
              Open in Browser
            </span>
            <ArrowRight />
          </Link>

          <button
            disabled
            className="w-full flex items-center justify-between rounded-2xl bg-white/10 px-5 py-4 text-white/45 border border-white/10"
          >
            <span className="flex items-center gap-3">
              <Apple />
              Download on iOS
            </span>
            <span className="text-xs">Coming soon</span>
          </button>

          <button
            disabled
            className="w-full flex items-center justify-between rounded-2xl bg-white/10 px-5 py-4 text-white/45 border border-white/10"
          >
            <span className="flex items-center gap-3">
              <Smartphone />
              Get it on Android
            </span>
            <span className="text-xs">Coming soon</span>
          </button>
        </div>

        <p className="mt-8 text-sm text-white/40">
          Your journey, perfectly planned.
        </p>
      </div>
    </main>
  );
}