"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PlaceForm from "../components/form";
import { use } from "react";

export default function EditPlacePage({
  params,
}: {
  params: Promise<{ place_id: string }>;
})  {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

   const { place_id } = use(params);

  // FETCH PLACE
  async function fetchPlace() {
    setLoading(true);

    const res = await fetch(`/api/links/${place_id}`);
    const json = await res.json();

    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    fetchPlace();
  }, []);

  // UPDATE PLACE
  async function updatePlace(formData: any) {
    await fetch(`/api/links/${place_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

  
  }

  if (loading) {
    return (
      <div className="p-6 mt-20 text-white">
        Loading place...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 mt-20 text-red-400">
        Place not found
      </div>
    );
  }

  return (
    <div className="p-6 mt-20 text-white max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4">
        Edit Place: {data.name}
      </h1>

      <PlaceForm
        initialData={data}
        onSubmit={updatePlace}
      />
    </div>
  );
}