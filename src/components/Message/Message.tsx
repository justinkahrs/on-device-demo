import type React from "react";
import styles from "./Message.module.css";
import classNames from "classnames";

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
}

export function Message({ className = "txt", from, children }: MessageProps) {
  const isGuest = from === "guest";
  return (
    <div className={isGuest ? styles.myMessage : styles.theirMessage}>
      <div
        className={classNames(styles.bubble, styles.messageAppear, className)}
      >
        {children}
      </div>
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
