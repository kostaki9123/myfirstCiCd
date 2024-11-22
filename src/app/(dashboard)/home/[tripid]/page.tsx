
const Home = () => {
  
  return (

<div className="border-2 border-pink-600 h-full grid gap-6 p-6 z-40 
  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
  auto-rows-[200px] overflow-y-auto">
  
  {/* Sidebar / First Section */}
  <div className="bg-lime-600 border-2 border-lime-800 h-[200px] min-w-[150px]">
    Sidebar Content
  </div>

  {/* Main Content */}
  <div className="bg-lime-600 border-2 border-lime-800 h-[200px] min-w-[200px] col-span-1 lg:col-span-2">
    Main Content
  </div>

  {/* Additional Sidebar / Utilities */}
  <div className="bg-lime-600 border-2 border-lime-800 h-[200px] min-w-[150px]">
    Additional Sidebar Content
  </div>

  {/* Footer / Additional Sections */}
  <div className="bg-lime-600 border-2 border-lime-800 h-[250px] min-w-[300px] col-span-1 sm:col-span-2">
    Footer Left Content
  </div>

  <div className="bg-lime-600 border-2 border-lime-800 h-[250px] min-w-[150px]">
    Footer Center Content
  </div>

  <div className="bg-lime-600 border-2 border-lime-800 h-[250px] min-w-[150px]">
    Footer Right Content
  </div>
</div>

  );
};

export default Home;
