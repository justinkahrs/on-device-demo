import type React from "react";
import styles from "./ChatWindow.module.css";
import { useChat } from "../../context/ChatContext";

interface ChatWindowProps {
  children: React.ReactNode;
  chatWindowRef: React.RefObject<HTMLDivElement> | null;
  resumeOnTap?: boolean;
}

export function ChatWindow({
  children,
  chatWindowRef,
  resumeOnTap = true,
}: ChatWindowProps) {
  const { resume, status } = useChat();

  const handleSkipMessage = () => {
    if (!resumeOnTap || status !== "paused") return;
    window.dispatchEvent(new Event("resumeConversation"));
    resume();
  };

  return (
    <div
      ref={chatWindowRef}
      className={styles.chatWindow}
      onClick={handleSkipMessage}
      onKeyDown={handleSkipMessage}
    >
      {children}
    </div>
  );
}
