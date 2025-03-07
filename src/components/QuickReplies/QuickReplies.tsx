import { useChat } from "@/context/ChatContext";
import React from "react";
import { CommonButton } from "@/components/CommonButton/CommonButton";
import { useShowContinue } from "@/hooks/useShowContinue";

export function QuickReplies({
  messageIndex,
  options,
}: {
  messageIndex?: number;
  options: string[];
}) {
  const { resume } = useChat();
  const { setShowContinue } = useShowContinue(false);
  return (
    <div>
      {options.map((option) => (
        <CommonButton
          rippleColor="rgba(0, 0, 0, 0.34)"
          key={option}
          styleOverride={{
            backgroundColor: "#ffffff",
            color: "#0088FF",
          }}
          type="button"
          onClick={() => {
            setShowContinue(false);
            resume(messageIndex);
          }}
        >
          {option}
        </CommonButton>
      ))}
    </div>
  );
}
