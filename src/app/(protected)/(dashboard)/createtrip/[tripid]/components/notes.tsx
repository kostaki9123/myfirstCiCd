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
    <div className="w-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, 200))}
        maxLength={200}
        placeholder={placeholder}
        className={`
          w-full min-h-[40px]  p-2
          ${fromItinerary ? 'rounded-lg' : 'rounded'}
          bg-[#f5f7fa] text-sm text-gray-800
          border border-gray-300
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          outline-none resize-none overflow-hidden
          transition-all shadow-sm
        `}
      />

      <div className="text-[10px] text-right text-gray-400 mt-1">
        {value.length}/200
      </div>
    </div>
  );
};

export default CreateTripNotesBox;
