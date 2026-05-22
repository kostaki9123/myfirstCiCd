"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHotel } from "react-icons/fa";


export default function PlacesListPage() {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [compoundFilter, setCompoundFilter] = useState("");

  const router = useRouter();

  // FETCH ALL PLACES
  async function fetchPlaces() {
    setLoading(true);

    const res = await fetch("/api/links");
    const data = await res.json();

    setPlaces(data);
    setLoading(false);
  }

  useEffect(() => {
   
    fetchPlaces();
  }, []);
   const compoundCodes = Array.from(
  new Set(
    places
      .map((p) => p.compound_code)
      .filter(Boolean)
  )
);

  // DELETE PLACE
  async function deletePlace(place_id: string) {
    if (!confirm("Are you sure you want to delete this place?")) return;

    await fetch(`/api/links/${place_id}`, {
      method: "DELETE",
    });

    fetchPlaces();
  }

  // FILTER SEARCH
const filtered = places.filter((p) => {
  const matchesSearch =
    (p.name || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (p.place_id || "")
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesCompound =
    !compoundFilter ||
    p.compound_code === compoundFilter;

  return matchesSearch && matchesCompound;
});

  return (
    <div className="p-6 mt-20 text-white max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Places Admin</h1>
          <p className="text-gray-400 text-sm">
            Manage all places in your database
          </p>
        </div>

        <Link
          href="/admin/places/new"
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-500"
        >
          + New Place
        </Link>
      </div>

      {/* SEARCH */}
     {/* SEARCH + FILTER */}
<div className="mb-4 flex gap-3">

  <input
    className="w-full p-2 bg-gray-800 text-white rounded outline-none"
    placeholder="Search by name or place_id..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    value={compoundFilter}
    onChange={(e) => setCompoundFilter(e.target.value)}
    className="p-2 bg-gray-800 text-white rounded outline-none min-w-[220px]"
  >
    <option value="">All compound_code</option>

    {compoundCodes.map((code) => (
      <option key={code} value={code}>
        {code}
      </option>
    ))}
  </select>

</div>

      {/* TABLE */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">

        {loading ? (
          <div className="p-6 text-gray-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-6 text-gray-400">No places found</div>
        ) : (
          <table className="w-full text-sm">

            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">place_id</th>
                <th className="p-3 text-left">Rating</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Flags</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p,index) => (
                <tr
                  key={p.place_id}
                  className="border-t border-gray-800 hover:bg-gray-800/50"
                >

                  {/* NAME */}
                  <td className="p-3 font-medium flex">
                   {index + 1}. {p.name}{p.AccomodationOrPlace === "ACCOMMODATION" && <FaHotel className=" pt-1 pl-1 w-4 h-4" />}
                  </td>

                  {/* PLACE ID */}
                  <td className="p-3 text-xs text-gray-400 font-mono max-w-[150px] overflow-hidden">
                    {p.place_id}
                  </td>

                  {/* RATING */}
                  <td className="p-3">
                    {p.Rating ?? "-"}
                  </td>

                  {/* TYPE */}
                  <td className="p-3">
                    {p.placetype ?? "-"}
                  </td>

                  {/* FLAGS */}
                  <td className="p-3 text-xs space-x-2">
                    {p.Reccomended && (
                      <span className="text-green-400">Recommended</span>
                    )}
                    {p.MustSee && (
                      <span className="text-yellow-400">Must See</span>
                    )}
                    {p.HiddenSpot && (
                      <span className="text-red-400">Hidden</span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 text-right space-x-2">

                    <Link
                      href={`/admin/places/${p.place_id}`}
                      className="bg-blue-600 px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deletePlace(p.place_id)}
                      className="bg-red-600 px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>
    </div>
  );
}