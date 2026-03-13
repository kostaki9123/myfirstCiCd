import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center border-2 border-lime-500 bg-[#010038] z-50">
      
      <div className="relative w-24 aspect-square grid place-items-center animate-[spin_1.4s_linear_infinite]">
        
        {/* layer 1 */}
        <div className="absolute inset-0 rounded-xl bg-blue-600"></div>

        {/* layer 2 */}
        <div className="absolute inset-0 rounded-xl bg-sky-400 animate-[spin_1.4s_linear_infinite]"></div>

        {/* layer 3 */}
        <div className="absolute inset-0 rounded-xl bg-green-400 animate-[spin_1.4s_linear_infinite]"></div>

        {/* logo */}
        <Image
          src="/ChatGPT Image 10 Μαρ 2026, 04_35_50 μμ.png"
          alt="logo"
          width={44}
          height={44}
          className="relative z-10"
        />
      </div>

    </div>
  );
}