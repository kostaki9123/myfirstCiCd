"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteTrip } from "../(protected)/action";

type Props = {
  tripId: string;
};

const DeleteAlertDialog = ({ tripId }: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    try {
      await deleteTrip(tripId);
      return true;
    } catch (err) {
      if (err instanceof Error && err.name === "DatabaseOperationError") {
        console.error("Database error while deleting trip");
      } else {
        console.error("Unexpected error:", err);
      }
      return false;
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className="px-4 py-2 text-[#f87171] border border-[#f87171] rounded-lg hover:bg-[#f87171] hover:text-white transition cursor-pointer">
          Delete
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-3/4 674:w-full">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm delete</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this trip?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            Cancel
          </AlertDialogCancel>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);

              try {
                const success = await handleDelete();

                if (success) {
                  setOpen(false); // ✅ close modal after delete
                }
              } finally {
                setIsLoading(false);
              }
            }}
          >
            <AlertDialogAction
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;