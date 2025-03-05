// src/components/QuickReplies/QuickReplies.tsx
import React from "react";

export const QuickReplies = ({
  options,
  onSelect,
}: {
  options: string[];
  onSelect?: (option: string) => void;
}) => {
  return (
    <div>
      {options.map((option) => (
        <button
          key={option}
          style={{ padding: "8px 12px", borderRadius: "4px" }}
          type="button"
          onClick={() => onSelect?.(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};