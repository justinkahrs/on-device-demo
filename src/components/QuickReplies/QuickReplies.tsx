import { useChat } from "@/context/ChatContext";
import React from "react";
import { CommonButton } from "@/components/CommonButton/CommonButton";

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
        <CommonButton
          rippleColor="rgba(0, 0, 0, 0.34)"
          key={option}
          styleOverride={{ backgroundColor: "#ffffff" }}
          type="button"
          onClick={() => resume(messageIndex)}
        >
          {option}
        </CommonButton>
      ))}
    </div>
  );
}
