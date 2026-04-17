import MainLoader from "@/app/component/loaders/singUpandInloader";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-[#010038] z-50">   
       <MainLoader/>
    </div>
  );
}