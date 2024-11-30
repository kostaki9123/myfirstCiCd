'use client'

import { usePathname } from 'next/navigation'
import { CiHome } from "react-icons/ci";
import { IoMdCreate } from "react-icons/io";
import { GrSchedule } from "react-icons/gr";
import { LuWallet } from "react-icons/lu";
import Link from 'next/link';

const Sidebar = () => {
    const pathname = usePathname()

  
    console.log("pathname",pathname)
  // Sidebar items
  const menuItems = [
    { name: 'Home', path: '/home/289383'  },
    { name: 'Create trip', path: '/createtrip/8293'  },
    { name: 'Itinerary', path: '/itinerary/2390'  },
    { name: 'Budget', path: '/budget/2389'  },
  ];

  return (
    <aside className="w-64 bg-[#010038] text-white min-h-[612px]  pt-20 flex-col   md:flex hidden">
      
      <nav className="flex-grow">
        <ul className=" ">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path} className='py-2 text-base  relative  flex items-center gap-3 justify-start pl-[70px]' >
                {item.name === "Home" &&<div className=' text-xl'><CiHome/></div>}
                {item.name === "Create trip" && <div className=' text-xl'><IoMdCreate/></div> }
                {item.name === "Itinerary" && <div className=' text-xl'><GrSchedule/></div>}
                {item.name === "Budget" && <div className=' text-xl'> <LuWallet/> </div>}
               {pathname === item.path &&
               <div className=' bg-yellow-400 h-5 w-[5px] absolute right-0 top-[30%] rounded-l-lg '>
               </div>
               }
               <div className='block py-2 px-4' >
                  {item.name}
               </div>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
