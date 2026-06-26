  import Image from "next/image";
  import { FaPlane } from "react-icons/fa";

  const HeroSection = () => {
    return (
      <section
        id="hero"
        className="relative min-h-[85vh] overflow-hidden bg-transparent px-6 py-24 text-white sm:py-32"
      >
        <div className="absolute left-1/2 top-20 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[130px]" />

        <div className="pointer-events-none absolute inset-0 z-0 opacity-35">
          <svg viewBox="0 0 1200 700" className="h-full w-full">
            <path
              d="M80 460 C280 220, 500 560, 720 320 S980 150, 1120 280"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="10 12"
            />
          </svg>
        </div>

       

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
          {/* Left */}
          <div className="text-center">
            <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-md">
              Helping you plan with confidence.
            </div>

            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
                   Build your trip, your way.
             </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70">
             Add the places you want, organize them to avoid wasting time, and see your whole trip in one clean scroll.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3">
              <a
                href="/sign-in"
                className="rounded-xl border border-white/10 bg-[#0356BC] px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:scale-105 hover:bg-[#0466D9] active:scale-[0.98]"
              >
                Get Started 
              </a>

           <p className="flex items-center justify-center gap-2 text-sm text-white/55">
               <span className="text-emerald-400">✓</span>
               Completely free
             </p>
            </div>
          </div>

          {/* Right screenshot */}
         <div className="relative mx-auto w-full max-w-[300px]">

  {/* Glow */}
  <div className="absolute inset-0 rounded-[48px] bg-blue-500/25 blur-3xl" />

  {/* Screenshot */}
  <div className="relative mx-auto w-[258px] pt-[14px]">
    <Image
      src="/mock phone_.png"
      alt="Tripaki home page"
      width={500}
      height={1100}
      priority
      className="w-full rounded-[28px]"
    />

    {/* Phone Frame */}
    
    
  </div>

 

</div>
        </div>
      </section>
    );
  };

  export default HeroSection;