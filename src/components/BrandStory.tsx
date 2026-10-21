export const BrandStory = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-railway-red to-railway-orange text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl mb-6">Why RailBite exists</h2>
            <div className="space-y-4 text-lg text-white/90 leading-relaxed">
              <p>
                Every day, millions of railway passengers in India face the same challenge: finding good, affordable food during their journey.
              </p>
              <p>
                In Tier-2 and Tier-3 cities, the problem is even more pronounced. Limited options, uncertain hygiene, unclear prices, and inconvenient service make every meal a source of stress.
              </p>
              <p>
                RailBite was created to solve this. We're building a network of outlets at railway stations, offering wholesome Indian meals with clear prices, convenient ordering, and reliable quality.
              </p>
              
              <div className="grid grid-cols-2 gap-4 my-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold mb-1">24/7</div>
                  <div className="text-sm text-white/80">Open at select stations to serve early morning and late-night travelers</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold mb-1">100%</div>
                  <div className="text-sm text-white/80">Hygienic dine-in at every outlet — familiar, reliable, good to go</div>
                </div>
              </div>
              
              <p className="font-semibold text-xl">Because every journey deserves good food.</p>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800"
                alt="Railway journey"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white text-charcoal p-6 rounded-2xl shadow-xl max-w-sm">
              <p className="font-bold text-lg mb-2">
                No more uncertainty about where my next meal comes from.
              </p>
              <p className="text-sm text-gray-600">— The goal for every RailBite customer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
