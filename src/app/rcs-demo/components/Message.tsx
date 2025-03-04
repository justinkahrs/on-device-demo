"use client";
import type React from "react";
import styles from "./Message.module.css";

export interface RCSMessageEvent {
  from: "guest" | "bot" | "owner";
  text?: string;
  component?: React.ReactNode;
}
interface MessageProps {
  from: "guest" | "bot" | "owner";
  children: React.ReactNode;
}

export function Message({ from, children }: MessageProps) {
  const isGuest = from === "guest";
  return (
    <div className={isGuest ? styles.myMessage : styles.theirMessage}>
      <div className={`${styles.bubble} ${styles.messageAppear}`}>
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
