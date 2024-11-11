const testimonials = [
    { name: "Carlos M.", feedback: "Tripaki made my Bali trip stress-free and unforgettable! Highly recommend." },
    { name: "Sophia K.", feedback: "Easy to use, packed with great features. My New York trip was perfectly planned." },
    { name: "Liam J.", feedback: "Loved how seamless the planning process was. Best trip-planner app out there!" }
  ];
  
  const TestimonialsSection = () => {
    return (
        <section id="testimonials" className="py-20 bg-blue-50 px-5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold  mb-10">What Our Travelers Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg italic">"A truly exceptional service! Everything was so well organized, and I could customize every part of my trip."</p>
              <p className="mt-4 font-semibold">Sophia R.</p>
              <p className="text-sm text-gray-500">Traveler</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg italic">"Booking my honeymoon was so simple, and the recommendations were spot on. I couldn’t be happier!"</p>
              <p className="mt-4 font-semibold">Marcus T.</p>
              <p className="text-sm text-gray-500">Traveler</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg italic">"The best trip planning experience I've ever had. Everything was perfectly tailored to my tastes!"</p>
              <p className="mt-4 font-semibold">Emma W.</p>
              <p className="text-sm text-gray-500">Traveler</p>
            </div>
          </div>
        </div>
      </section>
      
      
    );
  };
  
  export default TestimonialsSection;
  