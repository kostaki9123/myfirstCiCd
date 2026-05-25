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
        <div className="   border border-red-400/40 bg-transparent text-red-300 hover:bg-red-500/10 hover:border-red-400/60 active:scale-[0.98] px-4 py-2 rounded-xl font-medium transition-all duration-200  cursor-pointer">
          Delete
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-3/4 674:w-full  bg-[#07124F]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white/90">Confirm delete</AlertDialogTitle>
          <AlertDialogDescription className="text-white/70">
            Are you sure you want to delete this trip?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isLoading}
            className="
              h-10 px-4 rounded-xl font-medium text-sm bg-transparent
              border border-white/10 text-white/55 hover:text-white/85 hover:bg-white/5   transition-all duration-200   active:scale-[0.98]
              "
           >
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
              className="w-full border border-red-400/40 bg-transparent text-red-300 hover:bg-red-500/10 hover:border-red-400/60"
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