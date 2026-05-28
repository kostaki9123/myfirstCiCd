'use client';

import { useEffect, useRef } from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fromItinerary?: boolean;
};

const CreateTripNotesBox = ({
  value,
  onChange,
  placeholder = 'Add notes here...',
  fromItinerary = false,
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* --------------------------------------------------
     Auto resize textarea
  -------------------------------------------------- */
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + 'px';
  }, [value]);

  return (
    <div className="w-full  bg-transparent">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, 200))}
        maxLength={200}
        placeholder={placeholder}
        className={`
          w-full min-h-[40px]  p-2
          ${fromItinerary ? 'rounded-lg' : 'rounded'}
          className="
           w-full min-h-[40px] p-2
           text-sm
           text-white placeholder:text-white/50 bg-transparent border border-white  focus:outline-none focus:ring-1 focus:ring-white resize-none overflow-hidden transition-all shadow-sm
"
        `}
      />

      <div className="text-[10px] text-right text-gray-400 mt-1">
        {value.length}/200
      </div>
    </div>
  );
};

export default CreateTripNotesBox;
