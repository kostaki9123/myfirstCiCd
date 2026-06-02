"use client";

import { APIProvider } from "@vis.gl/react-google-maps";
import PlaceForm from "../components/createform";



export default function NewPlacePage() {

  async function createPlace(formData: any) {
    const res = await fetch("/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      console.error("Failed to create place");
      return;
    }
  }

  return (
    <div className="p-6 mt-20 text-white max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4">
        Create New Place
      </h1>

    <APIProvider
              apiKey={
                process.env.NEXT_PUBLIC_GOOGLE_MAP_API!
              }
            >
      <PlaceForm
        initialData={{}}
        onSubmit={createPlace}
      />
    </APIProvider>
      
    </div>
  );
}