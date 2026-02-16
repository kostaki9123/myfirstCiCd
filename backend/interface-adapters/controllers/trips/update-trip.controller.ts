import { z } from "zod";
import { InputParseError } from "../../../entities/errors/common";
import { updateTripUseCase } from "../../../application/use-cases/trip/update-trip.use-case";

// Validation schema for updating trip
const inputSchema = z.object({
  userId: z.string(),
  tripId: z.string(),
  tripName: z.string().min(3).max(31),
  tripBudget: z.enum(["Economy traveler", "Balanced traveler", "Luxury traveler"]),
  travelingWith: z.enum(["Solo", "Friends", "Couple", "Family", "Group"]),
  tripTypes: z.array(z.string()).min(1).max(3),
});

export const updateTripController = async (
  input: Partial<z.infer<typeof inputSchema>>
): Promise<ReturnType<typeof updateTripUseCase>> => {
  // Input validation
  const { data, error: inputParseError } = inputSchema.safeParse(input);
  console.log("update trip controller");

  if (inputParseError) {
    throw new InputParseError("Invalid data", { cause: inputParseError });
  }

  // Call the use case with validated data
  return await updateTripUseCase(data);
};
