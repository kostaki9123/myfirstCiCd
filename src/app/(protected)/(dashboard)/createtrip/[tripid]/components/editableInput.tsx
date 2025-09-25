import React, { useState } from "react";
import { Input } from "@/components/ui/input";

type EditableTextProps = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  divType: 'Title' | 'description'
};

const EditableText: React.FC<EditableTextProps> = ({ value, onChange, placeholder, divType }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <Input
          className="w-[90%]"
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setIsEditing(false);
          }}
        />
      ) : (
        <div
          className=" w-[90%] text-lg font-medium text-gray-800 cursor-pointer hover:bg-gray-100 px-1 rounded"
          onClick={() => setIsEditing(true)}
        >
           {divType === 'Title' ? <h2>{value}</h2> : <div className=" text-sm" >{value}</div>}
        </div>
      )}
    </div>
  );
};

export default EditableText;
