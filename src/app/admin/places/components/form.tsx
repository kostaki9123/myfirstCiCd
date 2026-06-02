"use client";

import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

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

/* ---------- DEFAULT FORM ---------- */

const defaultForm: PlaceFormData = {
  place_id: "",
  name: "",
  PhotoUrl: "",
  affiliate_url: "",
  source: "",

  latitude: "",
  longitude: "",
  compound_code: "",
  LocationComments: "",

  Priceperday: "",

  placebudget: "",
  Placewith: [],
  placetype: [],

  TypeOflodgindOrPlace: "",
  AccomodationOrPlace: "",

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
          className="p-2 rounded bg-gray-800 text-white outline-none min-h-[100px]"
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value || ""}
          onChange={onChange}
          className="p-2 rounded bg-gray-800 text-white outline-none"
        />
      )}
    </div>
  );
}

/* ---------- SELECT ---------- */

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

/* ---------- CHECKBOX ---------- */

function Checkbox({
  label,
  name,
  checked,
  onChange,
}: any) {
  return (
    <label className="flex items-center gap-2 text-sm text-white">
      <input
        type="checkbox"
        name={name}
        checked={!!checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}

/* ---------- MAIN COMPONENT ---------- */

export default function PlaceForm({
  initialData = {},
  onSubmit,
}: Props) {
  const [placeWithText, setPlaceWithText] = useState("");
  const [placetype, setPlaceType] = useState("");   // ✅ change
  const [form, setForm] = useState<PlaceFormData>(defaultForm);

  useEffect(() => {
  if (!initialData) return;

  setForm((prev) => ({
    ...prev,
    ...initialData,
  }));

setPlaceWithText((initialData.Placewith || []).join(", "));
setPlaceType((initialData.placetype || []).join(", "));  // ✅ change
}, [initialData]);

  function handleChange(e: any) {
    const { name, value, type } = e.target;

    const checked =
      type === "checkbox"
        ? e.target.checked
        : undefined;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log('form:',form)
    console.log('place tyoe:',placeWithText)

    onSubmit({
  ...form,

  Placewith: placeWithText
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean),

  placetype: placetype
  .split(",")
  .map((v) => v.trim())
  .filter(Boolean),

  latitude: form.latitude ? Number(form.latitude) : null,
  longitude: form.longitude ? Number(form.longitude) : null,
  Priceperday: form.Priceperday ? Number(form.Priceperday) : null,
  Rating: form.Rating ? Number(form.Rating) : null,
});


  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white">

      <Section title="Basic Info">
        <Field label="Place ID" name="place_id" value={form.place_id} onChange={handleChange} />
        <Field label="Name" name="name" value={form.name} onChange={handleChange} />
        <Field label="Photo URL" name="PhotoUrl" value={form.PhotoUrl} onChange={handleChange} />
        <Field label="Affiliate URL" name="affiliate_url" value={form.affiliate_url} onChange={handleChange} />
        <Field label="Source" name="source" value={form.source} onChange={handleChange} />
      </Section>

      <Section title="Location">
        <Field label="Latitude" name="latitude" type="number" value={form.latitude} onChange={handleChange} />
        <Field label="Longitude" name="longitude" type="number" value={form.longitude} onChange={handleChange} />
        <Field label="Compound Code" name="compound_code" value={form.compound_code} onChange={handleChange} />
        <Field label="Location Comments" name="LocationComments" value={form.LocationComments} onChange={handleChange} />
      </Section>

      <Section title="Pricing">
        <Field label="Price Per Day" name="Priceperday" type="number" value={form.Priceperday} onChange={handleChange} />
      </Section>

      <Section title="Types">
        <SelectField
          label="Place Budget"
          name="placebudget"
          value={form.placebudget}
          onChange={handleChange}
          options={["Economy traveler", "Balanced traveler", "Luxury traveler"]}
        />
        <div className="flex flex-col">
            <Label className=" text-gray-400 text-sm">Travel with</Label>
           <input
             value={placeWithText}
             onChange={(e) => setPlaceWithText(e.target.value)}
             className="bg-gray-800 "
           />
        </div>
        <div  className="flex flex-col">    
             <Label  className=" text-gray-400 text-sm">Travel Types</Label> 
           <input
             value={placetype}
             onChange={(e) => setPlaceType(e.target.value)}   // ✅ change
             className="bg-gray-800"
           />
       </div>

        </Section>

      <Section title="Type">
        <Field label="Type of Lodging or Place" name="TypeOflodgindOrPlace" value={form.TypeOflodgindOrPlace} onChange={handleChange} />
        <Field label="Accommodation Or Place" name="AccomodationOrPlace" value={form.AccomodationOrPlace} onChange={handleChange} />
      </Section>

      <Section title="Meta">
        <Field label="Rating" name="Rating" type="number" value={form.Rating} onChange={handleChange} />
        <Field label="Average Time" name="AvarageTime" value={form.AvarageTime} onChange={handleChange} />
        <Field label="Open Hours" name="OpenHours" value={form.OpenHours} onChange={handleChange} />
        <Field label="Description" name="description" textarea value={form.description} onChange={handleChange} />
      </Section>


      <Section title="Flags">
        <Checkbox label="Recommended" name="Reccomended" checked={form.Reccomended} onChange={handleChange} />
        <Checkbox label="Must See" name="MustSee" checked={form.MustSee} onChange={handleChange} />
        <Checkbox label="Hidden Spot" name="HiddenSpot" checked={form.HiddenSpot} onChange={handleChange} />
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
      <h2 className="text-sm font-semibold text-gray-300 mb-3">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}