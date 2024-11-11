const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-light px-5">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-12">Features You'll Love</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Custom Itineraries</h3>
            <p>Create your personalized travel plan with ease using our powerful tools.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Real-Time Updates</h3>
            <p>Get real-time updates on flights, weather, and travel alerts to stay informed.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">24/7 Support</h3>
            <p>Our customer support team is available around the clock to assist you with any questions.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
