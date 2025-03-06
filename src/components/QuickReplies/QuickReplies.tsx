import { useChat } from "@/context/ChatContext";
import React from "react";

export function QuickReplies({
  messageIndex,
  options,
}: {
  messageIndex?: number;
  options: string[];
}) {
  const { resume } = useChat();
  return (
    <div>
      {options.map((option) => (
        <button
          key={option}
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            padding: "8px 20px",
            marginTop: "6px",
            textAlign: "center",
            borderRadius: "20px",
            width: "100%",
          }}
          type="button"
          onClick={() => resume(messageIndex)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
