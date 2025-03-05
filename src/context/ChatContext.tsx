// src/context/ChatContext.tsx
"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { messages as defaultMessages } from "../app/messages";
import type { RCSMessageEvent } from "../components/Message/Message";

// The shape of the data we'll store in context
interface ChatContextValue {
  displayedMessages: RCSMessageEvent[];
  typingFrom: "guest" | "bot" | "owner" | null;
  isFinished: boolean;
  messageIndex: number;
  showTyping: boolean;
  handleQuickReply: (option: string) => void;
  handleRestart: () => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  // The same state we used to have in page.tsx
  const [displayedMessages, setDisplayedMessages] = useState<RCSMessageEvent[]>(
    []
  );
  const [typingFrom, setTypingFrom] = useState<
    "guest" | "bot" | "owner" | null
  >(null);
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [showTyping, setShowTyping] = useState<boolean>(true);

  // We can keep the same timing logic
  const MESSAGE_DELAY_TIME = 1500; // adjust speed to liking
  const isFinished = messageIndex >= defaultMessages.length;
  useEffect(() => {
    if (messageIndex >= defaultMessages.length) return;
    const newMessage = defaultMessages[messageIndex];
    const timerId = setTimeout(() => {
      if (showTyping) {
        setTypingFrom(newMessage.from);
        setShowTyping(false);
      } else {
        setTypingFrom(null);
        setDisplayedMessages((prev) => [...prev, newMessage]);
        if (!newMessage.awaitUser) {
          setMessageIndex((i) => i + 1);
          setShowTyping(true);
        }
      }
    }, MESSAGE_DELAY_TIME);

    return () => clearTimeout(timerId);
  }, [messageIndex, showTyping]);

  // QuickReply handler
  function handleQuickReply(option: string) {
    console.log({ option }); // Could handle routes or other logic
    setMessageIndex((prev) => prev + 1);
    setShowTyping(true);
  }

  // Restart handler
  function handleRestart() {
    setDisplayedMessages([]);
    setMessageIndex(0);
    setTypingFrom(null);
    setShowTyping(true);
  }

  const value: ChatContextValue = {
    displayedMessages,
    typingFrom,
    messageIndex,
    showTyping,
    isFinished,
    handleQuickReply,
    handleRestart,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

// A convenience hook for components to consume our ChatContext
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
