"use client";

import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { z } from "zod";
import { deletePlace } from "../action";
// import { deletePlace } from "../action"; // adjust path if needed

const deleteSchema = z.object({
  pointId: z.string().min(1, "Invalid point ID"),
  placeId: z.string().min(1, "Invalid place ID"),
});

type Props = {
  placeId: string;
  pointId: string;
};

const Deleteplacebtn = ({ placeId, pointId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onDelete = async () => {
    
    const validation = deleteSchema.safeParse({ pointId, placeId });
    if (!validation.success) {
      setErrorMessage(validation.error.errors[0]?.message ?? "Invalid data");
      return;
    }
   
    try {
      setIsLoading(true);
      setErrorMessage("");

     await deletePlace(pointId, placeId);

      console.log("✅ Place deleted successfully");
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to delete place");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-1 top-3 right-2 absolute">
      <button
        onClick={onDelete}
        disabled={isLoading}
        className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white transition p-2 rounded-full disabled:opacity-50"
        aria-label="Delete place"
      >
        <MdDelete size={20} className={isLoading ? "animate-spin" : ""} />
      </button>

      {errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default Deleteplacebtn;
