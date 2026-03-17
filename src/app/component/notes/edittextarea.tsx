"use client";

import { useState, useEffect, useRef } from "react";
import { FaNoteSticky } from "react-icons/fa6";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showLabel?: boolean;
  fromItinerary?: boolean;
};

const NotesBox = ({
  value,
  onChange,
  placeholder = "Add notes here...",
  showLabel = true,
  fromItinerary = false,
}: Props) => {
  const [mode, setMode] = useState<"hidden" | "view" | "edit">(
    value ? "view" : "hidden"
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Local state to track textarea characters
  const [clientNotes, setClientNotes] = useState<string>(value);

  /* --------------------------------------------------
     Auto resize textarea
  -------------------------------------------------- */
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }, [clientNotes]);

  /* --------------------------------------------------
     Autofocus when editing, cursor at end
  -------------------------------------------------- */
  useEffect(() => {
    if (mode === "edit" && textareaRef.current) {
      const el = textareaRef.current;
      setTimeout(() => {
        el.focus();
        const length = el.value.length;
        el.setSelectionRange(length, length);
      }, 0);
    }
  }, [mode]);

  /* --------------------------------------------------
     Click outside (AFTER click)
  -------------------------------------------------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        if (mode === "edit") {
          setMode(clientNotes ? "view" : "hidden"); // use clientNotes here
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mode, clientNotes]);

  /* --------------------------------------------------
     Sync parent value if it changes externally
  -------------------------------------------------- */
  useEffect(() => {
    setClientNotes(value);
  }, [value]);

  /* --------------------------------------------------
     Render
  -------------------------------------------------- */
  return (
    <div ref={wrapperRef} className="w-full">
      {/* ---------- ADD BUTTON ---------- */}
      {mode === "hidden" && (
        <button
          onClick={() => setMode("edit")}
          className={`flex items-center justify-center gap-2 w-full ${
            fromItinerary ? "max-w-[202px]" : "max-w-[152px]"
          } bg-white border rounded-lg py-2 text-[14px] text-gray-700 hover:bg-gray-100 active:scale-95 transition shadow-sm`}
        >
          <FaNoteSticky className="text-lg text-blue-600" /> Add notes
        </button>
      )}

      {/* ---------- VIEW MODE ---------- */}
      {mode === "view" && (
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
              p-2 text-sm text-gray-700
              whitespace-pre-wrap shadow-sm
              hover:bg-gray-200 transition cursor-pointer
            "
          >
            {clientNotes}
          </div>
        </>
      )}

      {/* ---------- EDIT MODE ---------- */}
      {mode === "edit" && (
        <>
          {showLabel && (
            <label className="text-[9px] font-semibold text-gray-400 uppercase">
              Notes
            </label>
          )}
          <textarea
            ref={textareaRef}
            value={clientNotes}
            onChange={(e) => {
              const text = e.target.value.slice(0, 200);
              setClientNotes(text);
              onChange(text); // sync with parent
            }}
            maxLength={200}
            placeholder={placeholder}
            className={`
              w-full min-h-[20px] max-h-[200px] p-2
              ${fromItinerary ? "rounded-lg" : "rounded"}
              bg-[#f5f7fa] text-sm text-gray-800
              border border-gray-300
              focus:border-blue-500 focus:ring-1 focus:ring-blue-500
              outline-none resize-none overflow-hidden
              transition-all shadow-sm mt-1
            `}
          />
          <div className="text-[10px] text-right text-gray-400 mt-1">
            {clientNotes.length}/200
          </div>
        </>
      )}
    </div>
  );
};

export default NotesBox;