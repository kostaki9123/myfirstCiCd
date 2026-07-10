import React from 'react'
import Mapprovider from '@/app/component/map/map-provider'
import Tripboard from './components/tripboard'
import Tripboardphone from './components/tripboardphone'
import { getPoints } from './action'
import { getPlaces } from '../../itinerary/[tripid]/action'
import PhoneMap from '../../itinerary/[tripid]/components/phonemap'
import ContinueOnboarding from './components/continueOnboarding'

interface PageProps {
  params: Promise<{ tripid: string }>
}

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

const Page = async ({ params }: PageProps) => {
  const { tripid } = await params

  const points = await getPoints(tripid)

  const pointsOnly = points.filter((p) => p.role === 'POINT')

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
    <div className="absolute bottom-0 left-0 right-0 top-0 flex min-h-[490px] flex-col bg-[#010038]">
      <ContinueOnboarding/>
      <div className="hidden h-[45%] xxs:block">
        <Tripboard tripId={tripid} cyrclesArr={points} />
      </div>

      

      <div className="hidden h-[55%] w-full xxs:block">
        <Mapprovider cyrclesArr={points} allPlaces={allPlaces} />
      </div>

      <div className="block h-[43%] xxs:hidden">
        <Tripboardphone tripId={tripid} cyrclesArr={points} />
        <div className="h-20" />
      </div>

      <PhoneMap
        cyrclesArr={points}
        addedplacetostay={stays}
        addedplacetovisit={visits}
        visitDateColors={visitDateColors}
      />
    </div>
  )
}

export default Page