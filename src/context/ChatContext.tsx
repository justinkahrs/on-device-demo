"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { messages as defaultMessages } from "../app/messages";
import type { RCSMessageEvent } from "../components/Message/Message";

type ChatStatus = "idle" | "playing" | "paused" | "finished";

interface ChatContextValue {
  displayedMessages: RCSMessageEvent[];
  typingFrom: "guest" | "bot" | "owner" | null;
  status: ChatStatus;
  currentIndex: number;
  start: () => void;
  pause: () => void;
  resume: (index?: number, option?: string) => void;
  restart: () => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [displayedMessages, setDisplayedMessages] = useState<RCSMessageEvent[]>(
    []
  );
  const [typingFrom, setTypingFrom] = useState<
    "guest" | "bot" | "owner" | null
  >(null);

  // currentIndex tracks which message from defaultMessages we're about to show
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState<ChatStatus>("idle");

  const MESSAGE_DELAY_TIME = 1500; // adjust speed

  // We'll define a utility function that "displays" the next message from our array.
  // If it's an "awaitUser" message, we stop automatically. If not, we chain the next one.
  const showNextMessage = useCallback((nextIndex: number) => {
    if (nextIndex >= defaultMessages.length) {
      setStatus("finished");
      return;
    }

    const nextMessage = defaultMessages[nextIndex];
    // Show typing first
    setTypingFrom(nextMessage.from);

    // After a delay, add the message to displayedMessages
    setTimeout(() => {
      setTypingFrom(null);
      setDisplayedMessages((prev) => [...prev, nextMessage]);
      setCurrentIndex(nextIndex + 1);

      if (!nextMessage.awaitUser) {
        // If not waiting for user, automatically schedule next message
        setTimeout(() => {
          showNextMessage(nextIndex + 1);
        }, MESSAGE_DELAY_TIME);
      } else {
        // If awaitUser is true, we pause
        setStatus("paused");
      }
    }, MESSAGE_DELAY_TIME);
  }, []);

  // Start from the currentIndex if we are idle or if we restarted
  const start = useCallback(() => {
    if (status === "finished") return;
    setStatus("playing");
    showNextMessage(currentIndex);
  }, [status, currentIndex, showNextMessage]);

  const pause = useCallback(() => {
    setStatus("paused");
  }, []);

  const resume = useCallback((index?: number) => {
    if (status === "paused") {
      if (index !== undefined) {
        setDisplayedMessages((prev) => prev.slice(0, index + 1));
        setCurrentIndex(index + 1);
        showNextMessage(index + 1);
      } else {
        showNextMessage(currentIndex);
      }
      setStatus("playing");
    }
  }, [status, currentIndex, showNextMessage]);

  // This restarts the entire conversation
  const restart = useCallback(() => {
    setDisplayedMessages([]);
    setTypingFrom(null);
    setCurrentIndex(0);
    setStatus("idle");
  }, []);

  const value: ChatContextValue = {
    displayedMessages,
    typingFrom,
    status,
    currentIndex,
    start,
    pause,
    resume,
    restart,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}