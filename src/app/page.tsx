"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import {
  Message,
  TypingIndicator,
  type RCSMessageEvent,
} from "../components/Message/Message";
import { ChatWindow } from "../components/ChatWindow/ChatWindow";
import { useChat } from "../context/ChatContext";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function RcsDemo() {
  const { displayedMessages, typingFrom, start, status, resume } = useChat();

  const chatWindowRef = useRef<HTMLDivElement>(null);

  // On mount, automatically start the flow if we are "idle".
  useEffect(() => {
    if (status === "idle" && displayedMessages.length === 0) {
      start();
    }
  }, [status, start, displayedMessages]);

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: Scroll to bottom whenever messages change or typing changes
  useLayoutEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [displayedMessages, typingFrom]);

  function renderMessageContent(msg: RCSMessageEvent) {
    if (msg.text) return msg.text;

    if (React.isValidElement(msg.component)) {
      return msg.component;
    }
    return null;
  }

  return (
    <>
      <ChatWindow
        chatWindowRef={chatWindowRef as React.RefObject<HTMLDivElement>}
      >
        {displayedMessages.map((msg, i) => (
          <Message
            className={msg.text ? "txt" : "component"}
            from={msg.from}
            key={`${msg.from}-${i}`}
            messageIndex={i}
          >
            {renderMessageContent(msg)}
          </Message>
        ))}
        {typingFrom && <TypingIndicator from={typingFrom} />}
      </ChatWindow>
    </>
  );
}