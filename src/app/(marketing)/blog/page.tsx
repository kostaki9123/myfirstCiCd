import Image from "next/image";
import Link from "next/link";


const posts = [
  {
    slug: "cyprus-itinerary",
    title: "Cyprus Itinerary: The Perfect 7-Day Trip",
    description:
      "Planning a trip to Cyprus? Discover the best routes, places to visit, and itinerary ideas 7 days.",
    category: "Cyprus",
    date: "September 2026",
    readTime: "10 min read",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2hUr_0Q2DCy7z8MSjebUI_2uLNZ6Fig7RjTep-wkFuvvnTOidSVRFTFia&s=10",
    featured: true,
  },

  {
    slug: "cyprus-road-trip-itinerary",
    title: "Cyprus Road Trip Itinerary: The Best Route Around the Island",
    description:
      "A practical Cyprus road trip itinerary covering the best destinations, routes and stops around the island.",
    category: "Cyprus",
    date: "Coming soon",
    readTime: "8 min read",
    image:
      "/ChatGPT Image 26 Ιουν 2026, 11_19_25 πμ αντίγραφο.png",
  },

  {
    slug: "things-to-do-in-cyprus",
    title: "Best Things to Do in Cyprus",
    description:
      "From beaches and mountain villages to ancient sites and vibrant cities, discover some of the best things to do in Cyprus.",
    category: "Cyprus",
    date: "Coming soon",
    readTime: "7 min read",
    image:
      "/ChatGPT Image 26 Ιουν 2026, 11_19_25 πμ αντίγραφο.png",
  },

  {
    slug: "larnaca-itinerary",
    title: "Larnaca Itinerary: What to Do in 1, 2 or 3 Days",
    description:
      "Planning to visit Larnaca? Here's how to make the most of your time in one of Cyprus's most convenient starting points.",
    category: "Cyprus",
    date: "Coming soon",
    readTime: "6 min read",
    image:
      "/ChatGPT Image 26 Ιουν 2026, 11_19_25 πμ αντίγραφο.png",
  },

  {
    slug: "paphos-itinerary",
    title: "Paphos Itinerary: A Complete Guide",
    description:
      "Explore Paphos with a practical itinerary covering beaches, archaeological sites, food and nearby destinations.",
    category: "Cyprus",
    date: "Coming soon",
    readTime: "7 min read",
    image:
      "/ChatGPT Image 26 Ιουν 2026, 11_19_25 πμ αντίγραφο.png",
  },

  {
    slug: "cyprus-without-a-car",
    title: "Cyprus Without a Car: Is It Possible?",
    description:
      "Everything you need to know about getting around Cyprus without renting a car.",
    category: "Travel Tips",
    date: "Coming soon",
    readTime: "6 min read",
    image:
      "/ChatGPT Image 26 Ιουν 2026, 11_19_25 πμ αντίγραφο.png",
  },
];

const BlogPage = () => {
  const featuredPost = posts.find((post) => post.featured);
  const regularPosts = posts.filter((post) => !post.featured);

  return (
    <main className="min-h-screen bg-[#010038] text-white">
      {/* Header */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0">
          <Image
            src="/ChatGPT Image 26 Ιουν 2026, 11_19_25 πμ αντίγραφο.png"
            alt=""
            fill
            priority
            className="object-cover object-top opacity-20"
          />
        </div>

        <div className="absolute inset-0 bg-[#010038]/80" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Tripaki Blog
          </p>

          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Travel smarter.{" "}
            <span className="text-blue-400">Plan better.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Travel guides, itineraries and practical tips to help you plan
            better trips and make the most of every destination.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
              Featured guide
            </p>
          </div>

          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
          >
            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative min-h-[280px] overflow-hidden md:min-h-[420px]">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#010038]/70 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
                <div className="mb-5 flex items-center gap-3 text-sm text-white/50">
                  <span className="rounded-full bg-blue-500/20 px-3 py-1 text-blue-300">
                    {featuredPost.category}
                  </span>

                  <span>•</span>

                  <span>{featuredPost.readTime}</span>
                </div>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {featuredPost.title}
                </h2>

                <p className="mt-5 text-base leading-7 text-white/65">
                  {featuredPost.description}
                </p>

                <div className="mt-8 flex items-center gap-2 font-semibold text-blue-300">
                  Read the guide
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* All Articles */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Latest travel guides
            </h2>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post) => {
            const isComingSoon = post.date === "Coming soon";

            return (
              <article
                key={post.slug}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08]"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-[#010038]/20" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs text-white/45">
                    <span className="text-blue-300">
                      {post.category}
                    </span>

                    <span>•</span>

                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-semibold leading-snug">
                    {post.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/60">
                    {post.description}
                  </p>

                  {isComingSoon ? (
                    <span className="mt-5 inline-block text-sm font-medium text-white/40">
                      Coming soon
                    </span>
                  ) : (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-5 inline-block text-sm font-semibold text-blue-300 hover:text-blue-200"
                    >
                      Read article →
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to plan your own trip?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Save the places you want to visit, organize your days and build
            your trip your way with Tripaki.
          </p>

          <Link
            href="/sign-up"
            className="mt-8 inline-flex items-center rounded-xl bg-[#0356BC] px-6 py-3 font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-[#0466D9] active:scale-[0.98]"
          >
            Start Planning
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-white/40">
          © {new Date().getFullYear()} Tripaki. All rights reserved.
        </div>
      </footer>
    </main>
  );
};

export default BlogPage;