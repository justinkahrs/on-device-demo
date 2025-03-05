import { useChat } from "@/context/ChatContext";
import React from "react";

export function QuickReplies({ options }: { options: string[] }) {
  const { resume } = useChat();
  return (
    <div>
      {options.map((option) => (
        <button
          key={option}
          style={{ padding: "8px 12px", borderRadius: "4px" }}
          type="button"
          onClick={resume}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
