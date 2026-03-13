import Image from "next/image";

export default function MainLoader() {
  return (
   <div className="flex items-center justify-center h-[300px] w-[300px] rounded-lg">
      
      {/* Logo */}
      <div className="animate-pulseLogo">
        <Image
          src="/ChatGPT Image 10 Μαρ 2026, 04_35_50 μμ.png"
          alt="logo"
          width={120}
          height={120}
        />
      </div>
    </div>
  );
}