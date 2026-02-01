'use client'

import { useEffect, useState } from "react"
import Avgproductdropdown from "./avgproductdropdown"
import { countryBudgetProfilesEUR } from "@/lib/countryBudgetProfiles"




type Props = {
  pointsArr: any[]
}

// Helper to get country code from lat/lng
const getCountryCodeFromLatLng = async (lat: number, lng: number) => {
  if (!lat || !lng) return null
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`
    )
    const data = await res.json()
    const country = data.results[0]?.address_components?.find(
      (c: any) => c.types.includes("country")
    )
    return country?.short_name ?? null
  } catch (err) {
    console.error("Failed to geocode", err)
    return null
  }
}

const TripBudgetCard = ({ pointsArr }: Props) => {
  const [pointsWithCountries, setPointsWithCountries] = useState<({ countryCode: string | null })[]>([])
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Geocode all points on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true)
        const updated = await Promise.all(
          pointsArr.map(async (point) => {
            const code = point.placeLat && point.placeLng 
              ? await getCountryCodeFromLatLng(point.placeLat, point.placeLng) 
              : null
            return { ...point, countryCode: code }
          })
        )
        setPointsWithCountries(updated)
      } catch {
        setError("Failed to fetch countries")
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [pointsArr,selectedCountryCode])

  // Determine active country
  const activeCountryCode = selectedCountryCode ?? pointsWithCountries[0]?.countryCode ?? null

  const profile = activeCountryCode
    ? countryBudgetProfilesEUR[activeCountryCode]
    : null

  // Dropdown only contains unique countries from pointsWithCountries
  const dropdownCountries = Array.from(
    new Set(pointsWithCountries.map(p => p.countryCode).filter((c): c is string => !!c))
  ).map(code => ({
    code,
  }))

  return (
    <div className="bg-[#ACA7CB] relative p-2 rounded-md base:row-start-5 base:row-end-6 base:col-start-1 base:col-end-2 535:row-start-3 535:row-end-4 535:col-start-1 535:col-end-2   787:row-start-3 787:row-end-4 787:col-start-1 787:col-end-2 986:row-start-1 986:row-end-5 986:col-start-3 986:col-end-4  xl:row-start-5 xl:row-end-9 xl:col-start-3 xl:col-end-4  ">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Avg Daily Budget
      </h4>
      {activeCountryCode ?
       <Avgproductdropdown
            arrayOfCountries={dropdownCountries}
            selectedCountryCode={activeCountryCode}
            setSelectedCountry={setSelectedCountryCode}
        /> 
        :
        <p className="text-sm mt-2 absolute bottom-0 left-0 right-0 top-2 flex justify-center items-center">
          There is no place yet
        </p>
      }
       
      {loading && <p className="text-sm mt-2">Loading budget...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {profile && (
        <>
          {/* Dropdown for manual country selection */}
          

          {/* Display budget tiers */}
          <div className="mt-4 space-y-3 text-sm px-5 flex flex-col">
            <div className="flex justify-between">
              <span>💸 Budget traveler</span>
              <span>€ {profile.budget} / day</span>
            </div>

            <div className="flex justify-between">
              <span>💼 Mid-range traveler</span>
              <span>€ {profile.mid} / day</span>
            </div>

            <div className="flex justify-between">
              <span>💎 Luxury traveler</span>
              <span>€ {profile.luxury} / day</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TripBudgetCard
