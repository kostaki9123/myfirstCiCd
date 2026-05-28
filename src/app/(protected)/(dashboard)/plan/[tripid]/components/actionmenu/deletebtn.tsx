"use client";

import { useState } from "react";
import { z, ZodError } from "zod";
import { InputParseError } from "../../../../../../../../backend/entities/errors/common";
import { deletePoint } from "../../action";

// --------------------
// ✅ Zod Schema
// --------------------
const deleteSchema = z.object({
  pointId: z.string().min(1, "Invalid point ID"),
});

// --------------------
// ✅ Props
// --------------------
type Props = {
  pointId: string;
  tripId: string
};

// --------------------
// ✅ Component
// --------------------
const Deletebtn = ({ pointId,tripId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onDelete = async () => {
    try {
      const validation = deleteSchema.safeParse({ pointId });
      if (!validation.success) {
        setErrorMessage(validation.error.errors[0]?.message ?? "Invalid data");
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      const formData = new FormData();
      formData.append("pointId", pointId);

      await deletePoint(pointId,tripId);

    } catch (err) {
      if (err instanceof InputParseError && err.cause instanceof ZodError) {
        setErrorMessage(
          err.cause.flatten().formErrors?.[0] ?? "Input parsing failed"
        );
      } else {
        setErrorMessage("Unexpected error occurred while deleting");
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button className="flex flex-col items-start justify-center px-3 absolute top-0 left-0 right-0 bottom-0 " 
        disabled={isLoading}
        onClick={onDelete}
     >
        {isLoading ? "Deleting..." : "Delete point"}
    
    </button>
  );
};

export default Deletebtn;
