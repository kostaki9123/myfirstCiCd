'use client'

import { useState, useEffect, useRef } from "react";
import { FaNoteSticky } from "react-icons/fa6";

type Props = {
  id: string;
  defaultNotes?: string;
  showLabel?: boolean;
  fromItinerary?: boolean;
  placeholder?: string
};

const NotesBox = ({
  id,
  defaultNotes = "",
  showLabel = true,
  fromItinerary = false,
  placeholder = ''
}: Props) => {
  const [notes, setNotes] = useState("");
  const [mode, setMode] = useState<"hidden" | "edit" | "view">("hidden");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load saved or defaults
  useEffect(() => {
    const saved = localStorage.getItem(id);

    if (saved && saved.length > 0) {
      setNotes(saved);
      setMode("view");
    } else if (defaultNotes.length > 0) {
      setNotes(defaultNotes);
      setMode("view");
    }
  }, [id, defaultNotes]);

  // Auto resize
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }, [notes]);

  // Save changes
  const handleSave = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, 200);
    setNotes(value);
    localStorage.setItem(id, value);
  };

  // Click outside logic
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current) return;

      const clickedOutside = !wrapperRef.current.contains(e.target as Node);

      if (clickedOutside && mode === "edit") {
        if (notes === "") {
          setMode("hidden");
        } else {
          setMode("view");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mode, notes]);

  return (
    <div
      ref={wrapperRef}
      className={`${fromItinerary ? "" : "mt-2"} w-full`}
    >
      {/* ---- BUTTON MODE ---- */}
      {mode === "hidden" && (
        <button
          onClick={() => setMode("edit")}
          className="
            flex items-center justify-center gap-2 
            w-full max-w-[202px] 
            bg-white 
            border 
            rounded-lg 
            py-2 
            text-[14px]
            text-gray-700
            hover:bg-gray-100 
            active:scale-95 
            transition 
            shadow-sm
          "
        >
          <FaNoteSticky className="text-lg text-blue-600" />
          Add notes
        </button>
      )}

      {/* ---- PREVIEW MODE ---- */}
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
              bg-[#f5f7fa] 
              border 
              border-gray-300 
              rounded 
              p-2 
              text-[14px] 
              text-gray-700 
              whitespace-pre-wrap
              shadow-sm
              hover:bg-gray-200
              transition
              cursor-pointer
            "
          >
            {notes}
          </div>
        </>
      )}

      {/* ---- EDIT MODE ---- */}
      {mode === "edit" && (
        <>
          {showLabel && (
            <label className="text-[9px] font-semibold text-gray-400 uppercase">
              Notes
            </label>
          )}

          <textarea
            ref={textareaRef}
            maxLength={200}
            value={notes}
            onChange={handleSave}
            placeholder={placeholder ? placeholder : 'Add notes here...'}
            className={`
              w-full 
              min-h-[18px]
              max-h-[200px]
              p-2
              ${fromItinerary ? 'rounded-lg' : 'rounded'}
              bg-[#f5f7fa]
              text-[14px]
              text-gray-800
              border
              border-gray-300
              focus:border-blue-500 
              focus:ring-1 
              focus:ring-blue-500
              outline-none
              resize-none
              overflow-hidden
              transition-all
              shadow-sm
              mt-1
            `}
          />

          <div className="text-[8px] text-right text-gray-400 mt-1">
            {notes.length}/200
          </div>
        </>
      )}
    </div>
  );
};

export default NotesBox;
