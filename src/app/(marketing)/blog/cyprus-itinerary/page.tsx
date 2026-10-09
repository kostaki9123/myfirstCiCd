import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import AddToTripakiButton from "./components/AddToTripakiButton";

const heroImage =
  "/ChatGPT Image 26 Ιουν 2026, 11_19_25 πμ αντίγραφο.png";

export const metadata: Metadata = {
  title:
    "Cyprus 7-Day Itinerary: The Perfect One-Week Trip | Tripaki",
  description:
    "Planning a one-week trip to Cyprus? Follow this 7-day Cyprus itinerary starting and ending in Larnaca, covering Ayia Napa, Protaras, Nicosia, Troodos, Limassol and Paphos.",
  keywords: [
    "Cyprus 7 day itinerary",
    "Cyprus itinerary 7 days",
    "Cyprus one week itinerary",
    "Cyprus travel itinerary",
    "Cyprus road trip 7 days",
    "things to do in Cyprus",
    "Cyprus road trip",
    "Larnaca airport itinerary",
  ],
  openGraph: {
    title:
      "Cyprus 7-Day Itinerary: The Perfect One-Week Trip",
    description:
      "A practical 7-day Cyprus itinerary starting and ending in Larnaca, covering beaches, cities, mountains and historic sites.",
    type: "article",
    images: [
      {
        url: heroImage,
        width: 1200,
        height: 630,
        alt: "Cyprus 7-day travel itinerary",
      },
    ],
  },
};


const days = [
  {
    day: "Day 1",
    title: "Larnaca",
    subtitle: "Start your Cyprus adventure",
    image:
      "https://images.unsplash.com/photo-1602521163379-79fba9eac5e6?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaGdlfHx8fA%3D%3D",
    description:
      "Arrive at Larnaca International Airport and begin your Cyprus adventure in Larnaca. Spend your first day exploring the city, walking along the coast and getting settled before continuing east.",
    places: [
      "Finikoudes Promenade",
      "Larnaca Old Town",
      "Larnaca Salt Lake",
      "Mackenzie Beach",
      "Metropolis Mall",
    ],
    stay: {
      name: "La veranda",
      description:
         "La Veranda offers a cozy stay near Larnaca’s attractions, beaches, restaurants, and vibrant city center.",
      link: "https://expedia.com/affiliates/larnaca-hotels-la-veranda-hotel.Wsljncp",
    },
  },

  {
    day: "Day 2",
    title: "Ayia Napa & Protaras",
    subtitle: "Beaches and the eastern coast",
    image:
      "https://images.unsplash.com/photo-1617870544224-039877fd68fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaGdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Head east for a day focused on some of Cyprus's most famous coastline. Explore Ayia Napa, spend time at the beach and continue towards Cape Greco and Protaras.",
    places: [
      "Nissi Beach",
      "Ayia Napa",
      "Cape Greco",
      "Protaras",
      "Fig Tree Bay",
    ],
    stay: {
      name: "Anesis",
      description:
        "Anesis Hotel offers a comfortable stay near Ayia Napa’s beaches, restaurants, nightlife, and beautiful harbor.",
      link: "https://expedia.com/affiliates/larnaca-hotels-anesis.Ve9FnXz",
    },
  },

  {
    day: "Day 3",
    title: "Nicosia",
    subtitle: "Explore Cyprus's capital",
    image:
      "https://images.unsplash.com/photo-1723635432909-60201d475b1a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaGdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Leave the eastern coast and head towards Nicosia, the capital of Cyprus. Explore the historic centre, old city streets and the unique atmosphere of the island's capital.",
    places: [
      "Old City",
      "Ledra Street",
      "Venetian Walls",
      "Historic centre",
    ],
    stay: {
      name: "Semeli Hotel",
      description:
        "Semeli Hotel offers a comfortable city stay in Nicosia, close to business areas, shops, restaurants, and attractions.",
      link: "https://expedia.com/affiliates/larnaca-hotels-semeli-hotel.4LxFmrb",
    },
  },

  {
    day: "Day 4",
    title: "Troodos Mountains",
    subtitle: "Villages, nature and mountain scenery",
    image:
      "https://images.unsplash.com/photo-1657707419178-b6f069b47877?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaGdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Leave the capital and head into the Troodos Mountains. Experience a different side of Cyprus, with traditional villages, forests and mountain scenery before continuing towards the south coast.",
    places: [
      "Troodos Mountains",
      "Omodos",
      "Mountain villages",
      "Scenic viewpoints",
    ],
    stay: {
      name: "Troodos Hotel",
      description:
        'Troodos Hotel offers a peaceful mountain retreat surrounded by nature, perfect for exploring villages, trails, and scenic landscapes.',
      link: "https://expedia.com/affiliates/troodos-hotels-troodos-hotel.IamyYe2",
    },
  },

  {
    day: "Day 5",
    title: "Limassol",
    subtitle: "Coastal city life",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw63g3eGLxHW_ulA9MB-i69uOAyd1igBltcwHAAUCXrluFTzcDBOwOrKtG&s=10",
    description:
      "Continue to Limassol and spend the day exploring its old town, marina and coastal areas. Enjoy the city's atmosphere before continuing west towards Paphos.",
    places: [
      "Limassol Old Town",
      "Limassol Marina",
      "Molos Promenade",
      "Old Port",
    ],
    stay: {
      name: "Harmony Bay Hotel",
      description:
        "A beachfront hotel in Limassol, offering comfortable rooms, sea views, and easy access to the city’s coastal promenade.",
      link: "https://expedia.com/affiliates/limassol-hotels-harmony-bay-hotel.dNADJTp",
    },
  },

  {
    day: "Day 6",
    title: "Paphos",
    subtitle: "History and the western coast",
    image:
      "https://takemetoeuropetours.com/wp-content/uploads/2024/02/paphos-Harbor-Promenada.jpg",
    description:
      "Travel west to Paphos and discover one of Cyprus's most historically important destinations. Combine archaeological sites with the harbour, coastline and old town.",
    places: [
      "Paphos Harbour",
      "Paphos Archaeological Park",
      "Tombs of the Kings",
      "Paphos coastline",
    ],
    stay: {
      name: "Capital Coast Resort & Spa",
      description:
        "Capital Coast Resort & Spa offers a relaxing seaside stay in Paphos, with spacious rooms, sea views, pools, and spa facilities.",
      link: "https://expedia.com/affiliates/paphos-hotels-capital-coast-resort-spa.7mudl5L",
    },
  },
  {
    day: "Day 7",
    title: "Larnaca & departure",
    subtitle: "Return to Larnaca for your flight home",
    image: heroImage,
    description:
      "Make your way back to Larnaca and head to Larnaca International Airport for your flight home. If you have extra time before your departure, you can enjoy a final breakfast or walk along the coast.",
    places: [],
    stay: {
      name: "",
      description: "",
      link: "#",
    },
  },
]


export default function Cyprus7DayItineraryPage() {
  return (
    <main className="min-h-screen bg-[#010038] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Cyprus coastline"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 bg-[#010038]/75" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#010038]/20 via-[#010038]/65 to-[#010038]" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-300">
              Cyprus Travel Guide
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Cyprus 7-Day Itinerary:
              <span className="block text-blue-400">
                The Perfect One-Week Trip
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
              Discover the best of Cyprus in one week, starting and ending
              in Larnaca, with beaches, cities, mountains, historic sites
              and the island's western coast along the way.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-white/60">
              <span className="rounded-full bg-white/10 px-4 py-2">
                📍 Cyprus
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2">
                7 Days
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2">
                🚗 Road Trip
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2">
                ✈️ Larnaca Airport
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2">
                10 min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <article className="mx-auto max-w-5xl px-6 pb-24">
        {/* ADD TO TRIPAKI */}
        <section className="relative z-20 -mt-8">
          <div className="rounded-3xl border border-blue-400/20 bg-[#07134d]/95 p-7 shadow-2xl backdrop-blur-xl sm:p-9">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-300">
                  Like this itinerary?
                </p>

                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Make this trip your own
                </h2>

                <p className="mt-3 max-w-2xl leading-7 text-white/60">
                  Use this itinerary as a starting point. Change
                  destinations, remove places, add your own stops and
                  organize the trip around what you actually want to see.
                </p>
              </div>

              <AddToTripakiButton />
             
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="mx-auto mt-16 max-w-4xl">
          <p className="text-lg leading-8 text-white/75">
            Seven days is a great amount of time to experience several
            different sides of Cyprus without trying to see everything in a
            single trip.
          </p>

          <p className="mt-6 text-lg leading-8 text-white/65">
            This route is designed as a loop that starts at Larnaca
            International Airport and returns to Larnaca at the end of the
            trip. Along the way, you can experience beaches, cities,
            history, traditional villages, mountains and the western coast.
          </p>

          <p className="mt-6 text-lg leading-8 text-white/65">
            You can follow the itinerary as written or use it as a starting
            point and change it according to your own interests, travel
            style and flight times.
          </p>
        </section>

        {/* QUICK ROUTE */}
        <section className="mt-14">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
              At a glance
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Your 7-day Cyprus route
            </h2>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["01", "Larnaca"],
                ["02", "Ayia Napa & Protaras"],
                ["03", "Nicosia"],
                ["04", "Troodos"],
                ["05", "Limassol"],
                ["06", "Paphos"],
                ["07", "Larnaca & departure"],
              ].map(([number, place]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <span className="text-xs font-bold text-blue-300">
                    DAY {number}
                  </span>

                  <p className="mt-2 font-semibold">{place}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-blue-400/10 bg-blue-500/5 p-5">
              <p className="text-sm leading-7 text-white/60">
                <span className="font-semibold text-white/80">
                  Route:
                </span>{" "}
                Larnaca → Ayia Napa & Protaras → Nicosia → Troodos →
                Limassol → Paphos → Larnaca
              </p>
            </div>
          </div>
        </section>

        {/* TABLE OF CONTENTS */}
        <section className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-bold">In this guide</h2>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              ["#day-1", "Day 1 — Larnaca"],
              ["#day-2", "Day 2 — Ayia Napa & Protaras"],
              ["#day-3", "Day 3 — Nicosia"],
              ["#day-4", "Day 4 — Troodos Mountains"],
              ["#day-5", "Day 5 — Limassol"],
              ["#day-6", "Day 6 — Paphos"],
              ["#day-7", "Day 7 — Larnaca & departure"],
              ["#practical", "Practical information"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="rounded-xl px-3 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-blue-300"
              >
                {label} →
              </a>
            ))}
          </div>
        </section>

        {/* TRANSPORT */}
        <section className="mt-14">
          <div className="rounded-3xl border border-blue-400/20 bg-blue-500/10 p-7 sm:p-9">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/15 text-2xl">
                🚗
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-300">
                  Our recommendation
                </p>

                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Rent a car for your Cyprus trip
                </h2>

                <p className="mt-4 leading-7 text-white/70">
                  For this 7-day itinerary, we recommend renting a car for
                  the duration of your trip. Public transport in Cyprus is
                  relatively limited and can be inconvenient, especially
                  when travelling between different parts of the island.
                  Bus routes and schedules are not always well suited to a
                  multi-destination itinerary, and reaching smaller
                  villages, mountain areas and more remote beaches can be
                  difficult without a car.
                </p>

                <p className="mt-4 leading-7 text-white/60">
                  Having your own car gives you more freedom to move between
                  destinations, stop whenever you want and reach places that
                  are difficult to access by bus. Relying on taxis for
                  multiple journeys across the island can also become
                  expensive during a week-long trip.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="font-semibold">
                      🚗 More freedom
                    </p>

                    <p className="mt-2 text-sm leading-6 text-white/50">
                      Explore at your own pace without depending on bus
                      schedules.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="font-semibold">
                      🏔️ Reach more places
                    </p>

                    <p className="mt-2 text-sm leading-6 text-white/50">
                      Especially useful for Troodos villages, viewpoints
                      and beaches away from the main towns.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="font-semibold">
                      💰 Manage your budget
                    </p>

                    <p className="mt-2 text-sm leading-6 text-white/50">
                      Avoid depending on taxis for multiple journeys
                      across the island.
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm text-white/40">
                  Cyprus drives on the left-hand side of the road.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DAYS */}
        <section className="mt-20">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-300">
              The itinerary
            </p>

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              7 days in Cyprus
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-white/55">
              A complete island route starting and ending in Larnaca, making
              it convenient if your flights arrive and depart from Larnaca
              International Airport.
            </p>
          </div>

          <div className="space-y-16">
            {days.map((day, index) => (
              <section
                key={day.day}
                id={`day-${index + 1}`}
                className="scroll-mt-24"
              >
                <div className="mb-5 flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/15 text-sm font-bold text-blue-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-blue-300">
                      {day.day}
                    </p>

                    <h2 className="text-2xl font-bold sm:text-3xl">
                      {day.title}
                    </h2>
                  </div>
                </div>

                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                 {index !== 6 && (
                    <div className="relative aspect-[16/8]">
                      <Image
                        src={day.image}
                        alt={`${day.title}, Cyprus`}
                        fill
                        className="object-cover"
                      />
                  
                      <div className="absolute inset-0 bg-gradient-to-t from-[#010038]/70 to-transparent" />
                    </div>
                  )}

                  <div className="p-7 sm:p-9">
                    <p className="text-sm font-medium text-blue-300">
                      {day.subtitle}
                    </p>

                    <p className="mt-4 text-base leading-8 text-white/65">
                      {day.description}
                    </p>
                        {index !== 6 && (
  <div className="mt-8 grid gap-6 sm:grid-cols-2">
    <div>
      <h3 className="font-semibold">
        What to see
      </h3>

      <ul className="mt-3 space-y-2">
        {day.places.map((place) => (
          <li
            key={place}
            className="flex gap-2 text-sm text-white/60"
          >
            <span className="text-blue-300">
              ✓
            </span>

            {place}
          </li>
        ))}
      </ul>
    </div>

    <div>
      <h3 className="font-semibold">
        🏨 Where to stay
      </h3>

      <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <p className="font-semibold text-white">
          {day.stay.name}
        </p>

        <p className="mt-2 text-sm leading-6 text-white/60">
          {day.stay.description}
        </p>

        {day.stay.link !== "#" && (
          <a
            href={day.stay.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center rounded-lg bg-[#0356BC] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0466D9]"
          >
            View hotel →
          </a>
        )}
      </div>
    </div>
  </div>
)}
                    

                    </div>
                
                </div>
              </section>
            ))}
          </div>
        </section>

        {/* PRACTICAL */}
        <section
          id="practical"
          className="mt-24 scroll-mt-24"
        >
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-300">
              Before you go
            </p>

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Practical information
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <InfoCard
              title="✈️ Where should I fly?"
              text="This itinerary starts and ends in Larnaca, making Larnaca International Airport a convenient choice if your flights arrive and depart from LCA."
            />

            <InfoCard
              title="🚗 Do you need a car?"
              text="For this particular route, a rental car gives you much more flexibility, especially for Troodos and destinations outside the main cities."
            />

            <InfoCard
              title="🏨 Where should you stay?"
              text="You can either move between destinations or choose a few bases and make day trips. For a more relaxed trip, fewer hotel changes can make the week easier."
            />

            <InfoCard
              title="☀️ When should you visit?"
              text="Cyprus can offer very different experiences depending on the season. Summer is popular for beaches, while spring and autumn can be more comfortable for exploring."
            />

            <InfoCard
              title="💰 What about the budget?"
              text="Your total cost depends heavily on accommodation, transport, food, activities and the time of year. Build your budget around the style of trip you want."
            />

            <InfoCard
              title="🧳 Can I change the route?"
              text="Absolutely. This is a suggested route rather than a fixed schedule. You can remove destinations, add your own places and spend more time in the areas you prefer."
            />
          </div>
        </section>

        {/* IS IT FOR YOU */}
        <section className="mt-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-300">
              Make it your own
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Is this itinerary right for you?
            </h2>

            <p className="mt-5 max-w-3xl leading-8 text-white/65">
              This route is designed to give you a taste of different sides
              of Cyprus. But you don't have to follow it exactly.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-5">
                <h3 className="font-semibold">
                  Good if you want:
                </h3>

                <ul className="mt-3 space-y-2 text-sm text-white/60">
                  <li>✓ Beaches</li>
                  <li>✓ Cities</li>
                  <li>✓ History</li>
                  <li>✓ Mountains</li>
                  <li>✓ Road trip</li>
                  <li>✓ Multiple regions</li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white/5 p-5">
                <h3 className="font-semibold">
                  You can change it if you want:
                </h3>

                <ul className="mt-3 space-y-2 text-sm text-white/60">
                  <li>✓ More beach time</li>
                  <li>✓ More hiking</li>
                  <li>✓ More nightlife</li>
                  <li>✓ Fewer hotel changes</li>
                  <li>✓ More time in one city</li>
                  <li>✓ Different destinations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-300">
            FAQ
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Cyprus 7-day itinerary questions
          </h2>

          <div className="mt-8 space-y-4">
            <Faq
              question="Is 7 days enough for Cyprus?"
              answer="Yes. Seven days gives you enough time to experience several regions of Cyprus, although you will still need to choose which destinations are most important to you."
            />

            <Faq
              question="Can I see Cyprus without a car?"
              answer="Yes, but this particular itinerary is easier with a car because some mountain villages, beaches and attractions are not as convenient to reach using public transport."
            />

            <Faq
              question="Should I stay in one hotel for the whole week?"
              answer="You can, but changing bases can reduce driving time. Another option is to choose two or three bases and take day trips from each."
            />

            <Faq
              question="Where should I fly into and out of Cyprus?"
              answer="If your flights arrive at and depart from Larnaca International Airport, this itinerary is designed as a loop that starts and finishes in Larnaca."
            />

            <Faq
              question="What are the best places to visit in Cyprus in 7 days?"
              answer="A balanced first trip can include Larnaca, the eastern beaches, Nicosia, the Troodos Mountains, Limassol and Paphos."
            />

            <Faq
              question="Can I customize this itinerary?"
              answer="Absolutely. The itinerary is a starting point. You can remove destinations, add places you personally want to visit and reorganize your days."
            />
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-24 overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/15 via-white/5 to-white/[0.02] p-8 text-center sm:p-12">
          <div className="mx-auto max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-300">
              Make it yours
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Don't want to follow the route exactly?
            </h2>

            <p className="mt-5 leading-7 text-white/60">
              Start with this 7-day Cyprus route and customize it around the
              places you actually want to visit.
            </p>

            <AddToTripakiButton />

            <p className="mt-4 text-xs text-white/35">
              Start with the itinerary. Make it your own.
            </p>
          </div>
        </section>
      </article>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-white/40">
          © {new Date().getFullYear()} Tripaki. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

function InfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-white/55">
        {text}
      </p>
    </div>
  );
}

function Faq({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group rounded-2xl border border-white/10 bg-white/5">
      <summary className="cursor-pointer list-none px-6 py-5 font-semibold">
        <div className="flex items-center justify-between gap-4">
          <span>{question}</span>

          <span className="text-xl text-blue-300 transition-transform group-open:rotate-45">
            +
          </span>
        </div>
      </summary>

      <div className="border-t border-white/10 px-6 py-5 text-sm leading-7 text-white/60">
        {answer}
      </div>
    </details>
  );
}

