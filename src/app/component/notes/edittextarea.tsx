'use client';

import { useState, useEffect, useRef } from "react";
import { FaNoteSticky } from "react-icons/fa6";

type Props = {
  id: string;
  defaultNotes?: string;        // notes from backend
  userLoggedIn?: boolean;       // auth state
  showLabel?: boolean;
  fromItinerary?: boolean;
  placeholder?: string;
};

const NotesBox = ({
  id,
  defaultNotes = "",
  userLoggedIn = true,         // always online in your app
  showLabel = true,
  fromItinerary = false,
  placeholder = "Add notes here...",
}: Props) => {
  const [notes, setNotes] = useState("");
  const [mode, setMode] = useState<"hidden" | "edit" | "view">("hidden");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // --------------------------------------------------
  // LOAD NOTES (backend wins)
  // --------------------------------------------------
  useEffect(() => {
    if (userLoggedIn && defaultNotes.trim().length > 0) {
      setNotes(defaultNotes);
      setMode("view");
      localStorage.setItem(id, defaultNotes); // optional cache
    } else {
      const local = localStorage.getItem(id);
      if (local && local.length > 0) {
        setNotes(local);
        setMode("view");
      }
    }
  }, [id, defaultNotes, userLoggedIn]);

  // --------------------------------------------------
  // AUTO RESIZE TEXTAREA
  // --------------------------------------------------
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }, [notes]);

  // --------------------------------------------------
  // AUTO SAVE (debounced) with formatting
  // --------------------------------------------------
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Save locally
      localStorage.setItem(id, notes);

      if (userLoggedIn && notes.trim().length > 0) {
        // Format notes before sending to backend
        const formData = new FormData();
          formData.append("id",  `${id}`);
          formData.append("notes", `${notes}`);
       //   updateNotes(formData);
      }
    }, 500); // debounce

    return () => clearTimeout(timeout);
  }, [notes, id, userLoggedIn]);

  // --------------------------------------------------
  // HANDLE CHANGE (UI only)
  // --------------------------------------------------
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value.slice(0, 200));
  };

  // --------------------------------------------------
  // CLICK OUTSIDE TO CLOSE
  // --------------------------------------------------
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        if (mode === "edit") {
          setMode(notes ? "view" : "hidden");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mode, notes]);

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------
  return (
    <div ref={wrapperRef} className={`${fromItinerary ? "" : "mt-2"} w-full`}>
      {/* -------- BUTTON MODE -------- */}
      {mode === "hidden" && (
        <button
          onClick={() => setMode("edit")}
          className="
            flex items-center justify-center gap-2
            w-full max-w-[202px]
            bg-white border rounded-lg py-2
            text-[14px] text-gray-700
            hover:bg-gray-100 active:scale-95
            transition shadow-sm
          "
        >
          <FaNoteSticky className="text-lg text-blue-600" />
          Add notes
        </button>
      )}

      {/* -------- VIEW MODE -------- */}
      {mode === "view" && notes.length > 0 && (
        <>
          {showLabel && (
            <label className="text-[9px] font-semibold text-gray-400 uppercase">
              Notes
            </label>
          )}

          <div
            onClick={() => setMode("edit")}
            className="
              bg-[#f5f7fa] border border-gray-300 rounded
              p-2 text-[14px] text-gray-700
              whitespace-pre-wrap shadow-sm
              hover:bg-gray-200 transition cursor-pointer
            "
          >
            {notes}
          </div>
        </>
      )}

      {/* -------- EDIT MODE -------- */}
      {mode === "edit" && (
        <>
          {showLabel && (
            <label className="text-[9px] font-semibold text-gray-400 uppercase">
              Notes
            </label>
          )}

          <textarea
            ref={textareaRef}
            value={notes}
            onChange={handleChange}
            maxLength={200}
            placeholder={placeholder}
            className={`
              w-full min-h-[18px] max-h-[200px] p-2
              ${fromItinerary ? "rounded-lg" : "rounded"}
              bg-[#f5f7fa] text-[14px] text-gray-800
              border border-gray-300
              focus:border-blue-500 focus:ring-1 focus:ring-blue-500
              outline-none resize-none overflow-hidden
              transition-all shadow-sm mt-1
            `}
          />

          <div className="text-[8px] text-right text-gray-400 mt-1">
            Saved to your account · {notes.length}/200
          </div>
        </>
      )}
    </div>
  );
};

export default NotesBox;
