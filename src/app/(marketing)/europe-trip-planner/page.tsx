import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CircleCheck,
  Coins,
  Map,
  MapPin,
  Plane,
  Route,
  TrainFront,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Europe Trip Planner | Build Your European Itinerary | Tripaki",
  description:
    "Plan your Europe trip in one place. Organize multiple destinations, transport, accommodation, places to visit and your travel budget with Tripaki.",

  alternates: {
    canonical: "https://tripaki.travel/europe-trip-planner",
  },

  openGraph: {
    title: "Europe Trip Planner | Tripaki",
    description:
      "Create and organize your multi-city Europe itinerary, transport, accommodation, activities and budget in one place.",
    url: "https://tripaki.travel/europe-trip-planner",
    siteName: "Tripaki",
    type: "website",
    images: [
      {
        url: "/europe-trip-planner-bg.png",
        width: 1536,
        height: 1024,
        alt: "Europe map with connected travel destinations",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Europe Trip Planner | Tripaki",
    description:
      "Organize destinations, transport, accommodation, activities and budget for your Europe trip.",
    images: ["/europe-trip-planner-bg.png"],
  },
};

const exampleRoute = [
  {
    city: "Rome",
    country: "Italy",
    days: "Days 1–3",
  },
  {
    city: "Florence",
    country: "Italy",
    days: "Days 4–5",
  },
  {
    city: "Paris",
    country: "France",
    days: "Days 6–9",
  },
  {
    city: "Amsterdam",
    country: "Netherlands",
    days: "Days 10–12",
  },
];

const features = [
  {
    icon: Route,
    title: "Connect multiple destinations",
    description:
      "Build your route across cities and countries and keep the order of your journey clear.",
  },
  {
    icon: TrainFront,
    title: "Organize your transport",
    description:
      "Keep flights, trains, buses and other transport between destinations in your trip plan.",
  },
  {
    icon: CalendarDays,
    title: "Create a daily itinerary",
    description:
      "Organize accommodation and places you want to visit for each destination and travel day.",
  },
  {
    icon: Coins,
    title: "Track your travel budget",
    description:
      "Record expected and paid expenses so you can see how much of your budget remains.",
  },
];

const useCases = [
  "Planning a multi-country European holiday",
  "Organizing an Interrail or train journey",
  "Keeping saved places from social media together",
  "Planning a solo, couple, family or friends trip",
  "Managing accommodation, activities and transport",
  "Keeping an overview of the entire trip",
];

export default function EuropeTripPlannerPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#010038] text-white">
      {/* Hero */}
      <section className="relative isolate min-h-screen overflow-hidden">
        {/* Europe map background */}
        <Image
          src="/europe-trip-planner-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#010038]/55" />

        {/* Left-side overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#010026] via-[#010038]/80 to-[#010038]/25" />

        {/* Bottom fade into next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#010038]" />

        {/* Navigation */}
        <nav className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
         
        </nav>

        {/* Hero content */}
        <div
          className="
            relative z-10
            mx-auto grid
            min-h-[calc(100vh-104px)]
            max-w-7xl
            items-center
            gap-12
            px-6
            pb-24
            pt-10
            lg:grid-cols-[1.05fr_0.95fr]
            lg:px-10
          "
        >
          <div className="max-w-3xl">
            <div
              className="
                mb-6
                inline-flex items-center gap-2
                rounded-full
                border border-white/15
                bg-white/10
                px-4 py-2
                text-sm text-white/80
                shadow-lg
                backdrop-blur-md
              "
            >
              <MapPin className="h-4 w-4" />
              Free Europe trip planning tool
            </div>

            <h1
              className="
                max-w-4xl
                text-4xl
                font-bold
                leading-[1.08]
                tracking-tight
                sm:text-5xl
                lg:text-7xl
              "
            >
              Plan your entire Europe trip in one place
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75 sm:text-xl">
              Organize every European destination, transport connection,
              accommodation, place to visit and travel expense without
              spreading your plans across different apps.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/sign-up"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-white
                  px-7 py-3.5
                  font-semibold
                  text-[#010038]
                  shadow-xl
                  transition
                  hover:scale-[1.02]
                  hover:bg-white/90
                "
              >
                Create your Europe trip
                <ArrowRight className="h-5 w-5" />
              </Link>

              <a
                href="#how-it-works"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  border border-white/20
                  bg-white/10
                  px-7 py-3.5
                  font-medium
                  backdrop-blur-md
                  transition
                  hover:border-white/30
                  hover:bg-white/20
                "
              >
                See how it works
              </a>
            </div>

            <p className="mt-5 text-sm text-white/60">
              Free to use · Plan at your own pace · Keep full control
            </p>
          </div>

          {/* Example route card */}
          <div
            className="
              rounded-[32px]
              border border-white/15
              bg-[#010038]/45
              p-5
              shadow-2xl
              backdrop-blur-xl
              sm:p-7
            "
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm text-white/55">Example journey</p>

                <h2 className="mt-1 text-xl font-semibold">
                  European city adventure
                </h2>
              </div>

              <div className="rounded-2xl bg-white/10 p-3">
                <Map className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-6 space-y-1">
              {exampleRoute.map((destination, index) => (
                <div
                  key={destination.city}
                  className="relative flex items-start gap-4 pb-5"
                >
                  {index !== exampleRoute.length - 1 && (
                    <div
                      className="
                        absolute
                        left-[17px]
                        top-9
                        h-[calc(100%-24px)]
                        w-px
                        bg-white/20
                      "
                    />
                  )}

                  <div
                    className="
                      relative z-10
                      flex h-9 w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      font-semibold
                      text-[#010038]
                    "
                  >
                    {index + 1}
                  </div>

                  <div
                    className="
                      flex flex-1
                      items-center
                      justify-between
                      rounded-2xl
                      border border-white/[0.06]
                      bg-white/[0.07]
                      px-4 py-3
                    "
                  >
                    <div>
                      <p className="font-semibold">{destination.city}</p>

                      <p className="mt-1 text-sm text-white/55">
                        {destination.country}
                      </p>
                    </div>

                    <span className="text-sm text-white/65">
                      {destination.days}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/[0.07] p-4">
                <Plane className="h-5 w-5 text-white/75" />

                <p className="mt-3 text-sm text-white/55">Destinations</p>

                <p className="mt-1 text-lg font-semibold">4 cities</p>
              </div>

              <div className="rounded-2xl bg-white/[0.07] p-4">
                <CalendarDays className="h-5 w-5 text-white/75" />

                <p className="mt-3 text-sm text-white/55">Trip length</p>

                <p className="mt-1 text-lg font-semibold">12 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">
            One journey, one organized plan
          </p>

          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
            A Europe trip can become complicated quickly
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65">
            Flights may be in your email, saved attractions in social media,
            accommodation in booking apps and your daily plan in Notes.
            Tripaki brings those parts together into one clear trip.
          </p>
        </div>
      </section>

      {/* Features */}
      <section
        id="how-it-works"
        className="
          scroll-mt-10
          border-y border-white/10
          bg-white/[0.035]
          px-6 py-24
          lg:px-10
        "
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">
              Europe itinerary planner
            </p>

            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
              Everything you need to organize a multi-city trip
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/65">
              You choose where you want to go. Tripaki helps you turn those
              choices into an organized journey.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="
                    rounded-[28px]
                    border border-white/10
                    bg-white/[0.055]
                    p-7
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:border-white/20
                    hover:bg-white/[0.08]
                  "
                >
                  <div
                    className="
                      flex h-12 w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-white
                      text-[#010038]
                    "
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-white/60">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="px-6 py-24 lg:px-10">
        <div
          className="
            mx-auto grid
            max-w-7xl
            gap-14
            lg:grid-cols-2
            lg:items-center
          "
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">
              Built for real European journeys
            </p>

            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
              Useful whether you visit two cities or cross several countries
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
              Tripaki is designed for travellers who already have ideas and
              saved places but need a simpler way to turn them into a complete
              itinerary.
            </p>
          </div>

          <div
            className="
              rounded-[32px]
              border border-white/10
              bg-white/[0.055]
              p-7
              sm:p-9
            "
          >
            <ul className="space-y-5">
              {useCases.map((useCase) => (
                <li key={useCase} className="flex items-start gap-3">
                  <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />

                  <span className="text-white/75">{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-24 lg:px-10">
        <div
          className="
            relative
            mx-auto
            max-w-6xl
            overflow-hidden
            rounded-[36px]
            border border-white/15
            bg-gradient-to-br
            from-blue-600/40
            to-purple-600/25
            px-7 py-16
            text-center
            shadow-2xl
            sm:px-12
          "
        >
          <div className="absolute inset-0 bg-white/[0.025]" />

          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Start planning your Europe trip
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">
              Add your destinations, connect your route and organize the entire
              journey in one place.
            </p>

            <Link
              href="/sign-up"
              className="
                mt-8
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-full
                bg-white
                px-8 py-4
                font-semibold
                text-[#010038]
                transition
                hover:scale-[1.02]
                hover:bg-white/90
              "
            >
              Build your trip for free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-10 lg:px-10">
        <div
          className="
            mx-auto flex
            max-w-7xl
            flex-col
            items-center
            justify-between
            gap-5
            sm:flex-row
          "
        >
          <Link href="/morethantrip" className="flex items-center gap-3">
            <Image
              src="/ChatGPT Image 10 Μαρ 2026, 04_35_50 μμ.png"
              alt="Tripaki logo"
              width={44}
              height={44}
              className="object-contain"
            />

            <span className="font-semibold">Tripaki</span>
          </Link>

          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Tripaki. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}