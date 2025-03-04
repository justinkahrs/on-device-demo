import type React from "react";
import styles from "./ChatWindow.module.css";

interface ChatWindowProps {
  children: React.ReactNode;
  chatWindowRef: React.RefObject<HTMLDivElement> | null;
}

export function ChatWindow({ children, chatWindowRef }: ChatWindowProps) {
  return (
    <div ref={chatWindowRef} className={styles.chatWindow}>
      {children}
    </div>
  );
}
