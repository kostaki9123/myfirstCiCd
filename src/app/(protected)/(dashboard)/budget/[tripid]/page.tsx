import React from 'react'
import Amounts from './component/amount'
import Expenseschart from './component/expenseschart'
import Setbudgetamount from './component/setbudgetamount'
import Allexpenses from './component/allexpenses'
import Currency from './component/currency'
import { getPoints } from '../../plan/[tripid]/action'
import TripBudgetCard from './component/Avgpruductprice/avgproductprice'
import { getBudgetByTripId } from './action'
import { getPlaces } from '../../itinerary/[tripid]/action'
import PhoneMap from '../../itinerary/[tripid]/components/phonemap'

const DATE_COLORS = [
  '#3b82f6',
  '#92400e',
  '#7c3aed',
  '#f97316',
  '#ec4899',
  '#ef4444',
  '#10b981',
  '#f59e0b',
  '#06b6d4',
  '#84cc16',
  '#e11d48',
  '#0ea5e9',
  '#a855f7',
  '#14b8a6',
  '#f43f5e',
]

const page = async ({
  params,
}: {
  params: Promise<{ tripid: string }>
}) => {
  const { tripid } = await params

  const points = await getPoints(tripid)
  const pointsOnly = points.filter((p) => p.role === 'POINT')

  const budget = await getBudgetByTripId(tripid)

  const placesPerPoint = await Promise.all(
    pointsOnly.map((point) => getPlaces(point.id))
  )

  const allPlaces = placesPerPoint.flat()

  const placesToVisit = allPlaces.filter(
    (p) => p.placeType === 'PLACE_TO_VISIT'
  )

  const stays = allPlaces
    .filter((p) => p.placeType === 'ACCOMMODATION')
    .map((p) => ({
      id: String(p.id),
      name: p.name,
      location: {
        lat: Number(p.latitude),
        lng: Number(p.longitude),
      },
    }))

  const visits = placesToVisit.map((p) => ({
    id: String(p.id),
    name: p.name,
    location: {
      lat: Number(p.latitude),
      lng: Number(p.longitude),
    },
  }))

  const visitDateColors: Record<string, string> = {}

  for (const point of pointsOnly) {
    const pointPlacesToVisit = placesToVisit.filter(
      (place) => place.pointId === point.id && place.visitDate
    )

    const uniqueDatesForPoint = Array.from(
      new Set(
        pointPlacesToVisit.map((place) =>
          new Date(place.visitDate!).toISOString().split('T')[0]
        )
      )
    ).sort()

    const dateColorMapForPoint: Record<string, string> = {}

    uniqueDatesForPoint.forEach((date, index) => {
      dateColorMapForPoint[date] = DATE_COLORS[index % DATE_COLORS.length]
    })

    for (const place of pointPlacesToVisit) {
      const dateKey = new Date(place.visitDate!).toISOString().split('T')[0]
      const color = dateColorMapForPoint[dateKey]

      if (color) {
        visitDateColors[String(place.id)] = color
      }
    }
  }

  return (
    <div className="bg-[#010038] text-white min-w-[364px] gap-[30px] p-[30px] grid base:min-w-[300px] base:h-[1500px] base:grid-rows-5 base:grid-cols-1 535:h-[1000px] 535:grid-rows-3 535:grid-cols-2 986:h-full 986:grid-rows-8 986:grid-cols-3 xl:min-w-[1020px] lg:grid-cols-3 xl:grid-cols-4">
      <Amounts budgetId={budget.id!} genCur={budget.genCurrency} budgetAmount={budget.budgetAmount} budgetCurrency={budget.budgetCurrency} />

      <Expenseschart budgetId={budget.id!} />

      <Setbudgetamount budgetId={budget.id!} budgedCurrency={budget.genCurrency} budgetAmount={budget.budgetAmount} />

      <Allexpenses budgedId={budget.id!} tripId={tripid} />

      <TripBudgetCard pointsArr={pointsOnly} />

      <Currency budgetId={budget.id!} Currency={budget.genCurrency} />

      <div className="h-10 535:hidden"></div>

      <PhoneMap
        cyrclesArr={points}
        addedplacetostay={stays}
        addedplacetovisit={visits}
        visitDateColors={visitDateColors}
      />
    </div>
  )
}

export default page