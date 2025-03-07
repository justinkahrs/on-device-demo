import type React from "react";
import styles from "./Message.module.css";
import classNames from "classnames";
import { useShowContinue } from "../../hooks/useShowContinue";

export interface RCSMessageEvent {
  from: "guest" | "bot" | "owner";
  text?: string;
  component?: React.ReactNode;
  awaitUser?: boolean;
}
interface MessageProps {
  from: "guest" | "bot" | "owner";
  children: React.ReactNode;
  className?: string;
  messageIndex: number;
  isLatestBotMessage?: boolean;
}

export function Message({
  className = "txt",
  from,
  children,
  isLatestBotMessage,
}: MessageProps) {
  const isGuest = from === "guest";
  const { setShowContinue, showContinue } = useShowContinue(
    from === "bot" && !!isLatestBotMessage
  );

  const handleButtonClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowContinue(false);
  };
  return (
    <div
      className={isGuest ? styles.myMessage : styles.theirMessage}
      style={{
        display: "flex",
        justifyContent: isGuest ? "flex-end" : "space-between",
      }}
    >
      <div
        onClick={handleButtonClick}
        onKeyDown={handleButtonClick}
        className={classNames(styles.bubble, styles.messageAppear, className)}
      >
        {children}
      </div>
      {from === "bot" && showContinue && (
        <div
          className={styles.continueText}
          style={{ alignContent: "center", textAlign: "center" }}
        >
          … or tap to continue
        </div>
      )}
    </div>
  );
}

interface TypingIndicatorProps {
  from: "guest" | "bot" | "owner";
}

export function TypingIndicator({ from }: TypingIndicatorProps) {
  const isGuest = from === "guest";
  return (
    <div className={isGuest ? styles.myMessage : styles.theirMessage}>
      <div className={`${styles.bubble} ${styles.messageAppear}`}>
        <span className={styles.typingDots}>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </div>
    </div>
  );
}
