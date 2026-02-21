import { useChat } from "../../context/ChatContext";
import React from "react";
import { CommonButton } from "../CommonButton/CommonButton";
import { useShowContinue } from "../../hooks/useShowContinue";

export type QuickReplyOption =
  | string
  | {
      label: string;
      value?: string;
    };

export function QuickReplies({
  messageIndex,
  options,
}: {
  messageIndex?: number;
  options: QuickReplyOption[];
}) {
  const { resume } = useChat();
  const { setShowContinue } = useShowContinue(false);

  const normalizedOptions = options.map((option) => {
    if (typeof option === "string") {
      return { label: option, value: option };
    }
    return { label: option.label, value: option.value ?? option.label };
  });

  return (
    <div>
      {normalizedOptions.map((option) => (
        <CommonButton
          rippleColor="rgba(0, 0, 0, 0.34)"
          key={`${option.label}-${option.value}`}
          styleOverride={{
            backgroundColor: "#ffffff",
            color: "#0088FF",
          }}
          type="button"
          onClick={() => {
            setShowContinue(false);
            resume(messageIndex, option.value);
          }}
        >
          {option.label}
        </CommonButton>
      ))}
    </div>
  );
}
