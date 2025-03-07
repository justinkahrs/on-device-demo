import { useEffect } from "react";
import type React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import styles from "./ChatWindow.module.css";
import { useChat } from "@/context/ChatContext";

interface ChatWindowProps {
  children: React.ReactNode;
  chatWindowRef: React.RefObject<HTMLDivElement> | null;
}

export function ChatWindow({ children, chatWindowRef }: ChatWindowProps) {
  const { resume } = useChat();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // If coming from house-rules, resume the conversation using Next.js search params
  useEffect(() => {
    const from = searchParams.get("from");
    if (from === "house-rules") {
      resume();
      router.replace(pathname);
    }
  }, [resume, searchParams, router, pathname]);

  const handleSkipMessage = () => {
    window.dispatchEvent(new Event('resumeConversation'));
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