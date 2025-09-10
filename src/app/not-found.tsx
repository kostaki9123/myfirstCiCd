import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return <div className="h-full w-full absolute flex flex-col items-center justify-center text-white text-lg gap-4 font-semibold " >
            <h1 className="scroll-m-20 text-center text-6xl font-extrabold tracking-tight text-balance">
                  404 
            </h1>            
            <div>
            Page Not Found
            </div>
            <Link href={'/'}>
              <Button  className=" bg-black">
              Return To Home Page
              </Button>
            </Link>
         </div>
}

