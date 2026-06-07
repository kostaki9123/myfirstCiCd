"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import GooglePlaceAutocomplete from "./GooglePlaceAutocomplete";

/* ---------- TYPES ---------- */

type PlaceFormData = {
  place_id: string;
  name: string;
  PhotoUrl: string;
  affiliate_url: string;
  source: string;

  latitude: string;
  longitude: string;
  compound_code: string;
  LocationComments: string;

  Priceperday: string;

  placebudget: string;
  Placewith: string[];
  placetype: string[];

  TypeOflodgindOrPlace: string;
  AccomodationOrPlace: string;

  Rating: string;
  AvarageTime: string;
  OpenHours: string;
  description: string;

  Reccomended: boolean;
  MustSee: boolean;
  HiddenSpot: boolean;
};

type Props = {
  initialData?: Partial<PlaceFormData>;
  onSubmit: (data: any) => void;
};

/* ---------- DEFAULT ---------- */

const defaultForm: PlaceFormData = {
  place_id: "",
  name: "",
  PhotoUrl: "",
  affiliate_url: "",
  source: "GetYourGuide",

  latitude: "",
  longitude: "",
  compound_code: "Stockholm",
  LocationComments: "",

  Priceperday: "",

  placebudget: "",
  Placewith: [],
  placetype: [],

  TypeOflodgindOrPlace: "",
  AccomodationOrPlace: "PLACE_TO_VISIT",

  Rating: "",
  AvarageTime: "",
  OpenHours: "",
  description: "",

  Reccomended: false,
  MustSee: false,
  HiddenSpot: false,
};

/* ---------- FIELD ---------- */

function Field({
  label,
  name,
  type = "text",
  textarea,
  value,
  onChange,
  
}: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-400">{label}</label>

      {textarea ? (
        <textarea
          name={name}
          value={value || ""}
          onChange={onChange}
          className="p-2 rounded bg-gray-800 text-white min-h-[100px]"
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value || ""}
          onChange={onChange}
          className="p-2 rounded bg-gray-800 text-white"
        />
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  value,
  onChange,
}: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-400">{label}</label>

      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className="p-2 rounded bg-gray-800 text-white outline-none"
      >
        <option value="">Select option</option>
        {options.map((o: string) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ---------- MAIN FORM ---------- */

export default function PlaceForm({
  initialData = {},
  onSubmit,
}: Props) {
  const [form, setForm] = useState<PlaceFormData>(defaultForm);
  const [placeWithText, setPlaceWithText] = useState("");
  const [placetype, setPlaceType] = useState("");

  /* ---------- INIT ---------- */

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      ...initialData,
    }));

    setPlaceWithText(
      (initialData.Placewith || []).join(", ")
    );

    setPlaceType(
      (initialData.placetype || []).join(", ")
    );
  }, [initialData]);

  /* ---------- INPUT CHANGE ---------- */

  function handleChange(e: any) {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? e.target.checked : value,
    }));
  }

  /* ---------- GOOGLE PLACE SELECT ---------- */

  function handleGooglePlaceSelect(
    place: google.maps.places.PlaceResult
  ) {
    setForm((prev) => ({
      ...prev,

      place_id: place.place_id || "",
      name: place.name || "",

      latitude:
        place.geometry?.location?.lat()?.toString() || "",

      longitude:
        place.geometry?.location?.lng()?.toString() || "",

      Rating: place.rating?.toString() || "",

      OpenHours:
        place.opening_hours?.weekday_text?.join("\n") ||
        "",

      LocationComments:
        place.formatted_address || "",
    }));

    if (place.photos?.length) {
      setForm((prev) => ({
        ...prev,
        PhotoUrl: place.photos![0].getUrl(),
      }));
    }
  }

  /* ---------- SUBMIT ---------- */

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      ...form,

      Placewith: placeWithText
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),

      placeType: placetype
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),

      latitude: form.latitude
        ? Number(form.latitude)
        : null,

      longitude: form.longitude
        ? Number(form.longitude)
        : null,

      Priceperday: form.Priceperday
        ? Number(form.Priceperday)
        : null,

      Rating: form.Rating
        ? Number(form.Rating)
        : null,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 text-white"
    >
      {/* ---------- GOOGLE SEARCH ---------- */}
      <GooglePlaceAutocomplete
        onSelect={handleGooglePlaceSelect}
      />

      {/* ---------- BASIC ---------- */}
      <Section title="Basic Info">
        <Field
          label="Place ID"
          name="place_id"
          value={form.place_id}
          onChange={handleChange}
        />
        <Field
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <Field
          label="Photo URL"
          name="PhotoUrl"
          value={form.PhotoUrl}
          onChange={handleChange}
        />
        <Field
          label="Affiliate URL"
          name="affiliate_url"
          value={form.affiliate_url}
          onChange={handleChange}
        />
        <Field
          label="Source"
          name="source"
          value={form.source}
          onChange={handleChange}
        />
      </Section>

      {/* ---------- LOCATION ---------- */}
      <Section title="Location">
        <Field
          label="Latitude"
          name="latitude"
          type="number"
          value={form.latitude}
          onChange={handleChange}
        />
        <Field
          label="Longitude"
          name="longitude"
          type="number"
          value={form.longitude}
          onChange={handleChange}
        />
        <Field
          label="Compound Code"
          name="compound_code"
          value={form.compound_code}
          onChange={handleChange}
        />
        <Field
          label="Location Comments"
          name="LocationComments"
          value={form.LocationComments}
          onChange={handleChange}
        />
      </Section>

      {/* ---------- PRICING ---------- */}
      <Section title="Pricing">
        <Field
          label="Price Per Day"
          name="Priceperday"
          type="number"
          value={form.Priceperday}
          onChange={handleChange}
        />
      </Section>

      {/* ---------- TYPES ---------- */}
      <Section title="Types">
         <SelectField
          label="Place Budget"
          name="placebudget"
          value={form.placebudget}
          onChange={handleChange}
          options={["Economy traveler", "Balanced traveler", "Luxury traveler"]}
        />
        <div className="flex flex-col">
          <Label className="text-gray-400 text-sm">
            Travel with
          </Label>
          <input
            value={placeWithText}
            onChange={(e) =>
              setPlaceWithText(e.target.value)
            }
            className="bg-gray-800 p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <Label className="text-gray-400 text-sm">
            Travel Types
          </Label>
          <input
            value={placetype}
            onChange={(e) =>
              setPlaceType(e.target.value)
            }
            className="bg-gray-800 p-2 rounded"
          />
        </div>
      </Section>


     <Section title="Type">
        <Field label="Type of Lodging or Place" name="TypeOflodgindOrPlace" value={form.TypeOflodgindOrPlace} onChange={handleChange} />
        <Field label="Accommodation Or Place" name="AccomodationOrPlace" value={form.AccomodationOrPlace} onChange={handleChange} />
     </Section>

      {/* ---------- META ---------- */}
      <Section title="Meta">
        <Field
          label="Rating"
          name="Rating"
          type="number"
          value={form.Rating}
          onChange={handleChange}
        />
        <Field
          label="Average Time"
          name="AvarageTime"
          value={form.AvarageTime}
          onChange={handleChange}
        />
        <Field
          label="Open Hours"
          name="OpenHours"
          value={form.OpenHours}
          onChange={handleChange}
        />
        <Field
          label="Description"
          name="description"
          textarea
          value={form.description}
          onChange={handleChange}
        />
      </Section>

      {/* ---------- FLAGS ---------- */}
      <Section title="Flags">
        <label>
          <input
            type="checkbox"
            checked={form.Reccomended}
            onChange={handleChange}
            name="Reccomended"
          />
          Recommended
        </label>

        <label>
          <input
            type="checkbox"
            checked={form.MustSee}
            onChange={handleChange}
            name="MustSee"
          />
          Must See
        </label>

        <label>
          <input
            type="checkbox"
            checked={form.HiddenSpot}
            onChange={handleChange}
            name="HiddenSpot"
          />
          Hidden Spot
        </label>
      </Section>

      <button className="bg-green-600 px-6 py-2 rounded hover:bg-green-500">
        Save Place
      </button>
    </form>
  );
}

/* ---------- SECTION ---------- */

function Section({ title, children }: any) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <h2 className="text-sm font-semibold text-gray-300 mb-3">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {children}
      </div>
    </div>
  );
}