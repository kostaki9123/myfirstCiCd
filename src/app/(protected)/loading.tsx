import Image from "next/image";
import MainLoader from "../component/loaders/singUpandInloader";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center border-2 border-lime-500 bg-[#010038] z-50">
         <MainLoader/>
    </div>
  );
}